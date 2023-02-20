// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FleekAccessControl.sol";
import "./util/FleekStrings.sol";

contract FleekERC721 is Initializable, ERC721Upgradeable, FleekAccessControl {
    using Strings for uint256;
    using FleekStrings for FleekERC721.App;
    using FleekStrings for FleekERC721.AccessPoint;
    using FleekStrings for string;
    using FleekStrings for uint24;

    event MetadataUpdate(uint256 indexed _tokenId, string key, string value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, uint24 value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, string[2] value, address indexed triggeredBy);

    event NewAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);
    event RemoveAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);
    event ChangeAccessPointScore(string apName, uint256 indexed tokenId, uint256 score, address indexed triggeredBy);

    event ChangeAccessPointNameVerify(
        string apName,
        uint256 tokenId,
        bool indexed verified,
        address indexed triggeredBy
    );
    event ChangeAccessPointContentVerify(
        string apName,
        uint256 tokenId,
        bool indexed verified,
        address indexed triggeredBy
    );
    /**
     * The properties are stored as string to keep consistency with
     * other token contracts, we might consider changing for bytes32
     * in the future due to gas optimization.
     */
    struct App {
        string name; // Name of the site
        string description; // Description about the site
        string externalURL; // Site URL
        string ENS; // ENS ID
        uint256 currentBuild; // The current build number (Increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // Mapping to build details for each build number
        string logo;
        uint24 color; // Color of the nft
    }

    /**
     * The metadata that is stored for each build.
     */
    struct Build {
        string commitHash;
        string gitRepository;
    }

    /**
     * The stored data for each AccessPoint.
     */
    struct AccessPoint {
        uint256 tokenId;
        uint256 score;
        bool contentVerified;
        bool nameVerified;
        address owner;
    }

    uint256 private _appIds;
    mapping(uint256 => App) private _apps;
    mapping(string => AccessPoint) private _accessPoints;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __FleekAccessControl_init();
        _appIds = 0;
    }

    /**
     * @dev Checks if the AccessPoint exists.
     */
    modifier requireAP(string memory apName) {
        require(_accessPoints[apName].owner != address(0), "FleekERC721: invalid AP");
        _;
    }

    /**
     * @dev Mints a token and returns a tokenId.
     *
     * If the `tokenId` has not been minted before, and the `to` address is not zero, emits a {Transfer} event.
     *
     * Requirements:
     *
     * - the caller must have ``collectionOwner``'s admin role.
     *
     */
    function mint(
        address to,
        string memory name,
        string memory description,
        string memory externalURL,
        string memory ENS,
        string memory commitHash,
        string memory gitRepository,
        string memory logo,
        uint24 color
    ) public payable requireCollectionRole(Roles.Owner) returns (uint256) {
        uint256 tokenId = _appIds;
        _mint(to, tokenId);
        
        _appIds += 1;

        App storage app = _apps[tokenId];
        app.name = name;
        app.description = description;
        app.externalURL = externalURL;
        app.ENS = ENS;
        app.logo = logo;
        app.color = color;

        // The mint interaction is considered to be the first build of the site. Updates from now on all increment the currentBuild by one and update the mapping.
        app.currentBuild = 0;
        app.builds[0] = Build(commitHash, gitRepository);    
        
        return tokenId;
    }

    /**
     * @dev Returns the token metadata associated with the `tokenId`.
     *
     * Returns a based64 encoded string value of the URI.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        address owner = ownerOf(tokenId);
        App storage app = _apps[tokenId];

        return string(abi.encodePacked(_baseURI(), app.toString(owner).toBase64()));
    }

    /**
     * @dev Returns the token metadata associated with the `tokenId`.
     *
     * Returns multiple string and uint values in relation to metadata fields of the App struct.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function getToken(
        uint256 tokenId
    )
        public
        view
        virtual
        returns (string memory, string memory, string memory, string memory, uint256, string memory, uint24)
    {
        _requireMinted(tokenId);
        App storage app = _apps[tokenId];
        return (app.name, app.description, app.externalURL, app.ENS, app.currentBuild, app.logo, app.color);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Override of _beforeTokenTransfer of ERC721.
     * Here it needs to update the token controller roles for mint, burn and transfer.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        if (from != address(0) && to != address(0)) {
            // Transfer
            _clearAllTokenRoles(tokenId, to);
        } else if (from == address(0)) {
            // Mint
            _grantTokenRole(tokenId, Roles.Owner, to);
        } else if (to == address(0)) {
            // Burn
            _clearAllTokenRoles(tokenId);
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev A baseURI internal function implementation to be called in the `tokenURI` function.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    /**
     * @dev Updates the `externalURL` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenExternalURL} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenExternalURL(
        uint256 tokenId,
        string memory _tokenExternalURL
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].externalURL = _tokenExternalURL;
        emit MetadataUpdate(tokenId, "externalURL", _tokenExternalURL, msg.sender);
    }

    /**
     * @dev Updates the `ENS` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenENS} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenENS(
        uint256 tokenId,
        string memory _tokenENS
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].ENS = _tokenENS;
        emit MetadataUpdate(tokenId, "ENS", _tokenENS, msg.sender);
    }

    /**
     * @dev Updates the `name` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenName} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenName(
        uint256 tokenId,
        string memory _tokenName
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].name = _tokenName;
        emit MetadataUpdate(tokenId, "name", _tokenName, msg.sender);
    }

    /**
     * @dev Updates the `description` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenDescription} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenDescription(
        uint256 tokenId,
        string memory _tokenDescription
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].description = _tokenDescription;
        emit MetadataUpdate(tokenId, "description", _tokenDescription, msg.sender);
    }

    /**
     * @dev Updates the `logo` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenLogo} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenLogo(
        uint256 tokenId,
        string memory _tokenLogo
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].logo = _tokenLogo;
        emit MetadataUpdate(tokenId, "logo", _tokenLogo, msg.sender);
    }

    /**
     * @dev Updates the `color` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenColor} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenColor(
        uint256 tokenId,
        uint24 _tokenColor
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].color = _tokenColor;
        emit MetadataUpdate(tokenId, "color", _tokenColor, msg.sender);
    }

    /**
     * @dev Updates the `logo` and `color` metadata fields of a minted `tokenId`.
     *
     * May emit a {NewTokenLogo} and a {NewTokenColor} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenLogoAndColor(uint256 tokenId, string memory _tokenLogo, uint24 _tokenColor) public virtual {
        setTokenLogo(tokenId, _tokenLogo);
        setTokenColor(tokenId, _tokenColor);
    }

    /**
     * @dev Add a new AccessPoint register for an app token.
     * The AP name should be a DNS or ENS url and it should be unique.
     * Anyone can add an AP but it should requires a payment.
     *
     * May emit a {NewAccessPoint} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     * IMPORTANT: The payment is not set yet
     */
    function addAccessPoint(uint256 tokenId, string memory apName) public payable {
        // require(msg.value == 0.1 ether, "You need to pay at least 0.1 ETH"); // TODO: define a minimum price
        _requireMinted(tokenId);
        require(_accessPoints[apName].owner == address(0), "FleekERC721: AP already exists");

        _accessPoints[apName] = AccessPoint(tokenId, 0, false, false, msg.sender);

        emit NewAccessPoint(apName, tokenId, msg.sender);
    }

    /**
     * @dev Remove an AccessPoint registry for an app token.
     * It will also remove the AP from the app token APs list.
     *
     * May emit a {RemoveAccessPoint} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - must be called by the AP owner.
     */
    function removeAccessPoint(string memory apName) public requireAP(apName) {
        require(msg.sender == _accessPoints[apName].owner, "FleekERC721: must be AP owner");
        uint256 tokenId = _accessPoints[apName].tokenId;

        delete _accessPoints[apName];
        emit RemoveAccessPoint(apName, tokenId, msg.sender);
    }

    /**
     * @dev A view function to gether information about an AccessPoint.
     * It returns a JSON string representing the AccessPoint information.
     *
     * Requirements:
     *
     * - the AP must exist.
     *
     */
    function getAccessPointJSON(string memory apName) public view requireAP(apName) returns (string memory) {
        AccessPoint storage _ap = _accessPoints[apName];
        return _ap.toString();
    }

    /**
     * @dev A view function to check if a AccessPoint is verified.
     *
     * Requirements:
     *
     * - the AP must exist.
     *
     */
    function isAccessPointNameVerified(string memory apName) public view requireAP(apName) returns (bool) {
        return _accessPoints[apName].nameVerified;
    }

    /**
     * @dev Increases the score of a AccessPoint registry.
     *
     * May emit a {ChangeAccessPointScore} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     *
     */
    function increaseAccessPointScore(string memory apName) public requireAP(apName) {
        _accessPoints[apName].score++;
        emit ChangeAccessPointScore(apName, _accessPoints[apName].tokenId, _accessPoints[apName].score, msg.sender);
    }

    /**
     * @dev Decreases the score of a AccessPoint registry if is greater than 0.
     *
     * May emit a {ChangeAccessPointScore} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     *
     */
    function decreaseAccessPointScore(string memory apName) public requireAP(apName) {
        require(_accessPoints[apName].score > 0, "FleekERC721: score cant be lower");
        _accessPoints[apName].score--;
        emit ChangeAccessPointScore(apName, _accessPoints[apName].tokenId, _accessPoints[apName].score, msg.sender);
    }

    /**
     * @dev Set the content verification of a AccessPoint registry.
     *
     * May emit a {ChangeAccessPointContentVerify} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - the sender must have the token controller role.
     *
     */
    function setAccessPointContentVerify(
        string memory apName,
        bool verified
    ) public requireAP(apName) requireTokenRole(_accessPoints[apName].tokenId, Roles.Controller) {
        _accessPoints[apName].contentVerified = verified;
        emit ChangeAccessPointContentVerify(apName, _accessPoints[apName].tokenId, verified, msg.sender);
    }

    /**
     * @dev Set the name verification of a AccessPoint registry.
     *
     * May emit a {ChangeAccessPointNameVerify} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - the sender must have the token controller role.
     *
     */
    function setAccessPointNameVerify(
        string memory apName,
        bool verified
    ) public requireAP(apName) requireTokenRole(_accessPoints[apName].tokenId, Roles.Controller) {
        _accessPoints[apName].nameVerified = verified;
        emit ChangeAccessPointNameVerify(apName, _accessPoints[apName].tokenId, verified, msg.sender);
    }

    /**
     * @dev Adds a new build to a minted `tokenId`'s builds mapping.
     *
     * May emit a {NewBuild} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenBuild(
        uint256 tokenId,
        string memory _commitHash,
        string memory _gitRepository
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].builds[++_apps[tokenId].currentBuild] = Build(_commitHash, _gitRepository);
        emit MetadataUpdate(tokenId, "build", [_commitHash, _gitRepository], msg.sender);
    }

    /**
     * @dev Burns a previously minted `tokenId`.
     *
     * May emit a {Transfer} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenOwner` role.
     *
     */
    function burn(uint256 tokenId) public virtual requireTokenRole(tokenId, Roles.Owner) {
        super._burn(tokenId);

        if (bytes(_apps[tokenId].externalURL).length != 0) {
            delete _apps[tokenId];
        }
    }
}

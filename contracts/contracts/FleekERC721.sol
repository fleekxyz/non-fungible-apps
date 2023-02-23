// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FleekAccessControl.sol";
import "./util/FleekStrings.sol";
import "./FleekPausable.sol";

error MustBeTokenOwner(uint256 tokenId);
error ThereIsNoTokenMinted();

contract FleekERC721 is Initializable, ERC721Upgradeable, FleekAccessControl, FleekPausable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    using FleekStrings for FleekERC721.App;
    using FleekStrings for FleekERC721.AccessPoint;
    using FleekStrings for string;
    using FleekStrings for uint24;

    event MetadataUpdate(uint256 indexed _tokenId, string key, string value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, uint24 value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, string[2] value, address indexed triggeredBy);

    event NewAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);
    event RemoveAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);

    event ChangeAccessPointAutoApproval(
        uint256 indexed token,
        bool indexed settings,
        address indexed triggeredBy
    );

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
    event ChangeAccessPointStatus(
        string apName,
        uint256 tokenId,
        AccessPointCreationStatus status,
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
        bool accessPointAutoApproval; // AP Auto Approval
    }

    /**
     * The metadata that is stored for each build.
     */
    struct Build {
        string commitHash;
        string gitRepository;
    }

    /**
     * Creation status enums for access points
     */
    enum AccessPointCreationStatus {
        DRAFT,
        APPROVED,
        REJECTED,
        REMOVED
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
        AccessPointCreationStatus status;
    }

    Counters.Counter private _appIds;
    mapping(uint256 => App) private _apps;
    mapping(string => AccessPoint) private _accessPoints;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function initialize(string memory _name, string memory _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __FleekAccessControl_init();
        __FleekPausable_init();
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
     * - the contract must be not paused.
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
        uint24 color,
        bool accessPointAutoApproval
    ) public payable requireCollectionRole(CollectionRoles.Owner) returns (uint256) {
        uint256 tokenId = _appIds.current();
        _mint(to, tokenId);
        _appIds.increment();

        App storage app = _apps[tokenId];
        app.name = name;
        app.description = description;
        app.externalURL = externalURL;
        app.ENS = ENS;
        app.logo = logo;
        app.color = color;
        app.accessPointAutoApproval = accessPointAutoApproval;

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
     * @dev Returns the last minted tokenId.
     */
    function getLastTokenId() public view virtual returns (uint256) {
        uint256 current = _appIds.current();
        if (current == 0) revert ThereIsNoTokenMinted();
        return current - 1;
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
    ) internal virtual override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            // Transfer
            _clearTokenRoles(tokenId);
        } else if (from == address(0)) {
            // Mint
            // TODO: set contract owner as controller
        } else if (to == address(0)) {
            // Burn
            _clearTokenRoles(tokenId);
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
     * @dev Updates the `accessPointAutoApproval` settings on minted `tokenId`.
     *
     * May emit a {ChangeAccessPointAutoApproval} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setAccessPointAutoApproval(
        uint256 tokenId,
        bool _apAutoApproval
    ) public virtual requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        _apps[tokenId].accessPointAutoApproval = _apAutoApproval;
        emit ChangeAccessPointAutoApproval(tokenId, _apAutoApproval, msg.sender);
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
     * - the contract must be not paused.
     *
     * IMPORTANT: The payment is not set yet
     */
    function addAccessPoint(uint256 tokenId, string memory apName) public payable whenNotPaused {
        // require(msg.value == 0.1 ether, "You need to pay at least 0.1 ETH"); // TODO: define a minimum price
        _requireMinted(tokenId);
        require(_accessPoints[apName].owner == address(0), "FleekERC721: AP already exists");

        emit NewAccessPoint(apName, tokenId, msg.sender);

        if (_apps[tokenId].accessPointAutoApproval) {
            // Auto Approval is on.
            _accessPoints[apName] = AccessPoint(tokenId, 0, false, false, msg.sender, AccessPointCreationStatus.APPROVED);

            emit ChangeAccessPointStatus(apName, tokenId, AccessPointCreationStatus.APPROVED, msg.sender);
        } else {
            // Auto Approval is off. Should wait for approval.
            _accessPoints[apName] = AccessPoint(tokenId, 0, false, false, msg.sender, AccessPointCreationStatus.DRAFT);
            emit ChangeAccessPointStatus(apName, tokenId, AccessPointCreationStatus.DRAFT, msg.sender);
        }
    }

    /**
     * @dev Set approval settings for an access point.
     * It will add the access point to the token's AP list, if `approved` is true.
     *
     * May emit a {ChangeAccessPointApprovalStatus} event.
     *
     * Requirements:
     *
     * - the tokenId must exist and be the same as the tokenId that is set for the AP.
     * - the AP must exist.
     * - must be called by a token controller.
     */
    function setApprovalForAccessPoint(
        uint256 tokenId,
        string memory apName,
        bool approved
    ) public requireTokenOwner(tokenId) {
        AccessPoint storage accessPoint = _accessPoints[apName];
        require(
            accessPoint.tokenId == tokenId,
            "FleekERC721: the passed tokenId is not the same as the access point's tokenId."
        );
        require(
            accessPoint.status == AccessPointCreationStatus.DRAFT,
            "FleekERC721: the access point creation status has been set before."
        );

        if (approved) {
            // Approval
            accessPoint.status = AccessPointCreationStatus.APPROVED;
            emit ChangeAccessPointStatus(apName, tokenId, AccessPointCreationStatus.APPROVED, msg.sender);
        } else {
            // Not Approved
            accessPoint.status = AccessPointCreationStatus.REJECTED;
            emit ChangeAccessPointStatus(apName, tokenId, AccessPointCreationStatus.REJECTED, msg.sender);
        }
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
     * - the contract must be not paused.
     *
     */
    function removeAccessPoint(string memory apName) public whenNotPaused requireAP(apName) {
        require(msg.sender == _accessPoints[apName].owner, "FleekERC721: must be AP owner");
        _accessPoints[apName].status = AccessPointCreationStatus.REMOVED;
        uint256 tokenId = _accessPoints[apName].tokenId;
        emit ChangeAccessPointStatus(apName, tokenId, AccessPointCreationStatus.REMOVED, msg.sender);
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
    ) public requireAP(apName) requireTokenRole(_accessPoints[apName].tokenId, TokenRoles.Controller) {
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
    ) public requireAP(apName) requireTokenRole(_accessPoints[apName].tokenId, TokenRoles.Controller) {
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
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
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
     * - the sender must be the owner of the token.
     * - the contract must be not paused.
     *
     */
    function burn(uint256 tokenId) public virtual requireTokenOwner(tokenId) {
        super._burn(tokenId);

        if (bytes(_apps[tokenId].externalURL).length != 0) {
            delete _apps[tokenId];
        }
    }

    /*//////////////////////////////////////////////////////////////
        ACCESS CONTROL
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Requires caller to have a selected collection role.
     */
    modifier requireCollectionRole(CollectionRoles role) {
        _requireCollectionRole(role);
        _;
    }

    /**
     * @dev Requires caller to have a selected token role.
     */
    modifier requireTokenRole(uint256 tokenId, TokenRoles role) {
        if (ownerOf(tokenId) != msg.sender) _requireTokenRole(tokenId, role);
        _;
    }

    /**
     * @dev Requires caller to be selected token owner.
     */
    modifier requireTokenOwner(uint256 tokenId) {
        if (ownerOf(tokenId) != msg.sender) revert MustBeTokenOwner(tokenId);
        _;
    }

    /**
     * @dev Grants the collection role to an address.
     *
     * Requirements:
     *
     * - the caller should have the collection role.
     *
     */
    function grantCollectionRole(
        CollectionRoles role,
        address account
    ) public whenNotPaused requireCollectionRole(CollectionRoles.Owner) {
        _grantCollectionRole(role, account);
    }

    /**
     * @dev Grants the token role to an address.
     *
     * Requirements:
     *
     * - the caller should have the token role.
     *
     */
    function grantTokenRole(
        uint256 tokenId,
        TokenRoles role,
        address account
    ) public whenNotPaused requireTokenOwner(tokenId) {
        _grantTokenRole(tokenId, role, account);
    }

    /**
     * @dev Revokes the collection role of an address.
     *
     * Requirements:
     *
     * - the caller should have the collection role.
     *
     */
    function revokeCollectionRole(
        CollectionRoles role,
        address account
    ) public whenNotPaused requireCollectionRole(CollectionRoles.Owner) {
        _revokeCollectionRole(role, account);
    }

    /**
     * @dev Revokes the token role of an address.
     *
     * Requirements:
     *
     * - the caller should have the token role.
     *
     */
    function revokeTokenRole(
        uint256 tokenId,
        TokenRoles role,
        address account
    ) public whenNotPaused requireTokenOwner(tokenId) {
        _revokeTokenRole(tokenId, role, account);
    }

    /*//////////////////////////////////////////////////////////////
        PAUSABLE
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Sets the contract to paused state.
     *
     * Requirements:
     *
     * - the sender must have the `controller` role.
     * - the contract must be pausable.
     * - the contract must be not paused.
     *
     */
    function pause() public requireCollectionRole(CollectionRoles.Owner) {
        _pause();
    }

    /**
     * @dev Sets the contract to unpaused state.
     *
     * Requirements:
     *
     * - the sender must have the `controller` role.
     * - the contract must be paused.
     *
     */
    function unpause() public requireCollectionRole(CollectionRoles.Owner) {
        _unpause();
    }

    /**
     * @dev Sets the contract to pausable state.
     *
     * Requirements:
     *
     * - the sender must have the `owner` role.
     * - the contract must be in the oposite pausable state.
     *
     */
    function setPausable(bool pausable) public requireCollectionRole(CollectionRoles.Owner) {
        _setPausable(pausable);
    }
}

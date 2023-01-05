// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./FleekAccessControl.sol";

contract FleekERC721 is ERC721, FleekAccessControl {
    using Strings for uint256;
    using Counters for Counters.Counter;

    event NewBuild(uint256 indexed token, string indexed commitHash, address indexed triggeredBy);
    event NewTokenName(uint256 indexed token, string indexed name, address indexed triggeredBy);
    event NewTokenDescription(uint256 indexed token, string indexed description, address indexed triggeredBy);
    event NewTokenImage(uint256 indexed token, string indexed image, address indexed triggeredBy);
    event NewTokenExternalURL(uint256 indexed token, string indexed externalURL, address indexed triggeredBy);
    event NewTokenENS(uint256 indexed token, string indexed ENS, address indexed triggeredBy);

    event NewMirror(string indexed mirrorName, uint256 indexed tokenId, address indexed owner);
    event NewMirrorScore(string indexed mirrorName, uint256 score, address indexed triggeredBy);
    event RemovedMirror(string indexed mirrorName, address indexed owner);

    /**
     * The properties are stored as string to keep consistency with
     * other token contracts, we might consider changing for bytes32
     * in the future due to gas optimization.
     */
    struct App {
        string name; // Name of the site
        string description; // Description about the site
        string image; // Preview Image IPFS Link
        string externalURL; // Site URL
        string ENS; // ENS ID
        uint256 currentBuild; // The current build number (Increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // Mapping to build details for each build number
    }

    /**
     * The metadata that is stored for each build.
     */
    struct Build {
        string commitHash;
        string gitRepository;
    }

    /**
     * The stored data for each mirror.
     * The mirror "score" is used to determine the best mirror to use.
     * The mirror "score" equals to 0 means that the mirror is not verified.
     */
    struct Mirror {
        uint256 tokenId;
        uint256 score;
        address owner;
    }

    Counters.Counter private _appIds;
    mapping(uint256 => App) private _apps;
    mapping(string => Mirror) private _mirrors;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    /**
     * @dev Checks if msg.sender has the role of tokenOwner for a certain tokenId.
     */
    modifier requireTokenOwner(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "FleekERC721: must be token owner");
        _;
    }

    modifier requireMirror(string memory mirrorName) {
        require(_mirrors[mirrorName].owner != address(0), "FleekERC721: mirror does not exist");
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
        string memory image,
        string memory externalURL,
        string memory ENS,
        string memory commitHash,
        string memory gitRepository
    ) public payable requireCollectionRole(Roles.Owner) returns (uint256) {
        uint256 tokenId = _appIds.current();
        _mint(to, tokenId);
        _appIds.increment();

        App storage app = _apps[tokenId];
        app.name = name;
        app.description = description;
        app.image = image;
        app.externalURL = externalURL;
        app.ENS = ENS;

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

        // prettier-ignore
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name":"', app.name, '",',
                '"description":"', app.description, '",',
                '"owner":"', Strings.toHexString(uint160(owner), 20), '",',
                '"external_url":"', app.externalURL, '",',
                '"image":"', app.image, '",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"', app.ENS,'"},',
                    '{"trait_type": "Commit Hash", "value":"', app.builds[app.currentBuild].commitHash,'"},',
                    '{"trait_type": "Repository", "value":"', app.builds[app.currentBuild].gitRepository,'"},',
                    '{"trait_type": "Version", "value":"', Strings.toString(app.currentBuild),'"}',
                ']',
            '}'
        );

        return string(abi.encodePacked(_baseURI(), Base64.encode((dataURI))));
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
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
        emit NewTokenExternalURL(tokenId, _tokenExternalURL, msg.sender);
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
        emit NewTokenENS(tokenId, _tokenENS, msg.sender);
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
        emit NewTokenName(tokenId, _tokenName, msg.sender);
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
        emit NewTokenDescription(tokenId, _tokenDescription, msg.sender);
    }

    /**
     * @dev Updates the `image` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenImage} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenImage(
        uint256 tokenId,
        string memory _tokenImage
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].image = _tokenImage;
        emit NewTokenImage(tokenId, _tokenImage, msg.sender);
    }

    /**
     * @dev Add a new mirror registry for an app token.
     * The mirror name should be a DNS or ENS url and it should be unique.
     * Anyone can add a mirror but it should requires a payment.
     *
     * May emit a {NewMirror} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     * IMPORTANT: The payment is not set yet
     */
    function addMirror(uint256 tokenId, string memory mirrorName) public payable {
        // require(msg.value == 0.1 ether, "You need to pay at least 0.1 ETH"); // TODO: define a minimum price
        _requireMinted(tokenId);
        require(_mirrors[mirrorName].owner == address(0), "Mirror already exists");

        _mirrors[mirrorName] = Mirror(tokenId, 0, msg.sender);
        emit NewMirror(mirrorName, tokenId, msg.sender);
    }

    /**
     * @dev Remove a mirror registry for an app token.
     * Only the owner of the mirror can remove it.
     *
     * May emit a {RemovedMirror} event.
     *
     * Requirements:
     *
     * - the mirror must exist.
     */
    function removeMirror(string memory mirrorName) public requireMirror(mirrorName) {
        require(msg.sender == _mirrors[mirrorName].owner, "You are not the owner of this mirror");
        delete _mirrors[mirrorName];
        emit RemovedMirror(mirrorName, msg.sender);
    }

    /**
     * @dev A view function to gether information about a mirror.
     * It returns a JSON string representing the mirror information.
     *
     * Requirements:
     *
     * - the mirror must exist.
     *
     */
    function mirror(string memory mirrorName) public view requireMirror(mirrorName) returns (string memory) {
        Mirror storage _mirror = _mirrors[mirrorName];

        // prettier-ignore
        bytes memory mirrorJSON = abi.encodePacked(
            "{",
                '"tokenId":', Strings.toString(_mirror.tokenId), ",",
                '"score":', Strings.toString(_mirror.score), ",",
                '"owner":"', Strings.toHexString(uint160(_mirror.owner), 20), '"',
            "}"
        );

        return string(mirrorJSON);
    }

    /**
     * @dev A view function to check if a mirror is verified.
     * A mirror is verified if its score is greater than 0.
     *
     * Requirements:
     *
     * - the mirror must exist.
     *
     */
    function isMirrorVerified(string memory mirrorName) public view requireMirror(mirrorName) returns (bool) {
        return _mirrors[mirrorName].score > 0;
    }

    /**
     * @dev Increases the score of a mirror registry.
     *
     * May emit a {NewMirrorScore} event.
     *
     * Requirements:
     *
     * - the mirror must exist.
     * - the sender must have the token controller role.
     *
     */
    function increaseMirrorScore(
        string memory mirrorName
    ) public requireMirror(mirrorName) requireTokenRole(_mirrors[mirrorName].tokenId, Roles.Controller) {
        _mirrors[mirrorName].score++;
        emit NewMirrorScore(mirrorName, _mirrors[mirrorName].score, msg.sender);
    }

    /**
     * @dev Decreases the score of a mirror registry if is greater than 0.
     *
     * May emit a {NewMirrorScore} event.
     *
     * Requirements:
     *
     * - the mirror must exist.
     * - the sender must have the token controller role.
     *
     */
    function decreaseMirrorScore(
        string memory mirrorName
    ) public requireMirror(mirrorName) requireTokenRole(_mirrors[mirrorName].tokenId, Roles.Controller) {
        require(_mirrors[mirrorName].score > 0, "Mirror score is already 0");
        _mirrors[mirrorName].score--;
        emit NewMirrorScore(mirrorName, _mirrors[mirrorName].score, msg.sender);
    }

    /**
     * @dev Sets the score of a mirror registry to 0.
     * Setting the score to 0 will make the mirror not verified anymore.
     *
     * May emit a {NewMirrorScore} event.
     *
     * Requirements:
     *
     * - the mirror must exist.
     * - the sender must have the token controller role.
     *
     */
    function clearMirrorScore(
        string memory mirrorName
    ) public requireMirror(mirrorName) requireTokenRole(_mirrors[mirrorName].tokenId, Roles.Controller) {
        _mirrors[mirrorName].score = 0;
        emit NewMirrorScore(mirrorName, _mirrors[mirrorName].score, msg.sender);
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
        emit NewBuild(tokenId, _commitHash, msg.sender);
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

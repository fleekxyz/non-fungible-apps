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

    struct Build {
        string commitHash;
        string gitRepository;
    }

    /**
     * The properties are stored as string to keep consistency with
     * other token contracts, we might consider changing for bytes32
     * in the future due to gas optimization
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

    Counters.Counter private _tokenIds;
    mapping(uint256 => App) private _apps;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    modifier requireTokenOwner(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "FleekERC721: must be token owner");
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
        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);
        _tokenIds.increment();

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
     * IMPORTANT: The function for clearing token controllers is not implemented yet.
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

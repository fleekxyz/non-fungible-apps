// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./FleekAccessControl.sol";

contract FleekERC721 is ERC721, FleekAccessControl {
    using Strings for uint256;
    using Counters for Counters.Counter;

    event NewBuild(uint256 indexed token, string indexed commit_hash);
    event NewTokenName(uint256 indexed token, string indexed name);
    event NewTokenDescription(uint256 indexed token, string indexed description);
    event NewTokenImage(uint256 indexed token, string indexed image);
    event NewTokenExternalURL(uint256 indexed token, string indexed external_url);
    event NewTokenENS(uint256 indexed token, string indexed ENS);

    struct Build {
        string commit_hash;
        string git_repository;
        string author;
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
        string external_url; // Site URL
        string ENS; // ENS ID
        uint256 current_build; // The current build number (Increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // Mapping to build details for each build number
    }

    Counters.Counter private _tokenIds;
    mapping(uint256 => App) private _apps;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    modifier requireTokenOwner(uint256 tokenId) {
        require(msg.sender == ownerOf(tokenId), "FleekERC721: must be token owner");
        _;
    }

    function mint(
        address to,
        string memory name,
        string memory description,
        string memory image,
        string memory external_url,
        string memory ENS,
        string memory commit_hash,
        string memory git_repository,
        string memory author
    ) public payable requireCollectionRole(Roles.Owner) returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);
        _tokenIds.increment();

        App storage app = _apps[tokenId];
        app.name = name;
        app.description = description;
        app.image = image;
        app.external_url = external_url;
        app.ENS = ENS;

        // The mint interaction is considered to be the first build of the site. Updates from now on all increment the current_build by one and update the mapping.
        app.current_build = 0;
        app.builds[0] = Build(commit_hash, git_repository, author);

        return tokenId;
    }

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
                '"external_url":"', app.external_url, '",',
                '"image":"', app.image, '",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"', app.ENS,'"},',
                    '{"trait_type": "Commit Hash", "value":"', app.builds[app.current_build].commit_hash,'"},',
                    '{"trait_type": "Repository", "value":"', app.builds[app.current_build].git_repository,'"},',
                    '{"trait_type": "Author", "value":"', app.builds[app.current_build].author,'"},',
                    '{"trait_type": "Version", "value":"', Strings.toString(app.current_build),'"}',
                ']',
            '}'
        );

        return string(abi.encodePacked(_baseURI(), Base64.encode((dataURI))));
    }

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

    function _baseURI() internal view virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    function setTokenExternalURL(
        uint256 tokenId,
        string memory _tokenExternalURL
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].external_url = _tokenExternalURL;
        emit NewTokenExternalURL(tokenId, _tokenExternalURL);
    }

    function setTokenENS(
        uint256 tokenId,
        string memory _tokenENS
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].ENS = _tokenENS;
        emit NewTokenENS(tokenId, _tokenENS);
    }

    function setTokenName(
        uint256 tokenId,
        string memory _tokenName
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].name = _tokenName;
        emit NewTokenName(tokenId, _tokenName);
    }

    function setTokenDescription(
        uint256 tokenId,
        string memory _tokenDescription
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].description = _tokenDescription;
        emit NewTokenDescription(tokenId, _tokenDescription);
    }

    function setTokenImage(
        uint256 tokenId,
        string memory _tokenImage
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].image = _tokenImage;
        emit NewTokenImage(tokenId, _tokenImage);
    }

    function setTokenBuild(
        uint256 tokenId,
        string memory _commit_hash,
        string memory _git_repository,
        string memory _author
    ) public virtual requireTokenRole(tokenId, Roles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].builds[++_apps[tokenId].current_build] = Build(_commit_hash, _git_repository, _author);
        emit NewBuild(tokenId, _commit_hash);
    }

    function burn(uint256 tokenId) public virtual requireTokenRole(tokenId, Roles.Owner) {
        super._burn(tokenId);

        if (bytes(_apps[tokenId].external_url).length != 0) {
            delete _apps[tokenId];
        }
    }
}

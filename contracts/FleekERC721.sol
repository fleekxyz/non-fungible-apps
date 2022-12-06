// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./FleekAccessControl.sol";

contract FleekERC721 is ERC721, FleekAccessControl {
    using Strings for uint256;
    using Counters for Counters.Counter;

    struct Build {
        string commit_hash;
        string git_repository;
        string author;
    }

    struct App {
        string name; // Name of the site
        string description; // Description about the site
        bytes32 image; // Preview Image IPFS Link
        bytes32 external_url; // Site URL
        bytes32 ENS; // ENS ID
        uint256 current_build; // The current build number (Increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // Mapping to build details for each build number
    }

    Counters.Counter private _tokenIds;
    mapping(uint256 => App) private _apps;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    modifier requireTokenOwner(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId),
            "FleekERC721: must be token owner"
        );
        _;
    }

    function mint(
        address to,
        string memory name,
        string memory description,
        bytes32 image,
        bytes32 external_url,
        bytes32 ENS,
        string memory commit_hash,
        string memory git_repository,
        string memory author
    ) public payable requireCollectionOwner returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);
        addTokenController(tokenId, to);
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

    function upgradeTokenBuild(
        uint256 tokenId,
        string memory commit,
        string memory repository,
        string memory author
    ) public payable requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        setTokenBuild(tokenId, commit, repository, author);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        address owner = ownerOf(tokenId);
        App storage app = _apps[tokenId];

        bytes memory ens = _removeEmptyBytes(app.ENS);

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name":"', app.name, '",',
                '"description":"', app.description, '",',
                '"owner":"', Strings.toHexString(uint160(owner), 20), '",',
                '"ENS":"', ens, '",',
                '"external_url":"', _removeEmptyBytes(app.external_url), '",',
                '"image":"', _removeEmptyBytes(app.image), '",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"', ens,'"},',
                    '{"trait_type": "Commit Hash", "value":"', app.builds[app.current_build].commit_hash,'"},',
                    '{"trait_type": "Repository", "value":"', app.builds[app.current_build].git_repository,'"},',
                    '{"trait_type": "Author", "value":"', app.builds[app.current_build].author,'"},',
                    '{"trait_type": "Version", "value":"', Strings.toString(app.current_build),'"}',
                ']',
            '}'
        );

        return string(abi.encodePacked(_baseURI(), Base64.encode((dataURI))));
    }

    function addTokenController(
        uint256 tokenId,
        address controller
    ) public requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        _grantRole(_tokenRole(tokenId, "CONTROLLER"), controller);
    }

    function removeTokenController(
        uint256 tokenId,
        address controller
    ) public requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        _revokeRole(_tokenRole(tokenId, "CONTROLLER"), controller);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    function setTokenExternalURL(
        uint256 tokenId,
        bytes32 _tokenExternalURL
    ) public payable virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _apps[tokenId].external_url = _tokenExternalURL;
    }

    function setTokenENS(
        uint256 tokenId,
        bytes32 _tokenENS
    ) public payable virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _apps[tokenId].ENS = _tokenENS;
    }

    function setTokenBuild(
        uint256 tokenId,
        string memory _commit_hash,
        string memory _git_repository,
        string memory _author
    ) public payable virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _apps[tokenId].builds[++_apps[tokenId].current_build] = Build(
            _commit_hash,
            _git_repository,
            _author
        );
    }

    function burn(
        uint256 tokenId
    ) public payable virtual requireTokenController(tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "FleekERC721: must be token owner"
        );
        super._burn(tokenId);

        if (_apps[tokenId].external_url.length != 0) {
            delete _apps[tokenId];
        }
    }

    // Removes empty bytes from a bytes32
    // IMPORTANT: this function is gas intensive and should only by view functions
    function _removeEmptyBytes(
        bytes32 _bytes
    ) private pure returns (bytes memory) {
        uint256 i = _bytes.length;
        while (i > 0 && _bytes[i - 1] == 0) {
            i--;
        }
        bytes memory tempBytes = new bytes(i);
        for (uint256 j = 0; j < i; j++) {
            tempBytes[j] = _bytes[j];
        }
        return tempBytes;
    }
}

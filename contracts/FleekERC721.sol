// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FleekAccessControl.sol";

contract FleekERC721 is ERC721, FleekAccessControl {
    using Strings for uint256;
    using Counters for Counters.Counter;

    struct Build {
        string commit;
        string repository;
    }

    struct Site {
        string URI; //ipfs hash example
        string ENS;
        uint256 currentBuild;
        Build[] builds;
    }

    Counters.Counter private _tokenIds;
    mapping(uint256 => Site) private _sites;

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
        string memory URI,
        string memory ENS,
        string memory commit,
        string memory repository
    ) public payable requireCollectionOwner returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);
        addTokenController(tokenId, to);
        _tokenIds.increment();

        Build[] memory _builds = new Build[](1);
        _builds[0] = Build(commit, repository);
        _sites[tokenId] = Site(URI, ENS, 0, _builds);
        return tokenId;
    }

    function upgradeTokenBuild(
        uint256 tokenId,
        string memory commit,
        string memory repository
    ) public payable requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        _setTokenBuild(tokenId, commit, repository);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        address owner = ownerOf(tokenId);
        Site memory site = _sites[tokenId];

        // prettier-ignore
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"owner":"', owner, '",',
                '"ENS":"', site.ENS, '",',
                '"URI":"', site.URI, '",',
                '"build:{',
                    '"id":"', site.currentBuild, '",',
                    '"commit":"', site.builds[site.currentBuild].commit, '",',
                    '"repository":"', site.builds[site.currentBuild].repository, '"'
                '}',
            '}'
        );

        return string(abi.encodePacked(_baseURI(), dataURI));
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

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].URI = _tokenURI;
    }

    function _setTokenENS(
        uint256 tokenId,
        string memory _tokenENS
    ) internal virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].ENS = _tokenENS;
    }

    function _setTokenBuild(
        uint256 tokenId,
        string memory _commit,
        string memory _repository
    ) internal virtual requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].builds.push(Build(_commit, _repository));
        _sites[tokenId].currentBuild = _sites[tokenId].builds.length - 1;
    }

    function _burn(uint256 tokenId) internal virtual override {
        require(
            ownerOf(tokenId) == msg.sender,
            "FleekERC721: must be token owner"
        );
        super._burn(tokenId);

        if (bytes(_sites[tokenId].URI).length != 0) {
            delete _sites[tokenId];
        }
    }
}

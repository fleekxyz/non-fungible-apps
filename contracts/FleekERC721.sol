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
    }

    struct Site {
        bytes32 external_url; // IPFS HASH
        bytes32 ENS; // ENS ID
        uint256 current_build; // THE CURRENT BUILD NUMBER (increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // MAPPING TO BUILD DETAILS FOR EACH BUILD NUMBER
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
        bytes32 external_url,
        bytes32 ENS,
        string memory commit_hash,
        string memory git_repository
    ) public payable requireCollectionOwner returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _mint(to, tokenId);
        addTokenController(tokenId, to);
        _tokenIds.increment();

        Site storage site = _sites[tokenId];
        site.external_url = external_url;
        site.ENS = ENS;

        // The mint interaction is considered to be the first build of the site. Updates from now on all increment the current_build by one and update the mapping.
        site.current_build = 0;
        site.builds[0] = Build(commit_hash, git_repository);
    
        return tokenId;
    }

    function upgradeTokenBuild(
        uint256 tokenId,
        string memory commit,
        string memory repository
    ) public payable requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        setTokenBuild(tokenId, commit, repository);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        address owner = ownerOf(tokenId);
        Site storage site = _sites[tokenId];
        /*
        / Note: I do not think this is the way this function is supposed to be written.
        / I recommend returning a IPFS URL per OpenSea's own documentation:
        / https://docs.opensea.io/docs/metadata-standards#implementing-token-uri
        */

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"owner":"', owner, '",',
                '"ENS":"', site.ENS, '",',
                '"external_url":"', site.external_url, '",',
                '"build:{',
                    '"id":"', site.current_build, '",',
                    '"commit_hash":"', site.builds[site.current_build].commit_hash, '",',
                    '"repository":"', site.builds[site.current_build].git_repository, '"'
                '}',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
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
    ) public virtual payable requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].external_url = _tokenExternalURL;
    }

    function setTokenENS(
        uint256 tokenId,
        bytes32 _tokenENS
    ) public virtual payable requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].ENS = _tokenENS;
    }

    function setTokenBuild(
        uint256 tokenId,
        string memory _commit_hash,
        string memory _git_repository
    ) public virtual payable requireTokenController(tokenId) {
        _requireMinted(tokenId);
        _sites[tokenId].builds[++_sites[tokenId].current_build] = Build(_commit_hash, _git_repository);
    }

    function burn(uint256 tokenId) public virtual payable requireTokenController(tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "FleekERC721: must be token owner"
        );
        super._burn(tokenId);

        if (_sites[tokenId].external_url.length != 0) {
            delete _sites[tokenId];
        }
    }
}

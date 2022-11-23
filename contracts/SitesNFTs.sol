// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/ISitesNFTs.sol";

contract SitesNFTs is ISitesNFTs, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private baseURI;

    bytes32 public constant MINTER_ROLE =
        0x4d494e5445525f524f4c45000000000000000000000000000000000000000000; // "MINTER_ROLE"

    modifier canMint() {
        bool isMinterOrAdmin = hasRole(MINTER_ROLE, msg.sender) ||
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        require(isMinterOrAdmin, "Caller has no permission to mint.");
        _;
    }

    modifier canChangeBaseURI() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        baseURI = "data:application/json;base64,";
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(
        string memory base64EncodedMetadata,
        address account
    ) public override canMint returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(account, newItemId);
        _setTokenURI(newItemId, base64EncodedMetadata);

        _tokenIds.increment();
        return newItemId;
    }

    function updateTokenURI(
        address tokenHolderAddress,
        uint256 tokenId,
        string memory base64EncodedMetadata
    ) public override canMint {
        address tokenOwner = ownerOf(tokenId);
        require(
            tokenOwner == tokenHolderAddress,
            "Address does not own provided tokenId"
        );
        _setTokenURI(tokenId, base64EncodedMetadata);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(IERC165, ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(
        string memory _newBbaseURI
    ) public override canChangeBaseURI returns (string memory) {
        baseURI = _newBbaseURI;
        return baseURI;
    }

    function getCurrentTokenId() public view override returns (uint256) {
        return _tokenIds.current();
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}

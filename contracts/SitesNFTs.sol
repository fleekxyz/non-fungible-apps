// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FleekAccessControl.sol";
import "../interfaces/ISitesNFTs.sol";

contract SitesNFTs is ISitesNFTs, ERC721URIStorage, FleekAccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mint(
        string memory base64EncodedMetadata,
        address account
    ) public override requireController returns (uint256) {
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
    ) public override requireController {
        address tokenOwner = ownerOf(tokenId);
        require(
            tokenOwner == tokenHolderAddress,
            "Address does not own provided tokenId"
        );
        _setTokenURI(tokenId, base64EncodedMetadata);
    }

    function getCurrentTokenId() public view override returns (uint256) {
        return _tokenIds.current();
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
}

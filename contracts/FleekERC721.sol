// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FleekAccessControl.sol";
import "../interfaces/IFleekERC721.sol";
import "./FleekSite.sol";

contract FleekERC721 is IFleekERC721, ERC721URIStorage, FleekAccessControl {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => address) private _contracts;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mint(
        uint8 fleekContract,
        string memory base64EncodedMetadata,
        address account
    ) public override requireController returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(account, newItemId);
        _setTokenURI(newItemId, base64EncodedMetadata);

        // it should be something like a switch
        if (fleekContract == FleekContract.Site) {
            _mintSite(newItemId, account);
        }

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

    function tokenContract(
        uint256 tokenId
    ) public view override returns (address) {
        return _contracts[tokenId];
    }

    function _mintSite(
        uint256 _newTokenId,
        address account
    ) internal returns (address) {
        // it should receive the parameters from user request
        _contracts[_newTokenId] = FleekSite(
            "name",
            "description",
            "thumbnail",
            "external_url"
        );
        return _contracts[_newTokenId];
    }
}

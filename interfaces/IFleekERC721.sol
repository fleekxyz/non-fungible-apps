// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/interfaces/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/IAccessControl.sol";

/// @title IFleekERC721 - A contract for managing sites NFTs
interface IFleekERC721 is IERC721 {
    enum FleekContract {
        Site
    }

    function mint(
        uint8 fleekContract,
        string memory base64EncodedMetadata,
        address account
    ) external returns (uint256);

    function updateTokenURI(
        address tokenHolderAddress,
        uint256 tokenId,
        string memory base64EncodedMetadata
    ) external;

    function getCurrentTokenId() external view returns (uint256);

    function tokenContract(uint256 tokenId) external view returns (address);
}

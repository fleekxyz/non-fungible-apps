// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

/// @title SitesNFTs - A contract for managing sites NFTs
/// @dev See
interface ISitesNFTs is IERC721 {
    function mint(
        string memory base64EncodedMetadata,
        address account
    ) external returns (uint256);

    function updateTokenURI(
        address tokenHolderAddress,
        uint256 tokenId,
        string memory base64EncodedMetadata
    ) external;

    function setBaseURI(
        string memory _newBbaseURI
    ) external returns (string memory);

    function getCurrentTokenId() external view returns (uint256);
}

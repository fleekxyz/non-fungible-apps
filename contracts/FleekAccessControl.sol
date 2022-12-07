// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract FleekAccessControl is AccessControl, Ownable {
    bytes32 public constant COLLECTION_MINTER_ROLE =
        keccak256("COLLECTION_MINTER_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COLLECTION_MINTER_ROLE, msg.sender);
    }

    modifier requireCollectionMinter() {
        require(
            hasRole(COLLECTION_MINTER_ROLE, msg.sender),
            "FleekAccessControl: must have collection minter role"
        );
        _;
    }

    modifier requireTokenController(uint256 tokenId) {
        require(
            hasRole(_tokenRole(tokenId, "CONTROLLER"), msg.sender),
            "FleekAccessControl: must have token role"
        );
        _;
    }

    function _tokenRole(
        uint256 tokenId,
        string memory role
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("TOKEN_", role, tokenId));
    }
}

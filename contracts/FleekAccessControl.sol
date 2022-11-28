// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleekSite.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract FleekAccessControl is AccessControl {
    bytes32 public constant COLLECTION_OWNER_ROLE =
        keccak256("COLLECTION_OWNER_ROLE");
    bytes32 public constant COLLECTION_CONTROLLER_ROLE =
        keccak256("COLLECTION_CONTROLLER_ROLE");

    constructor() {
        _setRoleAdmin(COLLECTION_OWNER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(COLLECTION_OWNER_ROLE, msg.sender);
    }

    modifier requireCollectionOwner() {
        require(
            hasRole(COLLECTION_OWNER_ROLE, msg.sender),
            "FleekAccessControl: must have collection owner role"
        );
        _;
    }

    modifier requireCollectionController() {
        require(
            hasRole(COOLECTION_OWNER_ROLE, msg.sender) ||
                hasRole(COLLECTION_CONTROLLER_ROLE, msg.sender),
            "FleekAccessControl: must have collection controller role"
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
        string role
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("TOKEN_", role, tokenId));
    }
}

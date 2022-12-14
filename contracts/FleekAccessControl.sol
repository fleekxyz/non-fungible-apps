// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract FleekAccessControl is AccessControl {
    bytes32 public constant COLLECTION_OWNER_ROLE = keccak256("COLLECTION_OWNER_ROLE");
    bytes32 public constant COLLECTION_CONTROLLER_ROLE = keccak256("COLLECTION_CONTROLLER_ROLE");

    constructor() {
        _setRoleAdmin(COLLECTION_OWNER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(COLLECTION_OWNER_ROLE, msg.sender);
    }

    modifier requireCollectionOwner() {
        require(hasRole(COLLECTION_OWNER_ROLE, msg.sender), "FleekAccessControl: must have collection owner role");
        _;
    }

    modifier requireCollectionController() {
        require(
            hasRole(COLLECTION_OWNER_ROLE, msg.sender) || hasRole(COLLECTION_CONTROLLER_ROLE, msg.sender),
            "FleekAccessControl: must have collection controller role"
        );
        _;
    }

    modifier requireTokenController(uint256 tokenId) {
        require(hasRole(_tokenRole(tokenId, "CONTROLLER"), msg.sender), "FleekAccessControl: must have token role");
        _;
    }

    function isTokenController(uint256 tokenId, address account) public view returns (bool) {
        return hasRole(_tokenRole(tokenId, "CONTROLLER"), account);
    }

    function _tokenRole(uint256 tokenId, string memory role) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("TOKEN_", role, tokenId));
    }

    function _clearTokenControllers(uint256 tokenId) internal {
        // TODO: Remove token controllers from AccessControl
    }
}

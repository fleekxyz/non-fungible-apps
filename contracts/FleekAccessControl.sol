// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleekSite.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract FleekAccessControl is AccessControl {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    constructor() {
        _setRoleAdmin(OWNER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(OWNER_ROLE, msg.sender);
    }

    modifier requireOwner() {
        require(
            hasRole(OWNER_ROLE, msg.sender),
            "FleekAccessControl: must have owner role"
        );
        _;
    }

    modifier requireController() {
        bool hasPermission = hasRole(CONTROLLER_ROLE, msg.sender) ||
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        require(
            hasPermission,
            "FleekAccessControl: caller is not a controller"
        );
        _;
    }
}

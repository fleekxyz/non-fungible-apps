// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleekSite.sol";

abstract contract FleekAccessControl is IFleekAccessControl {
    address[] public controllers;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier requireOwner() {
        require(
            msg.sender == owner,
            "FleekNFT: Only owner can call this function"
        );
        _;
    }

    modifier requireController() {
        bool _isController = false;
        for (uint256 i = 0; i < controllers.length; i++) {
            if (msg.sender == controllers[i]) {
                _isController = true;
                break;
            }
        }
        bool _isOwner = owner == msg.sender;
        require(
            _isController || _isOwner,
            "FleekNFT: Only controller can call this function"
        );
        _;
    }

    function transferOwnership(
        address _newOwner
    ) external override requireOwner {
        owner = _newOwner;
    }

    function getOwner() external view override returns (address) {
        return owner;
    }

    function isOwner(address _account) external view override returns (bool) {
        return _account == owner;
    }

    function addController(address _controller) external override requireOwner {
        controllers[controllers.length] = _controller;
    }

    function removeController(
        address _controller
    ) external override requireOwner {
        for (uint256 i = 0; i < controllers.length; i++) {
            if (controllers[i] == _controller) {
                controllers[i] = controllers[controllers.length - 1];
                delete controllers[controllers.length - 1];
            }
        }
    }

    function isController(
        address _controller
    ) external view override returns (bool) {
        for (uint256 i = 0; i < controllers.length; i++) {
            if (controllers[i] == _controller) {
                return true;
            }
        }
        return false;
    }

    function getControllers()
        external
        view
        override
        returns (address[] memory)
    {
        return controllers;
    }
}

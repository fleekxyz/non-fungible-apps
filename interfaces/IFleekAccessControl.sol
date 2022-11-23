// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

interface IFleekAccessControl {
    event ControllersChanged();
    event OwnerChanged();

    function transferOwnership(address _newOwner) external;

    function getOwner() external view returns (address);

    function isOwner(address _account) external view returns (bool);

    function addController(address _controller) external;

    function removeController(address _controller) external;

    function isController(address _controller) external view returns (bool);

    function getControllers() external view returns (address[] memory);
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleek.sol";
import "./FleekBuilds.sol";
import "./FleekAccessControl.sol";

abstract contract Fleek is IFleek, FleekBuilds {
    constructor(string _name, string _description) {
        name = _name;
        description = _description;
    }

    function setName(
        string calldata _name
    ) external override requireController {
        name = _name;
        emit MetadataUpdated();
    }

    function setDescription(
        string calldata _description
    ) external override requireController {
        description = _description;
        emit MetadataUpdated();
    }

    function getMetadata()
        external
        view
        override
        returns (string memory, string memory)
    {
        return (name, description);
    }
}

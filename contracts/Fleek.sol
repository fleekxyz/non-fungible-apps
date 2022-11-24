// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleek.sol";
import "./FleekBuilds.sol";
import "./FleekAccessControl.sol";

abstract contract Fleek is IFleek, FleekBuilds {
    string name;
    string description;

    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
    }

    function setName(
        string calldata _name
    ) external override requireController {
        name = _name;
        emit MetadataUpdated(name, description);
    }

    function setDescription(
        string calldata _description
    ) external override requireController {
        description = _description;
        emit MetadataUpdated(name, description);
    }
}

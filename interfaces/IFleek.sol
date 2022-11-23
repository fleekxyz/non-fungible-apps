// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IFleekBuilds.sol";
import "./IFleekAccessControl.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

interface IFleek is IFleekBuilds, IAccessControl {}

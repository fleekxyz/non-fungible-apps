// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleek.sol";
import "./FleekBuilds.sol";
import "./FleekAccessControl.sol";

abstract contract Fleek is IFleek, FleekBuilds {}

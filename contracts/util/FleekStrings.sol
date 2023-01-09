// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

library FleekStrings {
    /**
     * @dev Converts a boolean value to a string.
     */
    function toString(bool _bool) internal pure returns (string memory) {
        return _bool ? "true" : "false";
    }
}

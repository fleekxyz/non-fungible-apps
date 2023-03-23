// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {FleekENS} from "contracts/util/FleekENS.sol";

library Utils {
    /**
     * @dev This function is copyed from `FleekENS.sol`.
     * It changes the `internal` modifier to `public` allowing it
     * to be used in tests applying memory values
     */
    function namehash(string calldata name) public view returns (bytes32) {
        return FleekENS.namehash(bytes(name), 0);
    }
}

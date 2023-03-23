// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library Utils {
    /**
     * @dev This function is copyed from `FleekENS.sol`.
     * It changes the `internal` modifier to `public` allowing it
     * to be used in tests applying memory values
     */
    function namehash(bytes calldata name, uint256 index) public view returns (bytes32) {
        for (uint256 i = index; i < name.length; i++) {
            if (name[i] == ".") {
                return keccak256(abi.encodePacked(namehash(name, i + 1), keccak256(name[index:i])));
            }
        }
        return keccak256(abi.encodePacked(bytes32(0x0), keccak256(name[index:name.length])));
    }
}

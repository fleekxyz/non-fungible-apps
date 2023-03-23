// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ENS} from "@ensdomains/ens-contracts/contracts/registry/ENS.sol";
import {Resolver} from "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";

error MustBeENSOwner();

library FleekENS {
    ENS internal constant _ens = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);

    /**
     * @dev Reverts if the sender is not the owner of the ENS node.
     */
    function requireENSOwner(string calldata name) public view {
        if (_ens.owner(namehash(bytes(name), 0)) != msg.sender) revert MustBeENSOwner();
    }

    function namehash(bytes calldata name, uint256 index) public view returns (bytes32) {
        for (uint256 i = index; i < name.length; i++) {
            if (name[i] == ".") {
                return keccak256(abi.encodePacked(namehash(name, i + 1), keccak256(name[index:i])));
            }
        }
        return keccak256(abi.encodePacked(bytes32(0x0), keccak256(name[index:name.length])));
    }
}

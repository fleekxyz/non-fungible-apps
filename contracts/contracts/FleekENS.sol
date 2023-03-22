// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ENS} from "@ensdomains/ens-contracts/contracts/registry/ENS.sol";
import {Resolver} from "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";

error MustBeENSOwner();

abstract contract FleekENS is Initializable {
    ENS internal constant _ens = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);

    /**
     * @dev Reverts if the sender is not the owner of the ENS node.
     */
    function _requireENSOwner(string memory name) internal view {
        if (_ens.owner(keccak256(abi.encodePacked(name))) != msg.sender) revert MustBeENSOwner();
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

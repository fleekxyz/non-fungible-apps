// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@ensdomains/ens-contracts/contracts/registry/ENS.sol";

// import "@ensdomains/ens-contracts/contracts/resolvers/Resolver.sol";

contract FleekENS {
    // uint256 public immutable FLEEK_COIN_TYPE = 0x80009876;
    bytes32 public immutable FLEEK_NFA_SUBDOMAIN = keccak256("nfa");

    ENS ens = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);

    // function resolve(bytes32 node) public view returns (address) {
    //     Resolver resolver = _getResolverFor(node);
    //     return resolver.addr(node);
    // }

    /**
    WARN: Forward the call to ENS or Resolver will not work due to wrong signature

    function setENSPermissionByAddr(bytes32 node, bytes calldata to) public {
        Resolver resolver = _getResolverFor(node);
        resolver.setAddr(node, FLEEK_COIN_TYPE, to);
    }

    function setENSPermission(bytes32 node, address owner) public returns (bytes32) {
        return ens.setSubnodeOwner(node, FLEEK_NFA_SUBDOMAIN, owner);
    }
     */

    function checkENSPermission(bytes32 node) public view returns (bool) {
        // check if the node is owned by the sender
        if (ens.owner(node) == msg.sender) return true;

        // check by subdomain
        bytes32 subdomain = keccak256(abi.encodePacked(node, FLEEK_NFA_SUBDOMAIN));
        return ens.owner(subdomain) == msg.sender;
    }

    // function _getResolverFor(bytes32 node) private view returns (Resolver) {
    //     return Resolver(ens.resolver(node));
    // }
}

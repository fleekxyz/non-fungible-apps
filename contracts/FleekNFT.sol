// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleekNFT.sol";
import "./FleekNFTBuilds.sol";
import "./FleekNFTControllers.sol";

abstract contract FleekNFT is IFleekNFT, FleekNFTBuilds {
    function mint(
        build calldata _build
    ) public override requireOwner returns (uint256) {
        require(builds.length == 0, "FleekNFT: NFT already minted");
        this.update(_build);
        return builds.length - 1;
    }
}

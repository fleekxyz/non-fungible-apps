// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IFleekNFTBuilds.sol";
import "./IFleekNFTControllers.sol";

interface IFleekNFT is IFleekNFTBuilds, IFleekNFTControllers {
    function mint(build calldata _build) external returns (uint256);
}

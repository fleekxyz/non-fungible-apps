// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../interfaces/IFleekNFTBuilds.sol";
import "./FleekNFTControllers.sol";

abstract contract FleekNFTBuilds is IFleekNFTBuilds, FleekNFTControllers {
    build[] public builds;

    function update(
        build calldata _newBuild
    ) external override requireController {
        builds.push(_newBuild);
        emit Upgraded();
    }

    function getCurrentBuild() external view override returns (build memory) {
        return builds[builds.length - 1];
    }

    function getBuildById(
        uint256 _buildId
    ) external view override returns (build memory) {
        return builds[_buildId];
    }

    function getBuilds() external view override returns (build[] memory) {
        return builds;
    }
}

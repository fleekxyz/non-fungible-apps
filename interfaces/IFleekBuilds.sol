// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

interface IFleekBuilds {
    struct build {
        string _uri;
        string _hash;
        string _repo;
        string _repository;
    }

    event InitialVersionDeploy();

    event Upgraded(build _build);

    function update(build calldata _newBuild) external;

    function getCurrentBuild() external view returns (build memory);

    function getBuildById(
        uint256 _buildId
    ) external view returns (build memory);

    function getBuilds() external view returns (build[] memory);
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Fleek.sol";
import "../interfaces/IFleekSite.sol";

contract FleekSite is IFleekSite, Fleek {
    metadata public _metadata;

    function updateMetadata(
        metadata calldata _newMetadata
    ) external override requireController {
        _metadata = _newMetadata;
        emit MetadataUpdated();
    }

    function getMetadata() external view override returns (metadata memory) {
        return _metadata;
    }
}

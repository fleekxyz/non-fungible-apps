// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./FleekNFT.sol";
import "../interfaces/IFleekSiteNFT.sol";

contract FleekSiteNFT is IFleekSiteNFT, FleekNFT {
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

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IFleekNFT.sol";

interface IFleekSiteNFT is IFleekNFT {
    struct metadata {
        string _name;
        string _description;
        string _thumbnail;
        string _external_url;
    }

    event MetadataUpdated();

    function updateMetadata(metadata calldata _newMetadata) external;

    function getMetadata() external view returns (metadata memory);
}

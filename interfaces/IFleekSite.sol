// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IFleek.sol";

interface IFleekSite is IFleek {
    event MetadataUpdated(
        string name,
        string description,
        string thumbnail,
        string external_url
    );

    function setThumbnail(string calldata _thumbnail) external;

    function setExternalUrl(string calldata _external_url) external;
}

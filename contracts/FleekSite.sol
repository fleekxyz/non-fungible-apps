// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Fleek.sol";
import "../interfaces/IFleekSite.sol";

contract FleekSite is IFleekSite, Fleek {
    function setThumbnail(
        string calldata _thumbnail
    ) external override requireController {
        thumbnail = _thumbnail;
        emit MetadataUpdated();
    }

    function setExternalUrl(
        string calldata _external_url
    ) external override requireController {
        external_url = _external_url;
        emit MetadataUpdated();
    }

    function getMetadata()
        external
        view
        override
        returns (string memory, string memory, string memory, string memory)
    {
        return (name, description, thumbnail, external_url);
    }
}

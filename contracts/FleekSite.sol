// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Fleek.sol";
import "../interfaces/IFleekSite.sol";

contract FleekSite is IFleekSite, Fleek {
    constructor(
        string memory _name,
        string memory _description,
        string memory _thumbnail,
        string memory _external_url
    ) Fleek(_name, _description) {
        thumbnail = _thumbnail;
        external_url = _external_url;
    }

    function setThumbnail(
        string calldata _thumbnail
    ) external override requireController {
        thumbnail = _thumbnail;
        emit MetadataUpdated(name, description, thumbnail, external_url);
    }

    function setExternalUrl(
        string calldata _external_url
    ) external override requireController {
        external_url = _external_url;
        emit MetadataUpdated(name, description, thumbnail, external_url);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../FleekERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./FleekSVG.sol";

library FleekStrings {
    using Strings for uint256;
    using Strings for uint160;
    using FleekStrings for bool;
    using FleekStrings for bytes3;

    /**
     * @dev Converts a boolean value to a string.
     */
    function toString(bool _bool) internal pure returns (string memory) {
        return _bool ? "true" : "false";
    }

    /**
     * @dev Converts a string to a base64 string.
     */
    function toBase64(string memory str) internal pure returns (string memory) {
        return Base64.encode(bytes(str));
    }

    /**
     * @dev Converts FleekERC721.App to a JSON string.
     * It requires to receive owner address as a parameter.
     */
    function toString(FleekERC721.App storage app, address owner) internal view returns (string memory) {
        // prettier-ignore
        return string(abi.encodePacked(
            '{',
                '"name":"', app.name, '",',
                '"description":"', app.description, '",',
                '"owner":"', uint160(owner).toHexString(20), '",',
                '"external_url":"', app.externalURL, '",',
                '"image":"', FleekSVG.generateBase64(app.name, app.ENS, app.logo, app.color.toColorString()), '",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"', app.ENS,'"},',
                    '{"trait_type": "Commit Hash", "value":"', app.builds[app.currentBuild].commitHash,'"},',
                    '{"trait_type": "Repository", "value":"', app.builds[app.currentBuild].gitRepository,'"},',
                    '{"trait_type": "Version", "value":"', app.currentBuild.toString(),'"}',
                    '{"trait_type": "Color", "value":"', app.color.toColorString(),'"}',
                ']',
            '}'
        ));
    }

    /**
     * @dev Converts FleekERC721.AccessPoint to a JSON string.
     */
    function toString(FleekERC721.AccessPoint storage ap) internal view returns (string memory) {
        // prettier-ignore
        return string(abi.encodePacked(
            "{",
                '"tokenId":', ap.tokenId.toString(), ",",
                '"score":', ap.score.toString(), ",",
                '"nameVerified":', ap.nameVerified.toString(), ",",
                '"contentVerified":', ap.contentVerified.toString(), ",",
                '"owner":"', uint160(ap.owner).toHexString(20), '"',
            "}"
        ));
    }

    /**
     * @dev Converts bytes3 to a hex color string.
     */
    function toColorString(bytes3 _bytes) internal pure returns (string memory) {
        return string(abi.encodePacked("#", _bytes[0], _bytes[1], _bytes[2]));
    }
}

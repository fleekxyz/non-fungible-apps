// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../FleekERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

library FleekSVG {
    /**
     * @dev Generates a SVG image.
     */
    function generateBase64(string memory name, string memory ENS) internal pure returns (string memory) {
        return (
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="640" height="480" viewBox="0 0 640 480" xml:space="preserve">',
                            "<defs>",
                            "</defs>",
                            '<g transform="matrix(3.42 0 0 3.42 300.98 252.98)"  >',
                            '<polygon style="stroke: rgb(0,0,0); stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(152,152,183); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-50,-50 -50,50 50,50 50,-50 " />',
                            "</g>",
                            '<g transform="matrix(1 0 0 1 303.5 115.67)" style=""  >',
                            '<text xml:space="preserve" font-family="Open Sans" font-size="24" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-45.7" y="5.65" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">Fleek NFAs</tspan></text>',
                            "</g>",
                            '<g transform="matrix(1 0 0 1 302 261.47)" style=""  >',
                            '<text xml:space="preserve" font-family="Open Sans" font-size="28" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-44.26" y="-6.14" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">',
                            name,
                            '</tspan><tspan x="-37.14" y="17.45" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">',
                            ENS,
                            "</tspan></text>",
                            "</g>",
                            "</svg>"
                        )
                    )
                )
            )
        );
    }
}

pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol";
import "../../contracts/util/FleekStrings.sol";

contract FleekTest is Test {
    FleekERC721 fleekContract;
    using Strings for uint160;
    address constant DEPLOYER = 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496;
    string constant FLEEK_AP_URL = "https://fleek_cloned.xyz";

    function setUp() public {
        fleekContract = new FleekERC721();
        fleekContract.initialize("Test Contract", "FLKAPS");
    }

    function testName() public {
        assertEq(fleekContract.name(), "Test Contract");
    }

    function testSymbol() public {
        assertEq(fleekContract.symbol(), "FLKAPS");
    }

    function testMint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);
        assertEq(fleekContract.ownerOf(mint), DEPLOYER);
    }

    function testMintingMintedToken() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(first_mint, 0);
        assertEq(second_mint, 1);
    }

    function testMintingMoreThanOneTokenForTheSameAddress() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests [2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(second_mint, 1);
    }

    function testMintingTwoTokensForTwoAddresses() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            address(12),
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests[2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(second_mint, 1);
    }

    function _generateSVG(string memory name, string memory ENS) internal pure returns (string memory) {
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

    function testTokenURI() public {
        string memory name = "Foundry Test App";
        string memory ens = "fleek_xyz";

        uint256 mint = fleekContract.mint(
            DEPLOYER,
            name,
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            ens,
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        string memory tokenURI = fleekContract.tokenURI(mint);

        assertEq(
            tokenURI,
            "data:application/json;base64,eyJuYW1lIjoiRm91bmRyeSBUZXN0IEFwcCIsImRlc2NyaXB0aW9uIjoiVGhpcyBpcyBhIHRlc3QgYXBwbGljYXRpb24gc3VibWl0dGVkIGJ5IGZvdW5kcnkgdGVzdHMuIiwib3duZXIiOiIweDdmYTkzODViZTEwMmFjM2VhYzI5NzQ4M2RkNjIzM2Q2MmIzZTE0OTYiLCJleHRlcm5hbF91cmwiOiJodHRwczovL2ZsZWVrLnh5eiIsImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpT0RjNElpQm9aV2xuYUhROUlqa3hPQ0lnZG1sbGQwSnZlRDBpTUNBd0lEZzNPQ0E1TVRnaUlHWnBiR3c5SW01dmJtVWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStQSE4wZVd4bElIUjVjR1U5SW5SbGVIUXZZM056SWo1QWFXMXdiM0owSUhWeWJDZ2lhSFIwY0hNNkx5OW1iMjUwY3k1bmIyOW5iR1ZoY0dsekxtTnZiUzlqYzNNeVAyWmhiV2xzZVQxSmJuUmxjanAzWjJoMFFEVXdNRHMyTURBaUtUczhMM04wZVd4bFBqeHdZWFJvSUdROUlrMDROellnTVRJNUxqVldNVEkzTGpWSU9EYzBTRGcxTnk0MVZqYzVTRGczTkVnNE56WldOemRXTmpndU1qYzROa000TnpZZ05qRXVPREV3TmlBNE56TXVOVGc1SURVMUxqVTNORGtnT0RZNUxqSXpPQ0ExTUM0M09Ea3hURGd6TWk0Mk1qSWdNVEF1TlRFd05VTTRNamN1TmprMElEVXVNRGt3TVRjZ09ESXdMamN3T0NBeUlEZ3hNeTR6T0RNZ01rZzNNemN1T1RRM1F6Y3lPQzQ0T1RjZ01pQTNNakF1TkRrNElEWXVOekExTnprZ056RTFMamMzTXlBeE5DNDBNalJNTnpFd0xqRXpOU0F5TXk0Mk16STVRemN3T1M0d05EUWdNalV1TkRFMElEY3dOeTR4TURZZ01qWXVOU0EzTURVdU1ERTRJREkyTGpWSU5qZ3lTRFk0TUZZeE1WWTVTRFkzT0VnNU9VZzVOMVl4TVVNNU55QTJMakF5T1RRMElEa3lMamszTURZZ01pQTRPQ0F5U0RJNFF6RXpMalkwTURZZ01pQXlJREV6TGpZME1EWWdNaUF5T0ZZNE9UQkRNaUE1TURRdU16VTVJREV6TGpZME1EWWdPVEUySURJNElEa3hOa2c0TlRCRE9EWTBMak0xT1NBNU1UWWdPRGMySURrd05DNHpOVGtnT0RjMklEZzVNRll4TWprdU5Wb2lJR1pwYkd3OUlpTXhNekV6TVRZaUlDOCtQSEJoZEdnZ1pEMGlUVGczTmlBeE1qa3VOVll4TWpjdU5VZzROelJJT0RVM0xqVldOemxJT0RjMFNEZzNObFkzTjFZMk9DNHlOemcyUXpnM05pQTJNUzQ0TVRBMklEZzNNeTQxT0RrZ05UVXVOVGMwT1NBNE5qa3VNak00SURVd0xqYzRPVEZNT0RNeUxqWXlNaUF4TUM0MU1UQTFRemd5Tnk0Mk9UUWdOUzR3T1RBeE55QTRNakF1TnpBNElESWdPREV6TGpNNE15QXlTRGN6Tnk0NU5EZEROekk0TGpnNU55QXlJRGN5TUM0ME9UZ2dOaTQzTURVM09TQTNNVFV1TnpjeklERTBMalF5TkV3M01UQXVNVE0xSURJekxqWXpNamxETnpBNUxqQTBOQ0F5TlM0ME1UUWdOekEzTGpFd05pQXlOaTQxSURjd05TNHdNVGdnTWpZdU5VZzJPREpJTmpnd1ZqRXhWamxJTmpjNFNEazVTRGszVmpFeFF6azNJRFl1TURJNU5EUWdPVEl1T1Rjd05pQXlJRGc0SURKSU1qaERNVE11TmpRd05pQXlJRElnTVRNdU5qUXdOaUF5SURJNFZqZzVNRU15SURrd05DNHpOVGtnTVRNdU5qUXdOaUE1TVRZZ01qZ2dPVEUyU0RnMU1FTTROalF1TXpVNUlEa3hOaUE0TnpZZ09UQTBMak0xT1NBNE56WWdPRGt3VmpFeU9TNDFXaUlnWm1sc2JEMGlkWEpzS0NOd1lXbHVkREJmYkdsdVpXRnlYekV6WHpNektTSWdjM1J5YjJ0bFBTSjFjbXdvSTIxaGFXNHBJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqUWlJR1pwYkd3dGIzQmhZMmwwZVQwaU1DNHlJaTgrUEhCaGRHZ2daRDBpVFRjNE15QTVNVFpJTnpnMVZqa3hORlkwTWpSRE56ZzFJRFF4TUM0M05EVWdOemMwTGpJMU5TQTBNREFnTnpZeElEUXdNRWd4TVRkRE1UQXpMamMwTlNBME1EQWdPVE1nTkRFd0xqYzBOU0E1TXlBME1qUldPVEUwVmpreE5rZzVOVWczT0ROYUlpQm1hV3hzUFNKaWJHRmpheUlnWm1sc2JDMXZjR0ZqYVhSNVBTSXdMakUwSWlCemRISnZhMlU5SW5WeWJDZ2piV0ZwYmlraUlITjBjbTlyWlMxM2FXUjBhRDBpTkNJdlBqeHdZWFJvSUdROUlrMDJOUzR6TWpVNElEWTBMalZETmpZdU1EZ3lOU0EyTkM0MUlEWTJMalUyTlNBMk15NDJPVEl4SURZMkxqSXdOak1nTmpNdU1ESTFPVXcxTUM0ek9EQTFJRE16TGpZek5USkROVEF1TURBeU9TQXpNaTQ1TXpRZ05EZ3VPVGszTVNBek1pNDVNelFnTkRndU5qRTVOU0F6TXk0Mk16VXlURE15TGpjNU16Y2dOak11TURJMU9VTXpNaTQwTXpVZ05qTXVOamt5TVNBek1pNDVNVGMxSURZMExqVWdNek11TmpjME1pQTJOQzQxU0RReFF6UXhMalUxTWpNZ05qUXVOU0EwTWlBMk5DNDVORGMzSURReUlEWTFMalZXT0RaRE5ESWdPRFl1TlRVeU15QTBNaTQwTkRjM0lEZzNJRFF6SURnM1NEVTJRelUyTGpVMU1qTWdPRGNnTlRjZ09EWXVOVFV5TXlBMU55QTRObFkyTlM0MVF6VTNJRFkwTGprME56Y2dOVGN1TkRRM055QTJOQzQxSURVNElEWTBMalZJTmpVdU16STFPRm9pSUdacGJHdzlJblZ5YkNnamJXRnBiaWtpTHo0OGNHRjBhQ0JrUFNKTk5qVXVNekkxT0NBeE5URXVOVU0yTmk0d09ESTFJREUxTVM0MUlEWTJMalUyTlNBeE5UQXVOamt5SURZMkxqSXdOak1nTVRVd0xqQXlOa3cxTUM0ek9EQTFJREV5TUM0Mk16VkROVEF1TURBeU9TQXhNVGt1T1RNMElEUTRMams1TnpFZ01URTVMamt6TkNBME9DNDJNVGsxSURFeU1DNDJNelZNTXpJdU56a3pOeUF4TlRBdU1ESTJRek15TGpRek5TQXhOVEF1TmpreUlETXlMamt4TnpVZ01UVXhMalVnTXpNdU5qYzBNaUF4TlRFdU5VZzBNVU0wTVM0MU5USXpJREUxTVM0MUlEUXlJREUxTVM0NU5EZ2dORElnTVRVeUxqVldNVGN6UXpReUlERTNNeTQxTlRJZ05ESXVORFEzTnlBeE56UWdORE1nTVRjMFNEVTJRelUyTGpVMU1qTWdNVGMwSURVM0lERTNNeTQxTlRJZ05UY2dNVGN6VmpFMU1pNDFRelUzSURFMU1TNDVORGdnTlRjdU5EUTNOeUF4TlRFdU5TQTFPQ0F4TlRFdU5VZzJOUzR6TWpVNFdpSWdabWxzYkQwaVlteGhZMnNpSUdacGJHd3RiM0JoWTJsMGVUMGlNQzQxSWk4K1BIQmhkR2dnWkQwaVRUWTFMak15TlRnZ01qTTRMalZETmpZdU1EZ3lOU0F5TXpndU5TQTJOaTQxTmpVZ01qTTNMalk1TWlBMk5pNHlNRFl6SURJek55NHdNalpNTlRBdU16Z3dOU0F5TURjdU5qTTFRelV3TGpBd01qa2dNakEyTGprek5DQTBPQzQ1T1RjeElESXdOaTQ1TXpRZ05EZ3VOakU1TlNBeU1EY3VOak0xVERNeUxqYzVNemNnTWpNM0xqQXlOa016TWk0ME16VWdNak0zTGpZNU1pQXpNaTQ1TVRjMUlESXpPQzQxSURNekxqWTNORElnTWpNNExqVklOREZETkRFdU5UVXlNeUF5TXpndU5TQTBNaUF5TXpndU9UUTRJRFF5SURJek9TNDFWakkyTUVNME1pQXlOakF1TlRVeUlEUXlMalEwTnpjZ01qWXhJRFF6SURJMk1VZzFOa00xTmk0MU5USXpJREkyTVNBMU55QXlOakF1TlRVeUlEVTNJREkyTUZZeU16a3VOVU0xTnlBeU16Z3VPVFE0SURVM0xqUTBOemNnTWpNNExqVWdOVGdnTWpNNExqVklOalV1TXpJMU9Gb2lJR1pwYkd3OUltSnNZV05ySWlCbWFXeHNMVzl3WVdOcGRIazlJakF1TlNJdlBqeHdZWFJvSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ1kyeHBjQzF5ZFd4bFBTSmxkbVZ1YjJSa0lpQmtQU0pOTmpneUlEZElNakkxVmpJNU9VTXlNalVnTXpFeUxqSTFOU0F5TXpVdU56UTFJRE15TXlBeU5Ea2dNekl6U0RZMU9FTTJOekV1TWpVMUlETXlNeUEyT0RJZ016RXlMakkxTlNBMk9ESWdNams1VmpkYVRUVXhOQ0EwTkM0NU5qQTVRelV3Tnk0ek56TWdORFF1T1RZd09TQTFNRElnTlRBdU16TXpOU0ExTURJZ05UWXVPVFl3T1ZZeU9EUXVNekkxUXpVd01pQXlPVEF1T1RVeUlEVXdOeTR6TnpNZ01qazJMak15TlNBMU1UUWdNamsyTGpNeU5VZzJNVEJETmpFMkxqWXlOeUF5T1RZdU16STFJRFl5TWlBeU9UQXVPVFV5SURZeU1pQXlPRFF1TXpJMVZqVTJMamsyTURsRE5qSXlJRFV3TGpNek16VWdOakUyTGpZeU55QTBOQzQ1TmpBNUlEWXhNQ0EwTkM0NU5qQTVTRFV4TkZvaUlHWnBiR3c5SW5WeWJDZ2piV0ZwYmlraUx6NDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRnd01TNDRNRFVnTlRRdU1UazRORU00TURJdU5ERTNJRFV6TGpZeU5pQTRNRE11TXpRMklEVTBMalF3TmpVZ09EQXlMamcyT0NBMU5TNHdPVEE0VERjNE1TNDBPRGtnT0RVdU5qa3hPRU0zT0RFdU1UVXlJRGcyTGpFM016UWdOemd4TGpVek55QTROaTQ0TWpJNUlEYzRNaTR4TWprZ09EWXVOemN5VERjNU5DNDJPVGNnT0RVdU5qbEROemsxTGpNeU1pQTROUzQyTXpZeElEYzVOUzQzSURnMkxqTTFOaUEzT1RVdU1qa3lJRGcyTGpneU5qZE1OemN6TGpjeU15QXhNVEV1TnpVNFF6YzNNeTR6TVRZZ01URXlMakl5T0NBM056TXVOamt6SURFeE1pNDVORGdnTnpjMExqTXhPU0F4TVRJdU9EazBURGM0Tnk0NE5USWdNVEV4TGpjeU9VTTNPRGd1TlRFMElERXhNUzQyTnpJZ056ZzRMamczT1NBeE1USXVORFk0SURjNE9DNHpPVGdnTVRFeUxqa3hPVXczTXpZdU1UazFJREUyTVM0NE1ESkROek0xTGpVNE15QXhOakl1TXpjMElEY3pOQzQyTlRRZ01UWXhMalU1TXlBM016VXVNVE15SURFMk1DNDVNRGxNTnpVMkxqYzVNaUF4TWprdU9UQTFRemMxTnk0eE1qa2dNVEk1TGpReU5DQTNOVFl1TnpRMElERXlPQzQzTnpRZ056VTJMakUxTWlBeE1qZ3VPREkxVERjME15NHpNVFlnTVRJNUxqa3pRemMwTWk0Mk9USWdNVEk1TGprNE5DQTNOREl1TXpFMElERXlPUzR5TmprZ056UXlMamN4TnlBeE1qZ3VOemszVERjMk15NDJOVElnTVRBMExqSTVNME0zTmpRdU1EVTFJREV3TXk0NE1qRWdOell6TGpZM055QXhNRE11TVRBMUlEYzJNeTR3TlRNZ01UQXpMakUxT1V3M05UQXVNVFE0SURFd05DNHlOME0zTkRrdU5EZzJJREV3TkM0ek1qY2dOelE1TGpFeU1TQXhNRE11TlRNeUlEYzBPUzQyTURNZ01UQXpMakE0TVV3NE1ERXVPREExSURVMExqRTVPRFJhSWlCbWFXeHNQU0ozYUdsMFpTSXZQanhwYldGblpTQjRQU0l6TXpraUlIazlJalEzTmlJZ2QybGtkR2c5SWpJd01DSWdhR1ZwWjJoMFBTSXlNREFpSUdoeVpXWTlJbVJoZEdFNmFXMWhaMlV2YzNabkszaHRiRHRpWVhObE5qUXNVRWhPTWxwNVFtMWhWM2h6VUZOS2RXSXlOV3hKYVVKdldsZHNibUZJVVRsSmFra3hUVVJCYVVsSVpIQmFTRkp2VUZOSmVVMVVaM3BKYVVJMFlsZDRkV042TUdsaFNGSXdZMFJ2ZGt3elpETmtlVFV6VFhrMWRtTnRZM1pOYWtGM1RVTTVlbVJ0WTJsSlNGcHdXbGhrUTJJelp6bEpha0ZuVFVOQmVFMXFVV2ROVkZGNFRHcFZlazFVYXpWUFZHczFUMVJyTlU5VWF6UkphalE0WTBkR01HRkRRbXRRVTBwT1RWUkJkVTE2WjNwSlJFVjVUbWswTkU5VVVrMU5RMEYzWWtSRmVVNURRWFZOYWxVeFRGUkZkMHhxYXpOUFUwRjRUV3BaZFU1cVRUVk1WRlYzVEdwVk1VMTVRWGhPUXpReVRYcG9Oa2xwUW0xaFYzaHpVRk5KYWxwVVRUQmFha2t5U1drNEsxQklRbWhrUjJkbldrUXdhVlJVV1hsTWFsRXlUME5CZUUxcWEzVk5hbU16Vm1wRmVVeHFRVFJPVjNjeFRWTTBkMDVxVVhWTlZHTjBUMU0wZUUxRVdXZE5WRUV3VEdwbk1VMVliMmxKUjFwd1lrZDNPVWxwVG14YWFsa3hUVzFGYVV4Nk5EaGpSMFl3WVVOQ2ExQlRTazVQVkd0MVRrUnJaMDVFUlhWTmVsbDVZa1JGZFU1RVVUSk1WRVV4VEdwUk5WTkVTWGxNYWswMFRUSjNNRXhxVFRCSlJGRXpUR3BSTldGRVZUQk1ha2w0VFRCM00wOURORFJOVTBFMVRYazBNazFVWkhOTVZFVXpUR3BOTWsxcFFUQk1hbGswVEZSRk0weHFXWGhPZVRBeFRHcEZkMDVwTUhWUFZFMHlURlJGZVV4cVFUUk9WV2Q1VG5rMGVrMVViSE5OYVRSNFRXcG5aMDFxVVhWT2FtZDRTVVJOZVVsRVozVlBWRTB5U1VSTmVVeHFTVEZPVXpBMFRHcHJlazVwUVRCTWFrMHdURlJSTkV4cVJUTlRSRkY0VEdwRmQwNHdkM3BQVXpRd1QxTkJNRTFUTkhwT2FrbzJTV2xDYldGWGVITlFVMGxxV20xYWJVbHBPQ3RRUXpsNlpHMWpLeUl2UGp4a1pXWnpQanhzYVc1bFlYSkhjbUZrYVdWdWRDQnBaRDBpYldGcGJpSStQSE4wYjNBZ2MzUnZjQzFqYjJ4dmNqMGlJMlV6TkdZeU5pSXZQand2YkdsdVpXRnlSM0poWkdsbGJuUStQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0p3WVdsdWREQmZiR2x1WldGeVh6RXpYek16SWlCNE1UMGlOQ0lnZVRFOUlqa3hOQ0lnZURJOUlqZzNOQ0lnZVRJOUlqTXVPVGs1T1RnaUlHZHlZV1JwWlc1MFZXNXBkSE05SW5WelpYSlRjR0ZqWlU5dVZYTmxJajQ4YzNSdmNDQnpkRzl3TFdOdmJHOXlQU0lqTVVReFJUSTFJaTgrUEhOMGIzQWdiMlptYzJWMFBTSXhJaUJ6ZEc5d0xXTnZiRzl5UFNJalpUTTBaakkySWk4K1BDOXNhVzVsWVhKSGNtRmthV1Z1ZEQ0OEwyUmxabk0rUEhSbGVIUWdabTl1ZEMxbVlXMXBiSGs5SWtsdWRHVnlMQ0J6WVc1ekxYTmxjbWxtSWlCbWIyNTBMWGRsYVdkb2REMGlZbTlzWkNJZ2VEMGlNVE0zSWlCNVBTSTNPVEFpSUdadmJuUXRjMmw2WlQwaU5UWWlJR1pwYkd3OUlpTkZOVVUzUmpnaVBrWnZkVzVrY25rZ1ZHVnpkQ0JCY0hBOEwzUmxlSFErUEhSbGVIUWdabTl1ZEMxbVlXMXBiSGs5SWtsdWRHVnlMQ0J6WVc1ekxYTmxjbWxtSWlCbWIyNTBMWGRsYVdkb2REMGlibTl5YldGc0lpQjRQU0l4TXpjaUlIazlJamcwTmlJZ1ptOXVkQzF6YVhwbFBTSXpNQ0lnWm1sc2JEMGlJemRHT0RFNU1pSStabXhsWld0ZmVIbDZQQzkwWlhoMFBqd3ZjM1puUGc9PSIsImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjogIkVOUyIsICJ2YWx1ZSI6ImZsZWVrX3h5eiJ9LHsidHJhaXRfdHlwZSI6ICJDb21taXQgSGFzaCIsICJ2YWx1ZSI6ImFmZmYzZjYifSx7InRyYWl0X3R5cGUiOiAiUmVwb3NpdG9yeSIsICJ2YWx1ZSI6Imh0dHBzOi8vZ2l0aHViLmNvbS9mbGVla3h5ei9ub24tZnVuZ2libGUtYXBwcyJ9LHsidHJhaXRfdHlwZSI6ICJWZXJzaW9uIiwgInZhbHVlIjoiMCJ9LHsidHJhaXRfdHlwZSI6ICJDb2xvciIsICJ2YWx1ZSI6IiNlMzRmMjYifV19"
        );
    }

    function testCallingTokenURIAfterChangingAllPossibleFields() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        assertEq(
            tokenURI,
            "data:application/json;base64,eyJuYW1lIjoiRm91bmRyeSBUZXN0IEFwcCAyIiwiZGVzY3JpcHRpb24iOiJUaGlzIGlzIGEgdGVzdCBhcHBsaWNhdGlvbiBzdWJtaXR0ZWQgYnkgZm91bmRyeSB0ZXN0cy4gMiIsIm93bmVyIjoiMHg3ZmE5Mzg1YmUxMDJhYzNlYWMyOTc0ODNkZDYyMzNkNjJiM2UxNDk2IiwiZXh0ZXJuYWxfdXJsIjoiaHR0cHM6Ly9mbGVlazIueHl6IiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlPRGM0SWlCb1pXbG5hSFE5SWpreE9DSWdkbWxsZDBKdmVEMGlNQ0F3SURnM09DQTVNVGdpSUdacGJHdzlJbTV2Ym1VaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK1BITjBlV3hsSUhSNWNHVTlJblJsZUhRdlkzTnpJajVBYVcxd2IzSjBJSFZ5YkNnaWFIUjBjSE02THk5bWIyNTBjeTVuYjI5bmJHVmhjR2x6TG1OdmJTOWpjM015UDJaaGJXbHNlVDFKYm5SbGNqcDNaMmgwUURVd01EczJNREFpS1RzOEwzTjBlV3hsUGp4d1lYUm9JR1E5SWswNE56WWdNVEk1TGpWV01USTNMalZJT0RjMFNEZzFOeTQxVmpjNVNEZzNORWc0TnpaV056ZFdOamd1TWpjNE5rTTROellnTmpFdU9ERXdOaUE0TnpNdU5UZzVJRFUxTGpVM05Ea2dPRFk1TGpJek9DQTFNQzQzT0RreFREZ3pNaTQyTWpJZ01UQXVOVEV3TlVNNE1qY3VOamswSURVdU1Ea3dNVGNnT0RJd0xqY3dPQ0F5SURneE15NHpPRE1nTWtnM016Y3VPVFEzUXpjeU9DNDRPVGNnTWlBM01qQXVORGs0SURZdU56QTFOemtnTnpFMUxqYzNNeUF4TkM0ME1qUk1OekV3TGpFek5TQXlNeTQyTXpJNVF6Y3dPUzR3TkRRZ01qVXVOREUwSURjd055NHhNRFlnTWpZdU5TQTNNRFV1TURFNElESTJMalZJTmpneVNEWTRNRll4TVZZNVNEWTNPRWc1T1VnNU4xWXhNVU01TnlBMkxqQXlPVFEwSURreUxqazNNRFlnTWlBNE9DQXlTREk0UXpFekxqWTBNRFlnTWlBeUlERXpMalkwTURZZ01pQXlPRlk0T1RCRE1pQTVNRFF1TXpVNUlERXpMalkwTURZZ09URTJJREk0SURreE5rZzROVEJET0RZMExqTTFPU0E1TVRZZ09EYzJJRGt3TkM0ek5Ua2dPRGMySURnNU1GWXhNamt1TlZvaUlHWnBiR3c5SWlNeE16RXpNVFlpSUM4K1BIQmhkR2dnWkQwaVRUZzNOaUF4TWprdU5WWXhNamN1TlVnNE56UklPRFUzTGpWV056bElPRGMwU0RnM05sWTNOMVkyT0M0eU56ZzJRemczTmlBMk1TNDRNVEEySURnM015NDFPRGtnTlRVdU5UYzBPU0E0TmprdU1qTTRJRFV3TGpjNE9URk1PRE15TGpZeU1pQXhNQzQxTVRBMVF6Z3lOeTQyT1RRZ05TNHdPVEF4TnlBNE1qQXVOekE0SURJZ09ERXpMak00TXlBeVNEY3pOeTQ1TkRkRE56STRMamc1TnlBeUlEY3lNQzQwT1RnZ05pNDNNRFUzT1NBM01UVXVOemN6SURFMExqUXlORXczTVRBdU1UTTFJREl6TGpZek1qbEROekE1TGpBME5DQXlOUzQwTVRRZ056QTNMakV3TmlBeU5pNDFJRGN3TlM0d01UZ2dNall1TlVnMk9ESklOamd3VmpFeFZqbElOamM0U0RrNVNEazNWakV4UXprM0lEWXVNREk1TkRRZ09USXVPVGN3TmlBeUlEZzRJREpJTWpoRE1UTXVOalF3TmlBeUlESWdNVE11TmpRd05pQXlJREk0VmpnNU1FTXlJRGt3TkM0ek5Ua2dNVE11TmpRd05pQTVNVFlnTWpnZ09URTJTRGcxTUVNNE5qUXVNelU1SURreE5pQTROellnT1RBMExqTTFPU0E0TnpZZ09Ea3dWakV5T1M0MVdpSWdabWxzYkQwaWRYSnNLQ053WVdsdWREQmZiR2x1WldGeVh6RXpYek16S1NJZ2MzUnliMnRsUFNKMWNtd29JMjFoYVc0cElpQnpkSEp2YTJVdGQybGtkR2c5SWpRaUlHWnBiR3d0YjNCaFkybDBlVDBpTUM0eUlpOCtQSEJoZEdnZ1pEMGlUVGM0TXlBNU1UWklOemcxVmpreE5GWTBNalJETnpnMUlEUXhNQzQzTkRVZ056YzBMakkxTlNBME1EQWdOell4SURRd01FZ3hNVGRETVRBekxqYzBOU0EwTURBZ09UTWdOREV3TGpjME5TQTVNeUEwTWpSV09URTBWamt4TmtnNU5VZzNPRE5hSWlCbWFXeHNQU0ppYkdGamF5SWdabWxzYkMxdmNHRmphWFI1UFNJd0xqRTBJaUJ6ZEhKdmEyVTlJblZ5YkNnamJXRnBiaWtpSUhOMGNtOXJaUzEzYVdSMGFEMGlOQ0l2UGp4d1lYUm9JR1E5SWswMk5TNHpNalU0SURZMExqVkROall1TURneU5TQTJOQzQxSURZMkxqVTJOU0EyTXk0Mk9USXhJRFkyTGpJd05qTWdOak11TURJMU9VdzFNQzR6T0RBMUlETXpMall6TlRKRE5UQXVNREF5T1NBek1pNDVNelFnTkRndU9UazNNU0F6TWk0NU16UWdORGd1TmpFNU5TQXpNeTQyTXpVeVRETXlMamM1TXpjZ05qTXVNREkxT1VNek1pNDBNelVnTmpNdU5qa3lNU0F6TWk0NU1UYzFJRFkwTGpVZ016TXVOamMwTWlBMk5DNDFTRFF4UXpReExqVTFNak1nTmpRdU5TQTBNaUEyTkM0NU5EYzNJRFF5SURZMUxqVldPRFpETkRJZ09EWXVOVFV5TXlBME1pNDBORGMzSURnM0lEUXpJRGczU0RVMlF6VTJMalUxTWpNZ09EY2dOVGNnT0RZdU5UVXlNeUExTnlBNE5sWTJOUzQxUXpVM0lEWTBMamswTnpjZ05UY3VORFEzTnlBMk5DNDFJRFU0SURZMExqVklOalV1TXpJMU9Gb2lJR1pwYkd3OUluVnliQ2dqYldGcGJpa2lMejQ4Y0dGMGFDQmtQU0pOTmpVdU16STFPQ0F4TlRFdU5VTTJOaTR3T0RJMUlERTFNUzQxSURZMkxqVTJOU0F4TlRBdU5qa3lJRFkyTGpJd05qTWdNVFV3TGpBeU5rdzFNQzR6T0RBMUlERXlNQzQyTXpWRE5UQXVNREF5T1NBeE1Ua3VPVE0wSURRNExqazVOekVnTVRFNUxqa3pOQ0EwT0M0Mk1UazFJREV5TUM0Mk16Vk1Nekl1Tnprek55QXhOVEF1TURJMlF6TXlMalF6TlNBeE5UQXVOamt5SURNeUxqa3hOelVnTVRVeExqVWdNek11TmpjME1pQXhOVEV1TlVnME1VTTBNUzQxTlRJeklERTFNUzQxSURReUlERTFNUzQ1TkRnZ05ESWdNVFV5TGpWV01UY3pRelF5SURFM015NDFOVElnTkRJdU5EUTNOeUF4TnpRZ05ETWdNVGMwU0RVMlF6VTJMalUxTWpNZ01UYzBJRFUzSURFM015NDFOVElnTlRjZ01UY3pWakUxTWk0MVF6VTNJREUxTVM0NU5EZ2dOVGN1TkRRM055QXhOVEV1TlNBMU9DQXhOVEV1TlVnMk5TNHpNalU0V2lJZ1ptbHNiRDBpWW14aFkyc2lJR1pwYkd3dGIzQmhZMmwwZVQwaU1DNDFJaTgrUEhCaGRHZ2daRDBpVFRZMUxqTXlOVGdnTWpNNExqVkROall1TURneU5TQXlNemd1TlNBMk5pNDFOalVnTWpNM0xqWTVNaUEyTmk0eU1EWXpJREl6Tnk0d01qWk1OVEF1TXpnd05TQXlNRGN1TmpNMVF6VXdMakF3TWprZ01qQTJMamt6TkNBME9DNDVPVGN4SURJd05pNDVNelFnTkRndU5qRTVOU0F5TURjdU5qTTFURE15TGpjNU16Y2dNak0zTGpBeU5rTXpNaTQwTXpVZ01qTTNMalk1TWlBek1pNDVNVGMxSURJek9DNDFJRE16TGpZM05ESWdNak00TGpWSU5ERkROREV1TlRVeU15QXlNemd1TlNBME1pQXlNemd1T1RRNElEUXlJREl6T1M0MVZqSTJNRU0wTWlBeU5qQXVOVFV5SURReUxqUTBOemNnTWpZeElEUXpJREkyTVVnMU5rTTFOaTQxTlRJeklESTJNU0ExTnlBeU5qQXVOVFV5SURVM0lESTJNRll5TXprdU5VTTFOeUF5TXpndU9UUTRJRFUzTGpRME56Y2dNak00TGpVZ05UZ2dNak00TGpWSU5qVXVNekkxT0ZvaUlHWnBiR3c5SW1Kc1lXTnJJaUJtYVd4c0xXOXdZV05wZEhrOUlqQXVOU0l2UGp4d1lYUm9JR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnWTJ4cGNDMXlkV3hsUFNKbGRtVnViMlJrSWlCa1BTSk5Oamd5SURkSU1qSTFWakk1T1VNeU1qVWdNekV5TGpJMU5TQXlNelV1TnpRMUlETXlNeUF5TkRrZ016SXpTRFkxT0VNMk56RXVNalUxSURNeU15QTJPRElnTXpFeUxqSTFOU0EyT0RJZ01qazVWamRhVFRVeE5DQTBOQzQ1TmpBNVF6VXdOeTR6TnpNZ05EUXVPVFl3T1NBMU1ESWdOVEF1TXpNek5TQTFNRElnTlRZdU9UWXdPVll5T0RRdU16STFRelV3TWlBeU9UQXVPVFV5SURVd055NHpOek1nTWprMkxqTXlOU0ExTVRRZ01qazJMak15TlVnMk1UQkROakUyTGpZeU55QXlPVFl1TXpJMUlEWXlNaUF5T1RBdU9UVXlJRFl5TWlBeU9EUXVNekkxVmpVMkxqazJNRGxETmpJeUlEVXdMak16TXpVZ05qRTJMall5TnlBME5DNDVOakE1SURZeE1DQTBOQzQ1TmpBNVNEVXhORm9pSUdacGJHdzlJblZ5YkNnamJXRnBiaWtpTHo0OGNHRjBhQ0JtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUdOc2FYQXRjblZzWlQwaVpYWmxibTlrWkNJZ1pEMGlUVGd3TVM0NE1EVWdOVFF1TVRrNE5FTTRNREl1TkRFM0lEVXpMall5TmlBNE1ETXVNelEySURVMExqUXdOalVnT0RBeUxqZzJPQ0ExTlM0d09UQTRURGM0TVM0ME9Ea2dPRFV1TmpreE9FTTNPREV1TVRVeUlEZzJMakUzTXpRZ056Z3hMalV6TnlBNE5pNDRNakk1SURjNE1pNHhNamtnT0RZdU56Y3lURGM1TkM0Mk9UY2dPRFV1TmpsRE56azFMak15TWlBNE5TNDJNell4SURjNU5TNDNJRGcyTGpNMU5pQTNPVFV1TWpreUlEZzJMamd5TmpkTU56Y3pMamN5TXlBeE1URXVOelU0UXpjM015NHpNVFlnTVRFeUxqSXlPQ0EzTnpNdU5qa3pJREV4TWk0NU5EZ2dOemMwTGpNeE9TQXhNVEl1T0RrMFREYzROeTQ0TlRJZ01URXhMamN5T1VNM09EZ3VOVEUwSURFeE1TNDJOeklnTnpnNExqZzNPU0F4TVRJdU5EWTRJRGM0T0M0ek9UZ2dNVEV5TGpreE9VdzNNell1TVRrMUlERTJNUzQ0TURKRE56TTFMalU0TXlBeE5qSXVNemMwSURjek5DNDJOVFFnTVRZeExqVTVNeUEzTXpVdU1UTXlJREUyTUM0NU1EbE1OelUyTGpjNU1pQXhNamt1T1RBMVF6YzFOeTR4TWprZ01USTVMalF5TkNBM05UWXVOelEwSURFeU9DNDNOelFnTnpVMkxqRTFNaUF4TWpndU9ESTFURGMwTXk0ek1UWWdNVEk1TGprelF6YzBNaTQyT1RJZ01USTVMams0TkNBM05ESXVNekUwSURFeU9TNHlOamtnTnpReUxqY3hOeUF4TWpndU56azNURGMyTXk0Mk5USWdNVEEwTGpJNU0wTTNOalF1TURVMUlERXdNeTQ0TWpFZ056WXpMalkzTnlBeE1ETXVNVEExSURjMk15NHdOVE1nTVRBekxqRTFPVXczTlRBdU1UUTRJREV3TkM0eU4wTTNORGt1TkRnMklERXdOQzR6TWpjZ056UTVMakV5TVNBeE1ETXVOVE15SURjME9TNDJNRE1nTVRBekxqQTRNVXc0TURFdU9EQTFJRFUwTGpFNU9EUmFJaUJtYVd4c1BTSjNhR2wwWlNJdlBqeHBiV0ZuWlNCNFBTSXpNemtpSUhrOUlqUTNOaUlnZDJsa2RHZzlJakl3TUNJZ2FHVnBaMmgwUFNJeU1EQWlJR2h5WldZOUltUmhkR0U2YVcxaFoyVXZjM1puSzNodGJEdGlZWE5sTmpRc1VFaE9NbHA1UW0xaFYzaHpVRk5LZFdJeU5XeEphVUp2V2xkc2JtRklVVGxKYWtreFRVUkJhVWxJWkhCYVNGSnZVRk5KZVUxVVozcEphVUkwWWxkNGRXTjZNR2xoU0ZJd1kwUnZka3d6WkROa2VUVXpUWGsxZG1OdFkzWk5ha0YzVFVNNWVtUnRZMmxKU0Zwd1dsaGtRMkl6WnpsSmFrRm5UVU5CZUUxcVVXZE5WRkY0VEdwVmVrMVVhelZQVkdzMVQxUnJOVTlVYXpSSmFqUTRZMGRHTUdGRFFtdFFVMHBPVFZSQmRVMTZaM3BKUkVWNVRtazBORTlVVWsxTlEwRjNZa1JGZVU1RFFYVk5hbFV4VEZSRmQweHFhek5QVTBGNFRXcFpkVTVxVFRWTVZGVjNUR3BWTVUxNVFYaE9RelF5VFhwb05rbHBRbTFoVjNoelVGTkphbHBVVFRCYWFra3lTV2s0SzFCSVFtaGtSMmRuV2tRd2FWUlVXWGxNYWxFeVQwTkJlRTFxYTNWTmFtTXpWbXBGZVV4cVFUUk9WM2N4VFZNMGQwNXFVWFZOVkdOMFQxTTBlRTFFV1dkTlZFRXdUR3BuTVUxWWIybEpSMXB3WWtkM09VbHBUbXhhYWxreFRXMUZhVXg2TkRoalIwWXdZVU5DYTFCVFNrNVBWR3QxVGtSclowNUVSWFZOZWxsNVlrUkZkVTVFVVRKTVZFVXhUR3BSTlZORVNYbE1hazAwVFRKM01FeHFUVEJKUkZFelRHcFJOV0ZFVlRCTWFrbDRUVEIzTTA5RE5EUk5VMEUxVFhrME1rMVVaSE5NVkVVelRHcE5NazFwUVRCTWFsazBURlJGTTB4cVdYaE9lVEF4VEdwRmQwNXBNSFZQVkUweVRGUkZlVXhxUVRST1ZXZDVUbmswZWsxVWJITk5hVFI0VFdwblowMXFVWFZPYW1kNFNVUk5lVWxFWjNWUFZFMHlTVVJOZVV4cVNURk9VekEwVEdwcmVrNXBRVEJNYWswd1RGUlJORXhxUlROVFJGRjRUR3BGZDA0d2QzcFBVelF3VDFOQk1FMVROSHBPYWtvMlNXbENiV0ZYZUhOUVUwbHFXbTFhYlVscE9DdFFRemw2Wkcxakt5SXZQanhrWldaelBqeHNhVzVsWVhKSGNtRmthV1Z1ZENCcFpEMGliV0ZwYmlJK1BITjBiM0FnYzNSdmNDMWpiMnh2Y2owaUkyVXpOR1l5TmlJdlBqd3ZiR2x1WldGeVIzSmhaR2xsYm5RK1BHeHBibVZoY2tkeVlXUnBaVzUwSUdsa1BTSndZV2x1ZERCZmJHbHVaV0Z5WHpFelh6TXpJaUI0TVQwaU5DSWdlVEU5SWpreE5DSWdlREk5SWpnM05DSWdlVEk5SWpNdU9UazVPVGdpSUdkeVlXUnBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElqNDhjM1J2Y0NCemRHOXdMV052Ykc5eVBTSWpNVVF4UlRJMUlpOCtQSE4wYjNBZ2IyWm1jMlYwUFNJeElpQnpkRzl3TFdOdmJHOXlQU0lqWlRNMFpqSTJJaTgrUEM5c2FXNWxZWEpIY21Ga2FXVnVkRDQ4TDJSbFpuTStQSFJsZUhRZ1ptOXVkQzFtWVcxcGJIazlJa2x1ZEdWeUxDQnpZVzV6TFhObGNtbG1JaUJtYjI1MExYZGxhV2RvZEQwaVltOXNaQ0lnZUQwaU1UTTNJaUI1UFNJM09UQWlJR1p2Ym5RdGMybDZaVDBpTlRZaUlHWnBiR3c5SWlORk5VVTNSamdpUGtadmRXNWtjbmtnVkdWemRDQkJjSEFnTWp3dmRHVjRkRDQ4ZEdWNGRDQm1iMjUwTFdaaGJXbHNlVDBpU1c1MFpYSXNJSE5oYm5NdGMyVnlhV1lpSUdadmJuUXRkMlZwWjJoMFBTSnViM0p0WVd3aUlIZzlJakV6TnlJZ2VUMGlPRFEySWlCbWIyNTBMWE5wZW1VOUlqTXdJaUJtYVd4c1BTSWpOMFk0TVRreUlqNW1iR1ZsYTE5NGVYb3lQQzkwWlhoMFBqd3ZjM1puUGc9PSIsImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjogIkVOUyIsICJ2YWx1ZSI6ImZsZWVrX3h5ejIifSx7InRyYWl0X3R5cGUiOiAiQ29tbWl0IEhhc2giLCAidmFsdWUiOiJhZmZmM2Y2MiJ9LHsidHJhaXRfdHlwZSI6ICJSZXBvc2l0b3J5IiwgInZhbHVlIjoiaHR0cHM6Ly9naXRodWIuY29tL2ZsZWVreHl6L25vbi1mdW5naWJsZS1hcHBzMiJ9LHsidHJhaXRfdHlwZSI6ICJWZXJzaW9uIiwgInZhbHVlIjoiMSJ9LHsidHJhaXRfdHlwZSI6ICJDb2xvciIsICJ2YWx1ZSI6IiNlMzRmMjYifV19"
        );
    }

    function testFailChangingAllPossibleFieldsOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App 2",',
            '"description":"This is a test application submitted by foundry tests. 2",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek2.xyz",',
            '"image":"',
            _generateSVG("Foundry Test App 2", "fleek_xyz2"),
            '",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz2"},',
            '{"trait_type": "Commit Hash", "value":"afff3f62"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps2"},',
            '{"trait_type": "Version", "value":"1"}',
            "]",
            "}"
        );

        assertEq(tokenURI, string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testFailCallingTokenURIOnNonExistantToken() public {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App",',
            '"description":"This is a test application submitted by foundry tests.",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek.xyz",',
            '"image":"https://fleek.xyz",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz"},',
            '{"trait_type": "Commit Hash", "value":"afff3f6"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps"},',
            '{"trait_type": "Version", "value":"0"}',
            "]",
            "}"
        );

        assertEq(
            fleekContract.tokenURI(0),
            string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI))))
        );
    }

    function testBurn() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.burn(mint);
    }

    function testFailBurningNonExistantToken() public {
        fleekContract.burn(0);
    }

    function testFailBurnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.burn(mint);
    }

    function testFailTokenControllerAttemptsToBurnToken() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.burn(mint);
    }

    function testSetTokenName() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "NEW TOKEN NAME!");
    }

    function testFailSetTokenNameOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "NEW TOKEN NAME!");
    }

    function testSetTokenDescription() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenDescription(mint, "NEW TOKEN NAME!");
    }

    function testFailSetTokenDescriptionOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenDescription(mint, "NEW TOKEN NAME!");
    }

    function testSetTokenExternalURL() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenExternalURL(mint, "https://ethereum.org");
    }

    function testFailSetTokenExternalURLOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenExternalURL(mint, "https://ethereum.org");
    }

    function testSetTokenBuild() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenBuild(mint, "aaaaaaa", "https://github.com/fleekxyz/test_contracts");
    }

    function testFailSetTokenBuildOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenBuild(mint, "aaaaaaa", "https://github.com/fleekxyz/test_contracts");
    }

    function testSetTokenENS() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenENS(mint, "fleek_nfts");
    }

    function testFailSetTokenENSOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenENS(mint, "fleek_nfts");
    }

    function testAddTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailAddTokenControllerOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testAddTokenControllerTwice() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testRemoveTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveTokenControllerOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0x91A425C1CA320A99a09BE1bee114Fce5d30153d9
        );

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0x91A425C1CA320A99a09BE1bee114Fce5d30153d9
        );
    }

    function testRemoveTokenControllerTwice() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testRemoveUnknownTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveUnknownTokenControllerFromUnknownToken() public {
        fleekContract.revokeTokenRole(
            0,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveTokenOwnerByTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.revokeTokenRole(mint, FleekAccessControl.Roles.Controller, DEPLOYER);
    }

    function testBalanceOfDeployerAfterAndBeforeMinting() public {
        assertEq(fleekContract.balanceOf(DEPLOYER), 0);

        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
            0xe34f26
        );

        assertEq(mint, 0);

        assertEq(fleekContract.balanceOf(DEPLOYER), 1);
    }

    function testAddAccessPoint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);

        assertEq(
            fleekContract.getAccessPointJSON(FLEEK_AP_URL),
            string(
                abi.encodePacked(
                    '{"tokenId":0,"score":0,"nameVerified":false,"contentVerified":false,"owner":"',
                    uint160(DEPLOYER).toHexString(20),
                    '"}'
                )
            )
        );
    }

    function testCannotRemoveAccessPoint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        fleekContract.removeAccessPoint(FLEEK_AP_URL);
        vm.expectRevert("FleekERC721: invalid AP");
        fleekContract.getAccessPointJSON(FLEEK_AP_URL);
    }

    function testIsAccessPointNameVerified() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        assertFalse(fleekContract.isAccessPointNameVerified(FLEEK_AP_URL)); // is false now.

        fleekContract.setAccessPointNameVerify(FLEEK_AP_URL, true);
        assertTrue(fleekContract.isAccessPointNameVerified(FLEEK_AP_URL)); // is true now.
    }

    function testIncreaseAccessPointScore() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        fleekContract.increaseAccessPointScore(FLEEK_AP_URL);
        assertEq(
            fleekContract.getAccessPointJSON(FLEEK_AP_URL),
            '{"tokenId":0,"score":1,"nameVerified":false,"contentVerified":false,"owner":"0x7fa9385be102ac3eac297483dd6233d62b3e1496"}'
        );
    }

    function testCannotDecreaseAccessPointScoreToMinusOne() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        vm.expectRevert("FleekERC721: score cant be lower");
        fleekContract.decreaseAccessPointScore(FLEEK_AP_URL);
    }

    function testDecreaseAccessPointScore() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        fleekContract.increaseAccessPointScore(FLEEK_AP_URL);
        fleekContract.decreaseAccessPointScore(FLEEK_AP_URL);
        assertEq(
            fleekContract.getAccessPointJSON(FLEEK_AP_URL),
            '{"tokenId":0,"score":0,"nameVerified":false,"contentVerified":false,"owner":"0x7fa9385be102ac3eac297483dd6233d62b3e1496"}'
        );
    }

    function testAppAccessPoints() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);

        string[] memory accessPointList = fleekContract.appAccessPoints(mint);
        assertEq(accessPointList[0], FLEEK_AP_URL);

        fleekContract.addAccessPoint(0, "https://fleek_cloned_2.xyz");

        accessPointList = fleekContract.appAccessPoints(mint);
        assertEq(accessPointList[1], "https://fleek_cloned_2.xyz");
    }

    function testCannotSetAccessPointNameVerifyWithUnknownIdentity() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        vm.expectRevert("FleekAccessControl: must have token role");

        fleekContract.setAccessPointNameVerify(FLEEK_AP_URL, true);
    }

    function testCannotSetAccessPointContentVerifyWithUnknownIdentity() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        vm.expectRevert("FleekAccessControl: must have token role");

        fleekContract.setAccessPointContentVerify(FLEEK_AP_URL, true);
    }
}

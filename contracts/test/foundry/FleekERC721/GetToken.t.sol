// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {TestConstants} from "./Constants.sol";

contract Test_FleekERC721_GetToken is Test_FleekERC721_Base {
    uint256 internal tokenId;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
    }

    function test_getToken() public {
        (
            string memory name,
            string memory description,
            string memory externalURL,
            string memory ENS,
            uint256 currentBuild,
            string memory logo,
            uint24 color
        ) = CuT.getToken(tokenId);
        assertEq(name, TestConstants.APP_NAME);
        assertEq(description, TestConstants.APP_DESCRIPTION);
        assertEq(externalURL, TestConstants.APP_EXTERNAL_URL);
        assertEq(logo, TestConstants.LOGO_0);
        assertEq(color, TestConstants.APP_COLOR);
        assertEq(ENS, TestConstants.APP_ENS);
        assertEq(currentBuild, 0);
    }

    function test_getTokenAfterUpdate() public {
        CuT.setTokenName(tokenId, "New App Name");
        CuT.setTokenDescription(tokenId, "New description for the app.");
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
        CuT.setTokenENS(tokenId, "new-ens.eth");
        CuT.setTokenBuild(tokenId, "ce1a3fc141e29f8e1d00a654e156c4982d7711bf", "https://github.com/other/repo");
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);

        (
            string memory name,
            string memory description,
            string memory externalURL,
            string memory ENS,
            uint256 currentBuild,
            string memory logo,
            uint24 color
        ) = CuT.getToken(tokenId);
        assertEq(name, "New App Name");
        assertEq(description, "New description for the app.");
        assertEq(externalURL, "https://new-url.com");
        assertEq(logo, TestConstants.LOGO_1);
        assertEq(color, 0x654321);
        assertEq(ENS, "new-ens.eth");
        assertEq(currentBuild, 1);
    }

    function test_getTokenForDifferentAddresses() public {
        vm.prank(address(1));
        CuT.getToken(tokenId);
        vm.prank(address(2));
        CuT.getToken(tokenId);
        vm.prank(address(3));
        CuT.getToken(tokenId);
    }

    function testFail_tokenURIForNonExistentId() public view {
        expectRevertWithInvalidTokenId();
        CuT.getToken(1);
    }
}

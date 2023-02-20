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

    function testFuzz_getTokenAfterUpdate(
        string memory newAppName,
        string memory newDescription,
        string memory newExternalURL,
        string memory newENS,
        string memory newCommitHash,
        string memory newRepository,
        string memory newLogo,
        uint24 newColor
    ) public {
        CuT.setTokenName(tokenId, newAppName);
        CuT.setTokenDescription(tokenId, newDescription);
        CuT.setTokenExternalURL(tokenId, newExternalURL);
        CuT.setTokenENS(tokenId, newENS);
        CuT.setTokenBuild(tokenId, newCommitHash, newRepository);
        CuT.setTokenLogoAndColor(tokenId, newLogo, newColor);

        (
            string memory name,
            string memory description,
            string memory externalURL,
            string memory ENS,
            uint256 currentBuild,
            string memory logo,
            uint24 color
        ) = CuT.getToken(tokenId);
        assertEq(name, newAppName);
        assertEq(description, newDescription);
        assertEq(externalURL, newExternalURL);
        assertEq(logo, newLogo);
        assertEq(color, newColor);
        assertEq(ENS, newENS);
        assertEq(currentBuild, 1);
    }

    function testFuzz_getTokenForDifferentAddresses(address account) public {
        vm.prank(account);
        CuT.getToken(tokenId);
    }

    function testFuzz_tokenURIForNonExistentId(uint256 _tokenId) public {
        vm.assume(_tokenId != tokenId);
        expectRevertWithInvalidTokenId();
        CuT.getToken(_tokenId);
    }
}

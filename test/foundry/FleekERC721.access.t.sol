// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./FleekERC721.base.t.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";

contract Test_FleekERC721_Access_RandomAddress is Test_FleekERC721_Base {
    uint256 internal tokenId;
    address internal randomAddress = address(1);

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.addAccessPoint(tokenId, "owners-accesspoint.com");

        // Change account to random address
        vm.startPrank(randomAddress);
    }

    function test_tokenURI() public view {
        CuT.tokenURI(tokenId);
    }

    function test_addAccessPoint() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
    }

    function test_removeAccessPoint() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
        CuT.removeAccessPoint("accesspoint.com");
    }

    function test_getAccessPointJSON() public view {
        CuT.getAccessPointJSON("owners-accesspoint.com");
    }

    function test_isAccessPointNameVerified() public view {
        CuT.isAccessPointNameVerified("owners-accesspoint.com");
    }

    function test_appAccessPoints() public view {
        CuT.appAccessPoints(tokenId);
    }

    function testFail_mint() public {
        mintDefault(randomAddress);
    }

    function testFail_setTokenName() public {
        CuT.setTokenName(tokenId, "New Name");
    }

    function testFail_setTokenDescription() public {
        CuT.setTokenDescription(tokenId, "New description");
    }

    function testFail_setTokenExternalURL() public {
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
    }

    function testFail_setTokenENS() public {
        CuT.setTokenENS(tokenId, "newens.eth");
    }

    function testFail_setTokenLogo() public {
        CuT.setTokenLogo(tokenId, TestConstants.LOGO_1);
    }

    function testFail_setTokenColor() public {
        CuT.setTokenColor(tokenId, 0x654321);
    }

    function testFail_setTokenLogoAndColor() public {
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);
    }

    function testFail_removeAccessPoint() public {
        CuT.removeAccessPoint("owners-accesspoint.com");
    }

    function testFail_setAccessPointContentVerify() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
        CuT.setAccessPointContentVerify("accesspoint.com", true);
    }

    function testFail_setAccessPointNameVerify() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
        CuT.setAccessPointNameVerify("accesspoint.com", true);
    }

    function testFail_setTokenBuild() public {
        CuT.setTokenBuild(tokenId, "284d78954060f9eeb3f04568807f920a21f00016", "https://github.com/org/repo");
    }

    function testFail_burn() public {
        CuT.burn(tokenId);
    }
}

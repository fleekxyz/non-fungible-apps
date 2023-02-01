// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./FleekERC721.base.t.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";

/**
 * Test what token owners can do
 */
contract Test_FleekERC721_TokenAccessControl_OwnerAddress is Test_FleekERC721_Base {
    uint256 internal tokenId;
    address internal ownerAddress = address(1);

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(ownerAddress);
        CuT.addAccessPoint(tokenId, "deployer-accesspoint.com");

        // Change account to owner address
        vm.startPrank(ownerAddress);
    }

    function test_setUp() public {
        assertTrue(CuT.ownerOf(tokenId) == ownerAddress);
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, ownerAddress));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, ownerAddress));
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
        CuT.getAccessPointJSON("deployer-accesspoint.com");
    }

    function test_isAccessPointNameVerified() public view {
        CuT.isAccessPointNameVerified("deployer-accesspoint.com");
    }

    function test_appAccessPoints() public view {
        CuT.appAccessPoints(tokenId);
    }

    function test_setTokenName() public {
        CuT.setTokenName(tokenId, "New Name");
    }

    function test_setTokenDescription() public {
        CuT.setTokenDescription(tokenId, "New description");
    }

    function test_setTokenExternalURL() public {
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
    }

    function test_setTokenENS() public {
        CuT.setTokenENS(tokenId, "newens.eth");
    }

    function test_setTokenLogo() public {
        CuT.setTokenLogo(tokenId, TestConstants.LOGO_1);
    }

    function test_setTokenColor() public {
        CuT.setTokenColor(tokenId, 0x654321);
    }

    function test_setTokenLogoAndColor() public {
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);
    }

    function testFail_removeAccessPoint() public {
        CuT.removeAccessPoint("deployer-accesspoint.com");
    }

    function test_setAccessPointContentVerify() public {
        CuT.setAccessPointContentVerify("deployer-accesspoint.com", true);
    }

    function test_setAccessPointNameVerify() public {
        CuT.setAccessPointNameVerify("deployer-accesspoint.com", true);
    }

    function test_setTokenBuild() public {
        CuT.setTokenBuild(tokenId, "284d78954060f9eeb3f04568807f920a21f00016", "https://github.com/org/repo");
    }

    function test_burn() public {
        CuT.burn(tokenId);
    }
}

/**
 * Test what token controllers can do
 */
contract Test_FleekERC721_TokenAccessControl_ControllerAddress is Test_FleekERC721_Base {
    uint256 internal tokenId;
    address internal controllerAddress = address(1);

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.addAccessPoint(tokenId, "deployer-accesspoint.com");
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, controllerAddress);

        // Change account to controller address
        vm.startPrank(controllerAddress);
    }

    function test_setUp() public {
        assertFalse(CuT.ownerOf(tokenId) == controllerAddress);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, controllerAddress));
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, controllerAddress));
    }

    function test_tokenURI() public view {
        CuT.tokenURI(tokenId);
    }

    function test_addAccessPoint() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
    }

    function test_removeAccessPointCreatedByController() public {
        CuT.addAccessPoint(tokenId, "accesspoint.com");
        CuT.removeAccessPoint("accesspoint.com");
    }

    function test_getAccessPointJSON() public view {
        CuT.getAccessPointJSON("deployer-accesspoint.com");
    }

    function test_isAccessPointNameVerified() public view {
        CuT.isAccessPointNameVerified("deployer-accesspoint.com");
    }

    function test_appAccessPoints() public view {
        CuT.appAccessPoints(tokenId);
    }

    function test_setTokenName() public {
        CuT.setTokenName(tokenId, "New Name");
    }

    function test_setTokenDescription() public {
        CuT.setTokenDescription(tokenId, "New description");
    }

    function test_setTokenExternalURL() public {
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
    }

    function test_setTokenENS() public {
        CuT.setTokenENS(tokenId, "newens.eth");
    }

    function test_setTokenLogo() public {
        CuT.setTokenLogo(tokenId, TestConstants.LOGO_1);
    }

    function test_setTokenColor() public {
        CuT.setTokenColor(tokenId, 0x654321);
    }

    function test_setTokenLogoAndColor() public {
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);
    }

    function test_removeAccessPointCreatedByDeployer() public {
        expectRevertWithMustBeAPOwner();
        CuT.removeAccessPoint("deployer-accesspoint.com");
    }

    function test_setAccessPointContentVerify() public {
        CuT.setAccessPointContentVerify("deployer-accesspoint.com", true);
    }

    function test_setAccessPointNameVerify() public {
        CuT.setAccessPointNameVerify("deployer-accesspoint.com", true);
    }

    function test_setTokenBuild() public {
        CuT.setTokenBuild(tokenId, "284d78954060f9eeb3f04568807f920a21f00016", "https://github.com/org/repo");
    }

    function test_burn() public {
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }
}

/**
 * Test what anyone can do
 */
contract Test_FleekERC721_TokenAccessControl_RandomAddress is Test_FleekERC721_Base {
    uint256 internal tokenId;
    address internal randomAddress = address(1);

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.addAccessPoint(tokenId, "deployer-accesspoint.com");

        // Change account to random address
        vm.startPrank(randomAddress);
    }

    function test_setUp() public {
        assertFalse(CuT.ownerOf(tokenId) == randomAddress);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, randomAddress));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress));
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
        CuT.getAccessPointJSON("deployer-accesspoint.com");
    }

    function test_isAccessPointNameVerified() public view {
        CuT.isAccessPointNameVerified("deployer-accesspoint.com");
    }

    function test_appAccessPoints() public view {
        CuT.appAccessPoints(tokenId);
    }

    function test_setTokenName() public {
        expectRevertWithTokenRole();
        CuT.setTokenName(tokenId, "New Name");
    }

    function test_setTokenDescription() public {
        expectRevertWithTokenRole();
        CuT.setTokenDescription(tokenId, "New description");
    }

    function test_setTokenExternalURL() public {
        expectRevertWithTokenRole();
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
    }

    function test_setTokenENS() public {
        expectRevertWithTokenRole();
        CuT.setTokenENS(tokenId, "newens.eth");
    }

    function test_setTokenLogo() public {
        expectRevertWithTokenRole();
        CuT.setTokenLogo(tokenId, TestConstants.LOGO_1);
    }

    function test_setTokenColor() public {
        expectRevertWithTokenRole();
        CuT.setTokenColor(tokenId, 0x654321);
    }

    function test_setTokenLogoAndColor() public {
        expectRevertWithTokenRole();
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);
    }

    function testFail_removeAccessPoint() public {
        CuT.removeAccessPoint("deployer-accesspoint.com");
    }

    function test_setAccessPointContentVerify() public {
        expectRevertWithTokenRole();
        CuT.setAccessPointContentVerify("deployer-accesspoint.com", true);
    }

    function test_setAccessPointNameVerify() public {
        expectRevertWithTokenRole();
        CuT.setAccessPointNameVerify("deployer-accesspoint.com", true);
    }

    function test_setTokenBuild() public {
        expectRevertWithTokenRole();
        CuT.setTokenBuild(tokenId, "284d78954060f9eeb3f04568807f920a21f00016", "https://github.com/org/repo");
    }

    function test_burn() public {
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }
}

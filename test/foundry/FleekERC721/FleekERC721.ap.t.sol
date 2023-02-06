// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";

contract Test_FleekERC721_AccessPoint is Test_FleekERC721_Base {
    using Strings for address;
    uint256 internal tokenId;

    function assertAccessPointJSON(
        string memory accessPointName,
        string memory _tokenId,
        string memory score,
        string memory nameVerified,
        string memory contentVerified,
        address owner
    ) internal {
        string memory current = CuT.getAccessPointJSON(accessPointName);
        // prettier-ignore
        string memory expectedJSON = string(abi.encodePacked('{"tokenId":', _tokenId, ',"score":', score, ',"nameVerified":', nameVerified, ',"contentVerified":', contentVerified, ',"owner":"', owner.toHexString(), '"}'));
        assertEq(current, expectedJSON);
    }

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
    }

    function test_getAccessPointJSON() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        assertAccessPointJSON(accessPointName, "0", "0", "false", "false", deployer);
    }

    function test_removeAccessPoint() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        CuT.removeAccessPoint(accessPointName);

        expectRevertWithInvalidAP();
        CuT.getAccessPointJSON(accessPointName);
    }

    function test_cannotRemoveNonexistentAccessPoint() public {
        expectRevertWithInvalidAP();
        CuT.removeAccessPoint("accesspoint.com");
    }

    function test_cannotTwiceRemoveAccessPoint() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        CuT.removeAccessPoint(accessPointName);

        expectRevertWithInvalidAP();
        CuT.removeAccessPoint(accessPointName);
    }

    function test_isAccessPointNameVerified() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        assertFalse(CuT.isAccessPointNameVerified(accessPointName));
        CuT.setAccessPointNameVerify(accessPointName, true);
    }

    function test_increaseAccessPointScore() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        assertAccessPointJSON(accessPointName, "0", "0", "false", "false", deployer);

        CuT.increaseAccessPointScore(accessPointName);
        assertAccessPointJSON(accessPointName, "0", "1", "false", "false", deployer);

        CuT.increaseAccessPointScore(accessPointName);
        assertAccessPointJSON(accessPointName, "0", "2", "false", "false", deployer);
    }

    function test_cannotDecreaseAccessPointScoreToMinusOne() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        assertAccessPointJSON(accessPointName, "0", "0", "false", "false", deployer);
        expectRevertWithMinimalScore();
        CuT.decreaseAccessPointScore(accessPointName);
    }

    function test_decreaseAccessPointScore() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        assertAccessPointJSON(accessPointName, "0", "0", "false", "false", deployer);
        CuT.increaseAccessPointScore(accessPointName);
        assertAccessPointJSON(accessPointName, "0", "1", "false", "false", deployer);
        CuT.decreaseAccessPointScore(accessPointName);
        assertAccessPointJSON(accessPointName, "0", "0", "false", "false", deployer);
    }

    function test_appAccessPoints() public {
        CuT.addAccessPoint(tokenId, "accesspoint1.com");
        CuT.addAccessPoint(tokenId, "accesspoint2.com");
        CuT.addAccessPoint(tokenId, "accesspoint3.com");

        string[] memory accessPoints = CuT.appAccessPoints(tokenId);
        assertEq(accessPoints[0], "accesspoint1.com");
        assertEq(accessPoints[1], "accesspoint2.com");
        assertEq(accessPoints[2], "accesspoint3.com");
        assertEq(accessPoints.length, 3);
    }

    function test_cannotAddAccessPointToNonexistentToken() public {
        expectRevertWithInvalidTokenId();
        CuT.addAccessPoint(1, "accesspoint.com");
    }

    function test_setAccessPointVerifiesWithCorrectRole() public {
        string memory accessPointName = "accesspoint.com";
        address randomAddress = address(12);
        CuT.addAccessPoint(tokenId, accessPointName);

        vm.startPrank(randomAddress);
        expectRevertWithTokenRole();
        CuT.setAccessPointNameVerify(accessPointName, true);
        expectRevertWithTokenRole();
        CuT.setAccessPointContentVerify(accessPointName, true);
        vm.stopPrank();

        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);

        vm.startPrank(randomAddress);
        CuT.setAccessPointNameVerify(accessPointName, true);
        CuT.setAccessPointContentVerify(accessPointName, true);
        vm.stopPrank();

        assertAccessPointJSON(accessPointName, "0", "0", "true", "true", deployer);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "../TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";
import "../../../../contracts/FleekERC721.sol";
import "./ApBase.sol";

contract Test_FleekERC721_AccessPoint is Test_FleekERC721_Base, APConstants {
    using Strings for address;
    uint256 internal tokenId;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.setAccessPointAutoApproval(0, true);
    }

    function test_getAccessPointJSON() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
    }

    function test_removeAccessPoint() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        CuT.removeAccessPoint(accessPointName);

        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "3",
            CuT.getAccessPointJSON(accessPointName)
        );
    }

    function test_cannotRemoveNonExistentAccessPoint() public {
        expectRevertWithInvalidAP();
        CuT.removeAccessPoint("accesspoint.com");
    }

    function test_isAccessPointNameVerified() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        assertFalse(CuT.isAccessPointNameVerified(accessPointName));
        CuT.setAccessPointNameVerify(accessPointName, true);
        assertEq(CuT.isAccessPointNameVerified(accessPointName), true);
    }

    function test_increaseAccessPointScore() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);
        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );

        CuT.increaseAccessPointScore(accessPointName);
        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "1",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );

        CuT.increaseAccessPointScore(accessPointName);
        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "2",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
    }

    function test_cannotDecreaseAccessPointScoreToMinusOne() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
        expectRevertWithMinimalScore();
        CuT.decreaseAccessPointScore(accessPointName);
    }

    function test_decreaseAccessPointScore() public {
        string memory accessPointName = "accesspoint.com";
        CuT.addAccessPoint(tokenId, accessPointName);

        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
        CuT.increaseAccessPointScore(accessPointName);
        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "1",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
        CuT.decreaseAccessPointScore(accessPointName);
        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "false",
            "false",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
    }

    function test_cannotAddAccessPointToNonExistentToken() public {
        expectRevertWithInvalidTokenId();
        CuT.addAccessPoint(1, "accesspoint.com");
    }

    function test_setAccessPointVerifiesWithCorrectRole() public {
        string memory accessPointName = "accesspoint.com";
        address randomAddress = address(12);
        CuT.addAccessPoint(tokenId, accessPointName);

        vm.startPrank(randomAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setAccessPointNameVerify(accessPointName, true);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setAccessPointContentVerify(accessPointName, true);
        vm.stopPrank();

        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);

        vm.startPrank(randomAddress);
        CuT.setAccessPointNameVerify(accessPointName, true);
        CuT.setAccessPointContentVerify(accessPointName, true);
        vm.stopPrank();

        APConstants.assertAccessPointJSON(
            accessPointName,
            "0",
            "0",
            "true",
            "true",
            deployer,
            "1",
            CuT.getAccessPointJSON(accessPointName)
        );
    }
}

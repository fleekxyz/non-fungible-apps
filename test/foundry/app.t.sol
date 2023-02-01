pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "contracts/FleekERC721.sol";
import {TestConstants} from "./Constants.sol";

contract FleekTest is Test {
    FleekERC721 fleekContract;
    using Strings for uint160;
    using Strings for address;
    string constant FLEEK_AP_URL = "https://fleek_cloned.xyz";
    address DEPLOYER;

    function setUp() public {
        DEPLOYER = address(this);
        fleekContract = new FleekERC721();
        fleekContract.initialize("Test Contract", "FLKAPS");
    }

    function testName() public {
        assertEq(fleekContract.name(), "Test Contract");
    }

    function testSymbol() public {
        assertEq(fleekContract.symbol(), "FLKAPS");
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            TestConstants.LOGO_0,
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        fleekContract.increaseAccessPointScore(FLEEK_AP_URL);
        assertEq(
            fleekContract.getAccessPointJSON(FLEEK_AP_URL),
            string(
                abi.encodePacked(
                    '{"tokenId":0,"score":1,"nameVerified":false,"contentVerified":false,"owner":"',
                    DEPLOYER.toHexString(),
                    '"}'
                )
            )
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);
        fleekContract.increaseAccessPointScore(FLEEK_AP_URL);
        fleekContract.decreaseAccessPointScore(FLEEK_AP_URL);

        assertEq(
            fleekContract.getAccessPointJSON(FLEEK_AP_URL),
            string(
                abi.encodePacked(
                    '{"tokenId":0,"score":0,"nameVerified":false,"contentVerified":false,"owner":"',
                    DEPLOYER.toHexString(),
                    '"}'
                )
            )
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, FLEEK_AP_URL);

        // The line below changes the address that is being used for calls.
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        vm.expectRevert("FleekAccessControl: must have token role");

        fleekContract.setAccessPointContentVerify(FLEEK_AP_URL, true);
    }
}

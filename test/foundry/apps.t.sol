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
}

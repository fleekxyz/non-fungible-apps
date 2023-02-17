// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";
import "contracts/FleekBilling.sol";

contract Test_FleekERC721_BillingAssertions is Test {
    event BillingChanged(FleekBilling.Billing key, uint256 price);

    function expectRevertWithRequiredBillingValue(uint256 value) public {
        vm.expectRevert(abi.encodeWithSelector(RequiredBillingValue.selector, value));
    }

    function expectEmitBillingChanged(FleekBilling.Billing key, uint256 price) public {
        vm.expectEmit(true, true, true, true);
        emit BillingChanged(key, price);
    }
}

contract Test_FleekERC721_Billing is Test_FleekERC721_Base, Test_FleekERC721_BillingAssertions {
    using Strings for address;
    uint256 internal tokenId;
    uint256 internal constant mintPrice = 1 ether;
    uint256 internal constant addAPPrice = 1 ether;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.setBilling(FleekBilling.Billing.Mint, mintPrice);
        CuT.setBilling(FleekBilling.Billing.AddAccessPoint, addAPPrice);
    }

    function test_setUp() public {
        assertEq(CuT.getBilling(FleekBilling.Billing.Mint), mintPrice);
        assertEq(CuT.getBilling(FleekBilling.Billing.AddAccessPoint), addAPPrice);
    }

    function test_mint() public {
        CuT.mint{value: mintPrice}(
            deployer,
            TestConstants.APP_NAME,
            TestConstants.APP_DESCRIPTION,
            TestConstants.APP_EXTERNAL_URL,
            TestConstants.APP_ENS,
            TestConstants.APP_COMMIT_HASH,
            TestConstants.APP_GIT_REPOSITORY,
            TestConstants.LOGO_0,
            TestConstants.APP_COLOR
        );
        assertEq(CuT.ownerOf(tokenId), deployer);
    }

    function testFuzz_cannotMintWithWrongValue(uint256 value) public {
        vm.assume(value != mintPrice);
        vm.deal(deployer, value);
        expectRevertWithRequiredBillingValue(mintPrice);
        CuT.mint{value: value}(
            deployer,
            TestConstants.APP_NAME,
            TestConstants.APP_DESCRIPTION,
            TestConstants.APP_EXTERNAL_URL,
            TestConstants.APP_ENS,
            TestConstants.APP_COMMIT_HASH,
            TestConstants.APP_GIT_REPOSITORY,
            TestConstants.LOGO_0,
            TestConstants.APP_COLOR
        );
    }

    function testFuzz_shouldChnageMintBillingValue(uint256 value) public {
        expectEmitBillingChanged(FleekBilling.Billing.Mint, value);
        CuT.setBilling(FleekBilling.Billing.Mint, value);

        assertEq(CuT.getBilling(FleekBilling.Billing.Mint), value);

        vm.deal(deployer, value);
        CuT.mint{value: value}(
            deployer,
            TestConstants.APP_NAME,
            TestConstants.APP_DESCRIPTION,
            TestConstants.APP_EXTERNAL_URL,
            TestConstants.APP_ENS,
            TestConstants.APP_COMMIT_HASH,
            TestConstants.APP_GIT_REPOSITORY,
            TestConstants.LOGO_0,
            TestConstants.APP_COLOR
        );
        assertEq(CuT.ownerOf(tokenId), deployer);
    }

    function test_addAccessPoint() public {
        CuT.addAccessPoint{value: addAPPrice}(tokenId, "accesspoint.com");
        assertFalse(CuT.isAccessPointNameVerified("accesspoint.com"));
    }

    function testFuzz_cannotAddAccessPointWithWrongValue(uint256 value) public {
        vm.assume(value != addAPPrice);
        vm.deal(deployer, value);
        expectRevertWithRequiredBillingValue(addAPPrice);
        CuT.addAccessPoint{value: value}(tokenId, "accesspoint.com");
    }

    function testFuzz_shouldChangeAddAPBillingValue(uint256 value) public {
        expectEmitBillingChanged(FleekBilling.Billing.AddAccessPoint, value);
        CuT.setBilling(FleekBilling.Billing.AddAccessPoint, value);

        assertEq(CuT.getBilling(FleekBilling.Billing.AddAccessPoint), value);

        vm.deal(deployer, value);
        CuT.addAccessPoint{value: value}(tokenId, "accesspoint.com");
        assertFalse(CuT.isAccessPointNameVerified("accesspoint.com"));
    }
}

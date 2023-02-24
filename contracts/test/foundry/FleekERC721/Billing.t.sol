// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";
import "contracts/FleekBilling.sol";

contract Test_FleekERC721_BillingAssertions is Test {
    event BillingChanged(FleekBilling.Billing key, uint256 price);
    event Withdrawn(uint256 value, address indexed byAddress);

    function expectRevertWithRequiredPayment(uint256 value) public {
        vm.expectRevert(abi.encodeWithSelector(RequiredPayment.selector, value));
    }

    function expectEmitBillingChanged(FleekBilling.Billing key, uint256 price) public {
        vm.expectEmit(true, true, true, true);
        emit BillingChanged(key, price);
    }

    function expectEmitWithdawn(uint256 value, address byAddress) public {
        vm.expectEmit(true, true, true, true);
        emit Withdrawn(value, byAddress);
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
        assertEq(address(CuT).balance, 0);
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
            TestConstants.APP_COLOR,
            TestConstants.APP_ACCESS_POINT_AUTO_APPROVAL_SETTINGS
        );
        assertEq(CuT.ownerOf(tokenId), deployer);
        assertEq(address(CuT).balance, mintPrice);
    }

    function testFuzz_cannotMintWithWrongValue(uint256 value) public {
        vm.assume(value != mintPrice);
        vm.deal(deployer, value);
        expectRevertWithRequiredPayment(mintPrice);
        CuT.mint{value: value}(
            deployer,
            TestConstants.APP_NAME,
            TestConstants.APP_DESCRIPTION,
            TestConstants.APP_EXTERNAL_URL,
            TestConstants.APP_ENS,
            TestConstants.APP_COMMIT_HASH,
            TestConstants.APP_GIT_REPOSITORY,
            TestConstants.LOGO_0,
            TestConstants.APP_COLOR,
            TestConstants.APP_ACCESS_POINT_AUTO_APPROVAL_SETTINGS
        );
        assertEq(address(CuT).balance, 0);
    }

    function testFuzz_shouldChangeMintBillingValue(uint256 value) public {
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
            TestConstants.APP_COLOR,
            TestConstants.APP_ACCESS_POINT_AUTO_APPROVAL_SETTINGS
        );
        assertEq(CuT.ownerOf(tokenId), deployer);
        assertEq(address(CuT).balance, value);
    }

    function test_addAccessPoint() public {
        CuT.addAccessPoint{value: addAPPrice}(tokenId, "accesspoint.com");
        assertFalse(CuT.isAccessPointNameVerified("accesspoint.com"));
        assertEq(address(CuT).balance, addAPPrice);
    }

    function testFuzz_cannotAddAccessPointWithWrongValue(uint256 value) public {
        vm.assume(value != addAPPrice);
        vm.deal(deployer, value);
        expectRevertWithRequiredPayment(addAPPrice);
        CuT.addAccessPoint{value: value}(tokenId, "accesspoint.com");
        assertEq(address(CuT).balance, 0);
    }

    function testFuzz_shouldChangeAddAPBillingValue(uint256 value) public {
        expectEmitBillingChanged(FleekBilling.Billing.AddAccessPoint, value);
        CuT.setBilling(FleekBilling.Billing.AddAccessPoint, value);

        assertEq(CuT.getBilling(FleekBilling.Billing.AddAccessPoint), value);

        vm.deal(deployer, value);
        CuT.addAccessPoint{value: value}(tokenId, "accesspoint.com");
        assertFalse(CuT.isAccessPointNameVerified("accesspoint.com"));
        assertEq(address(CuT).balance, value);
    }

    function testFuzz_shouldWithdrawAnyContractFunds(uint128 value) public {
        uint256 balanceBefore = address(this).balance;
        vm.deal(address(CuT), value);
        CuT.withdraw();
        assertEq(address(this).balance, value + balanceBefore);
    }

    function testFuzz_shouldWithdrawAllContractFundsAfterPayableCall(uint8 iterations) public {
        // this test is going to add access points up to 256 times and then withdraw all funds
        uint256 balanceBefore = address(this).balance;
        address randomAddress = address(1);
        uint256 totalExpectedValue = iterations * addAPPrice;

        vm.deal(randomAddress, totalExpectedValue);
        vm.startPrank(randomAddress);
        for (uint256 i = 0; i < iterations; i++) {
            CuT.addAccessPoint{value: addAPPrice}(tokenId, Strings.toString(i));
        }
        vm.stopPrank();

        expectEmitWithdawn(totalExpectedValue, deployer);
        CuT.withdraw();
        assertEq(address(this).balance, totalExpectedValue + balanceBefore);
    }

    /**
     * @dev `receive` and `fallback` are required for test contract receive ETH
     */
    receive() external payable {}

    fallback() external payable {}
}

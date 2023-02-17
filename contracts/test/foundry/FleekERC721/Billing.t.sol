// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";
import "contracts/FleekBilling.sol";

contract Test_FleekERC721_BillingAssertions is Test {
    function expectRevertWithRequiredBillingValue(uint256 value) public {
        vm.expectRevert(abi.encodeWithSelector(RequiredBillingValue.selector, value));
    }
}

contract Test_FleekERC721_Billing is Test_FleekERC721_Base, Test_FleekERC721_BillingAssertions {
    using Strings for address;
    uint256 internal tokenId;
    uint256 internal mintPrice = 1 ether;
    uint256 internal transferPrice = 1 ether;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
        CuT.setBilling(FleekBilling.Billing.Mint, mintPrice);
        CuT.setBilling(FleekBilling.Billing.Transfer, transferPrice);
    }

    function test_mint() public {
        CuT.mint{value: 1 ether}(
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
}

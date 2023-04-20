// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {Utils} from "./Utils.sol";

contract Test_FleekERC721_ENS is Test_FleekERC721_Base {
    function expectRevertWithMustBeENSOwner() internal {
        vm.expectRevert(MustBeENSOwner.selector);
    }

    function setUp() public {
        baseSetUp();
    }

    function testFuzz_cannotMintIfNotENSOwner(address account) public {
        vm.assume(deployer != account);
        vm.assume(account != address(0));
        vm.prank(account);
        expectRevertWithMustBeENSOwner();
        mintDefault(account);
    }

    function testFuzz_cannotSetTokenENSIfNotENSOwner(address account) public {
        vm.assume(deployer != account);
        vm.assume(account != address(0));
        mintDefault(account);

        vm.prank(account);
        expectRevertWithMustBeENSOwner();
        CuT.setTokenENS(0, TestConstants.APP_ENS);
    }
}

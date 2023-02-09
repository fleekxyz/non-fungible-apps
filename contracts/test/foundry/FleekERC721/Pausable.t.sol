// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import "contracts/FleekPausable.sol";

contract Test_FleekERC721_PausableAssertions is Test {
    function expectRevertWithContractIsPaused() public {
        vm.expectRevert(ContractIsPaused.selector);
    }

    function expectRevertWithContractIsNotPaused() public {
        vm.expectRevert(ContractIsNotPaused.selector);
    }

    function expectRevertWithContractIsNotPausable() public {
        vm.expectRevert(ContractIsNotPausable.selector);
    }

    function expectRevertWithPausableIsSetTo(bool value) public {
        vm.expectRevert(abi.encodeWithSelector(PausableIsSetTo.selector, value));
    }
}

contract Test_FleekERC721_Pausable is Test_FleekERC721_Base, Test_FleekERC721_PausableAssertions {
    function setUp() public {
        pausedSetUp();
    }

    function test_shouldBeInitializedPausedAndPausable() public {
        assertTrue(CuT.paused());
        assertTrue(CuT.pausable());
    }

    function test_shouldUnpause() public {
        CuT.unpause();
        assertFalse(CuT.paused());
    }

    function test_shouldPause() public {
        CuT.unpause();
        assertFalse(CuT.paused());
        CuT.pause();
        assertTrue(CuT.paused());
    }

    function test_cannotPauseWhenAlreadyPaused() public {
        expectRevertWithContractIsPaused();
        CuT.pause();
    }
}

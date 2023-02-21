// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import "contracts/FleekPausable.sol";
import "contracts/FleekAccessControl.sol";

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
        baseSetUp();
    }

    function test_shouldBeInitializedPausedAndPausable() public {
        assertFalse(CuT.isPaused());
        assertTrue(CuT.isPausable());
    }

    function test_shouldUnpause() public {
        CuT.pause();
        assertTrue(CuT.isPaused());

        CuT.unpause();
        assertFalse(CuT.isPaused());
    }

    function test_shouldPause() public {
        CuT.pause();
        assertTrue(CuT.isPaused());
    }

    function test_cannotPauseWhenAlreadyPaused() public {
        CuT.pause();
        expectRevertWithContractIsPaused();
        CuT.pause();
    }

    function test_cannotUnpauseWhenAlreadyUnpaused() public {
        expectRevertWithContractIsNotPaused();
        CuT.unpause();
    }

    function test_shouldUnpauseWhenPausableIsFalse() public {
        CuT.pause();
        CuT.setPausable(false);

        CuT.unpause();
        assertFalse(CuT.isPaused());
    }

    function test_cannotPauseWhenPausableIsFalse() public {
        CuT.setPausable(false);

        expectRevertWithContractIsNotPausable();
        CuT.pause();
    }

    function test_cannotSetPausableWhenIsAlreadyTrue() public {
        expectRevertWithPausableIsSetTo(true);
        CuT.setPausable(true);
    }

    function test_cannotSetPausableWhenIsAlreadyFalse() public {
        CuT.setPausable(false);

        expectRevertWithPausableIsSetTo(false);
        CuT.setPausable(false);
    }

    function test_shouldRevertForFunctionsWhenContractIsPaused() public {
        address randomAddress = address(1);
        uint256 tokenId = mintDefault(deployer);
        CuT.pause();

        expectRevertWithContractIsPaused();
        mintDefault(deployer);

        expectRevertWithContractIsPaused();
        CuT.burn(tokenId);

        expectRevertWithContractIsPaused();
        CuT.transferFrom(deployer, randomAddress, tokenId);

        expectRevertWithContractIsPaused();
        CuT.addAccessPoint(tokenId, "accesspoint.com");

        expectRevertWithContractIsPaused();
        CuT.removeAccessPoint("accesspoint.com");

        expectRevertWithContractIsPaused();
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);

        expectRevertWithContractIsPaused();
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);

        expectRevertWithContractIsPaused();
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);

        expectRevertWithContractIsPaused();
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
    }
}

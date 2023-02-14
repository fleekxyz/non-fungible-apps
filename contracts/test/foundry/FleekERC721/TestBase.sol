// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "contracts/FleekERC721.sol";
import {TestConstants} from "./Constants.sol";

abstract contract Test_FleekERC721_Assertions is Test {
    function expectRevertWithTokenRole() public {
        vm.expectRevert("FleekAccessControl: must have token role");
    }

    function expectRevertWithCollectionRole() public {
        vm.expectRevert("FleekAccessControl: must have collection role");
    }

    function expectRevertWithAPAlreadyExists() public {
        vm.expectRevert(AccessPointAlreadyExists.selector);
    }

    function expectRevertWithMustBeAPOwner() public {
        vm.expectRevert(MustBeAccessPointOwner.selector);
    }

    function expectRevertWithInvalidAP() public {
        vm.expectRevert(AccessPointNotExistent.selector);
    }

    function expectRevertWithMinimalScore() public {
        vm.expectRevert(AccessPointScoreCannotBeLower.selector);
    }

    function expectRevertWithInvalidTokenId() public {
        vm.expectRevert("ERC721: invalid token ID");
    }
}

abstract contract Test_FleekERC721_Base is Test, Test_FleekERC721_Assertions {
    FleekERC721 internal CuT; // Contract Under Test
    address internal deployer;

    function baseSetUp() internal {
        CuT = new FleekERC721();
        CuT.initialize("Test Contract", "FLKAPS");
        deployer = address(this);
    }

    function mintDefault(address to) internal returns (uint256) {
        uint256 mint = CuT.mint(
            to,
            TestConstants.APP_NAME,
            TestConstants.APP_DESCRIPTION,
            TestConstants.APP_EXTERNAL_URL,
            TestConstants.APP_ENS,
            TestConstants.APP_COMMIT_HASH,
            TestConstants.APP_GIT_REPOSITORY,
            TestConstants.LOGO_0,
            TestConstants.APP_COLOR
        );

        return mint;
    }
}

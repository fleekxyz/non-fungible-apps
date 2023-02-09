// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {FleekERC721} from "contracts/FleekERC721.sol";
import {TestConstants} from "./Constants.sol";

abstract contract Test_FleekERC721_Assertions is Test {
    function expectRevertWithTokenRole() public {
        vm.expectRevert("FleekAccessControl: must have token role");
    }

    function expectRevertWithCollectionRole() public {
        vm.expectRevert("FleekAccessControl: must have collection role");
    }

    function expectRevertWithAPAlreadyExists() public {
        vm.expectRevert("FleekERC721: AP already exists");
    }

    function expectRevertWithMustBeAPOwner() public {
        vm.expectRevert("FleekERC721: must be AP owner");
    }

    function expectRevertWithInvalidAP() public {
        vm.expectRevert("FleekERC721: invalid AP");
    }

    function expectRevertWithMinimalScore() public {
        vm.expectRevert("FleekERC721: score cant be lower");
    }

    function expectRevertWithInvalidTokenId() public {
        vm.expectRevert("ERC721: invalid token ID");
    }
}

abstract contract Test_FleekERC721_Base is Test, Test_FleekERC721_Assertions {
    FleekERC721 internal CuT; // Contract Under Test
    address internal deployer;

    function pausedSetUp() internal {
        CuT = new FleekERC721();
        CuT.initialize("Test Contract", "FLKAPS");
        deployer = address(this);
    }

    function baseSetUp() internal {
        pausedSetUp();
        CuT.unpause();
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

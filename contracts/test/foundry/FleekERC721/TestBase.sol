// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "contracts/FleekERC721.sol";
import {TestConstants} from "./Constants.sol";

abstract contract Test_FleekERC721_Assertions is Test {
    function expectRevertWithTokenRole(uint256 tokenId, FleekAccessControl.TokenRoles role) public {
        vm.expectRevert(abi.encodeWithSelector(MustHaveTokenRole.selector, tokenId, uint8(role)));
    }

    function expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles role) public {
        vm.expectRevert(abi.encodeWithSelector(MustHaveCollectionRole.selector, uint8(role)));
    }

    function expectRevertWithMustBeTokenOwner(uint256 tokenId) public {
        vm.expectRevert(abi.encodeWithSelector(MustBeTokenOwner.selector, tokenId));
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

    function expectRevertWithMustBeTokenVerifier(uint256 tokenId) public {
        vm.expectRevert(abi.encodeWithSelector(MustBeTokenVerifier.selector, tokenId));
    }
}

abstract contract Test_FleekERC721_Base is Test, Test_FleekERC721_Assertions {
    FleekERC721 internal CuT; // Contract Under Test
    address internal deployer;

    function baseSetUp() internal {
        CuT = new FleekERC721();
        CuT.initialize("Test Contract", "FLKAPS", new uint256[](0));
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
            TestConstants.APP_COLOR,
            false, // Auto Approval Is OFF
            deployer
        );

        return mint;
    }
}

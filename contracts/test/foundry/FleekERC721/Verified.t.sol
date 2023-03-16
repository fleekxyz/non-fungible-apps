// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {TestConstants} from "./Constants.sol";
import {FleekAccessControl} from "../../../contracts/FleekAccessControl.sol";

contract Test_FleekERC721_Verified is Test_FleekERC721_Base {
    uint256 internal tokenId;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
    }

    function test_shouldNotBeVerifiedAfterMint() public {
        assertFalse(CuT.isTokenVerified(tokenId));
    }

    function test_shouldVerifyToken() public {
        CuT.setTokenVerified(tokenId, true);
        assertTrue(CuT.isTokenVerified(tokenId));
    }

    function test_verifyAndUnverify() public {
        CuT.setTokenVerified(tokenId, true);
        assertTrue(CuT.isTokenVerified(tokenId));
        CuT.setTokenVerified(tokenId, false);
        assertFalse(CuT.isTokenVerified(tokenId));
    }

    function testFuzz_shouldNotAllowVerifyIfHasNotVerifierRole(address verifier) public {
        vm.assume(!CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, verifier));

        vm.prank(verifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setTokenVerified(tokenId, true);
    }

    function testFuzz_shouldNotAllowVerifyIfIsNotTokenVerifier(address verifier) public {
        vm.assume(CuT.getTokenVerifier(tokenId) != verifier);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Verifier, verifier);

        vm.prank(verifier);
        expectRevertWithMustBeTokenVerifier(tokenId);
        CuT.setTokenVerified(tokenId, true);
    }
}

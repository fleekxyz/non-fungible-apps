// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {FleekBilling} from "contracts/FleekBilling.sol";
import "contracts/FleekAccessControl.sol";

contract Test_FleekERC721_AccessControlAssertions is Test {
    function expectRevertWithMustHaveAtLeastOneOwner() internal {
        vm.expectRevert(abi.encodeWithSelector(MustHaveAtLeastOneOwner.selector));
    }

    function expectRevertWithRoleAlreadySet() internal {
        vm.expectRevert(abi.encodeWithSelector(RoleAlreadySet.selector));
    }
}

contract Test_FleekERC721_AccessControl is Test_FleekERC721_Base, Test_FleekERC721_AccessControlAssertions {
    uint256 internal tokenId;
    address internal collectionOwner = address(100);
    address internal collectionVerifier = address(101);
    address internal tokenOwner = address(200);
    address internal tokenController = address(300);
    address internal anyAddress = address(400);

    function setUp() public {
        baseSetUp();

        // Set collectionOwner
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, collectionOwner);
        // Set collectionVerifier
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Verifier, collectionVerifier);
        // Mint to tokenOwner to set tokenOwner
        mintDefault(tokenOwner);
        // Set tokenController to minted token
        vm.startPrank(tokenOwner);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, tokenController);
        CuT.setTokenVerifier(tokenId, collectionVerifier);
        vm.stopPrank();
    }

    function test_setUp() public {
        // Check deployer
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, deployer));
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, deployer));

        // Check collectionOwner
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, collectionOwner));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, collectionOwner));
        assertFalse(CuT.ownerOf(tokenId) == collectionOwner);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, collectionOwner));
        // Check collectionVerifier
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, collectionVerifier));
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, collectionVerifier));
        assertFalse(CuT.ownerOf(tokenId) == collectionVerifier);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, collectionVerifier));
        // Check tokenOwner
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, tokenOwner));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, tokenOwner));
        assertTrue(CuT.ownerOf(tokenId) == tokenOwner);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, tokenOwner));
        // Check tokenController
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, tokenController));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, tokenController));
        assertFalse(CuT.ownerOf(tokenId) == tokenController);
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, tokenController));
        // Check anyAddress
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, anyAddress));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Verifier, anyAddress));
        assertFalse(CuT.ownerOf(tokenId) == anyAddress);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, anyAddress));
    }

    function test_grantAndRevokeCollectionRole() public {
        address randomAddress = address(99);

        // CollectionOwner
        vm.startPrank(collectionOwner);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress));
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress));
        vm.stopPrank();

        // CollectionVerifier
        vm.startPrank(collectionVerifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, randomAddress);
        vm.stopPrank();
    }

    function test_grantAndRevokeTokenRole() public {
        address randomAddress = address(99);

        // CollectionOwner
        vm.startPrank(collectionOwner);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        vm.stopPrank();

        // CollectionVerifier
        vm.startPrank(collectionVerifier);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress));
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress));
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, randomAddress);
        vm.stopPrank();
    }

    function test_mint() public {
        // Anyone can mint
        transferENS(TestConstants.APP_ENS, anyAddress);
        vm.startPrank(anyAddress);
        mintDefault(address(99));
        vm.stopPrank();
    }

    function test_tokenURI() public {
        // Anyone can get the tokenURI
        vm.prank(anyAddress);
        CuT.tokenURI(tokenId);
    }

    function test_setTokenExternalURL() public {
        string memory externalURL = "https://externalurl.com";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // VerifierRole
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenExternalURL(tokenId, externalURL);
    }

    function test_setTokenENS() public {
        string memory ens = "ens.eth";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenENS(tokenId, ens);

        // VerifierRole
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenENS(tokenId, ens);

        // TokenOwner
        transferENS(ens, tokenOwner);
        vm.prank(tokenOwner);
        CuT.setTokenENS(tokenId, ens);

        // TokenController
        transferENS(ens, tokenController);
        vm.prank(tokenController);
        CuT.setTokenENS(tokenId, ens);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenENS(tokenId, ens);
    }

    function test_setTokenName() public {
        string memory name = "name";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenName(tokenId, name);

        // VerifierRole
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenName(tokenId, name);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenName(tokenId, name);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenName(tokenId, name);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenName(tokenId, name);
    }

    function test_setTokenDescription() public {
        string memory description = "description";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenDescription(tokenId, description);

        // VerifierRole
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenDescription(tokenId, description);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenDescription(tokenId, description);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenDescription(tokenId, description);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenDescription(tokenId, description);
    }

    function test_setTokenLogo() public {
        string memory logo = "logo";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogo(tokenId, logo);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogo(tokenId, logo);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenLogo(tokenId, logo);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenLogo(tokenId, logo);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogo(tokenId, logo);
    }

    function test_setTokenColor() public {
        uint24 color = 0x000000;

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenColor(tokenId, color);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenColor(tokenId, color);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenColor(tokenId, color);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenColor(tokenId, color);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenColor(tokenId, color);
    }

    function test_setTokenLogoAndColor() public {
        string memory logo = "logo";
        uint24 color = 0x000000;

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenLogoAndColor(tokenId, logo, color);
    }

    function test_setTokenBuild() public {
        string memory commitHash = "commitHash";
        string memory gitRepository = "gitRepository";
        string memory ipfsHash = "ipfsHash";
        string memory domain = "domain";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository, ipfsHash, domain);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository, ipfsHash, domain);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository, ipfsHash, domain);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository, ipfsHash, domain);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository, ipfsHash, domain);
    }

    function test_burn() public {
        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.burn(tokenId);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.burn(tokenId);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.burn(tokenId);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.burn(tokenId);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.burn(tokenId);
    }

    function test_setAccessPointContentVerify() public {
        string memory apName = "random.com";
        CuT.addAccessPoint(tokenId, apName);

        // CollectionOwner
        vm.prank(collectionOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointContentVerify(apName, true);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        CuT.setAccessPointContentVerify(apName, true);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointContentVerify(apName, false);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointContentVerify(apName, false);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointContentVerify(apName, false);
    }

    function test_setAccessPointNameVerify() public {
        string memory apName = "random.com";
        CuT.addAccessPoint(tokenId, apName);

        // CollectionOwner
        vm.prank(collectionOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointNameVerify(apName, true);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        CuT.setAccessPointNameVerify(apName, true);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointNameVerify(apName, false);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointNameVerify(apName, false);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setAccessPointNameVerify(apName, false);
    }

    function test_setBilling() public {
        // ColletionOwner
        vm.prank(collectionOwner);
        CuT.setBilling(FleekBilling.Billing.Mint, 1 ether);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);
    }

    function test_withdraw() public {
        // ColletionOwner
        vm.deal(address(CuT), 1 ether);
        vm.prank(collectionOwner);
        CuT.withdraw();

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.withdraw();

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.withdraw();

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.withdraw();

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.withdraw();
    }

    function test_pauseAndUnpause() public {
        // ColletionOwner
        vm.startPrank(collectionOwner);
        CuT.pause();
        CuT.unpause();
        vm.stopPrank();

        // CollectionVerifier
        vm.startPrank(collectionVerifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.pause();
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.unpause();
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.pause();
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.unpause();
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.pause();
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.unpause();
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.pause();
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.unpause();
        vm.stopPrank();
    }

    function test_setPausable() public {
        // ColletionOwner
        vm.prank(collectionOwner);
        CuT.setPausable(false);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setPausable(true);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setPausable(true);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setPausable(true);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Owner);
        CuT.setPausable(true);
    }

    function test_setTokenVerifier() public {
        address otherVerifier = address(0x1234);
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Verifier, otherVerifier);

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.setTokenVerifier(tokenId, otherVerifier);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.setTokenVerifier(tokenId, otherVerifier);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenVerifier(tokenId, otherVerifier);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.setTokenVerifier(tokenId, collectionVerifier);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithMustBeTokenOwner(tokenId);
        CuT.setTokenVerifier(tokenId, collectionVerifier);
    }

    function test_setTokenVerified() public {
        // CollectionOwner
        vm.prank(collectionOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setTokenVerified(tokenId, true);

        // CollectionVerifier
        vm.prank(collectionVerifier);
        CuT.setTokenVerified(tokenId, true);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setTokenVerified(tokenId, false);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setTokenVerified(tokenId, false);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole(FleekAccessControl.CollectionRoles.Verifier);
        CuT.setTokenVerified(tokenId, false);
    }

    function test_cannotHaveLessThanOneCollectionOwner() public {
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, collectionOwner);
        expectRevertWithMustHaveAtLeastOneOwner();
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, deployer);
    }

    function test_cannotGrantRoleAlreadyGaranted() public {
        expectRevertWithRoleAlreadySet();
        CuT.grantCollectionRole(FleekAccessControl.CollectionRoles.Owner, collectionOwner);

        expectRevertWithRoleAlreadySet();
        vm.prank(tokenOwner);
        CuT.grantTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, tokenController);
    }

    function test_cannotRevokeRoleAlreadyRevoked() public {
        expectRevertWithRoleAlreadySet();
        CuT.revokeCollectionRole(FleekAccessControl.CollectionRoles.Owner, anyAddress);

        expectRevertWithRoleAlreadySet();
        vm.prank(tokenOwner);
        CuT.revokeTokenRole(tokenId, FleekAccessControl.TokenRoles.Controller, anyAddress);
    }

    /**
     * @dev `receive` and `fallback` are required for test contract receive ETH
     */
    receive() external payable {}

    fallback() external payable {}
}

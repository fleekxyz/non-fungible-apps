// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";
import {FleekBilling} from "contracts/FleekBilling.sol";

contract Test_FleekERC721_AccessControl is Test_FleekERC721_Base {
    uint256 internal tokenId;
    address internal collectionOwner = address(100);
    address internal collectionController = address(200);
    address internal tokenOwner = address(300);
    address internal tokenController = address(400);
    address internal anyAddress = address(500);

    function setUp() public {
        baseSetUp();

        // Set collectionOwner
        CuT.grantCollectionRole(FleekAccessControl.Roles.Owner, collectionOwner);
        // Set collectionController
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, collectionController);
        // Mint to tokenOwner to set tokenOwner
        mintDefault(tokenOwner);
        // Set tokenController to minted token
        vm.prank(tokenOwner);
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, tokenController);
    }

    function test_setUp() public {
        // Check collectionOwner
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, collectionOwner));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, collectionOwner));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, collectionOwner));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, collectionOwner));
        // Check collectionController
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, collectionController));
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, collectionController));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, collectionController));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, collectionController));
        // Check tokenOwner
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, tokenOwner));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, tokenOwner));
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, tokenOwner));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, tokenOwner));
        // Check tokenController
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, tokenController));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, tokenController));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, tokenController));
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, tokenController));
        // Check anyAddress
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, anyAddress));
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, anyAddress));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Owner, anyAddress));
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, anyAddress));
    }

    function test_grantAndRevokeCollectionRole() public {
        address randomAddress = address(99);

        // CollectionOwner
        vm.startPrank(collectionOwner);
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, randomAddress));
        CuT.revokeCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        assertFalse(CuT.hasCollectionRole(FleekAccessControl.Roles.Controller, randomAddress));
        vm.stopPrank();

        // CollectionController
        vm.startPrank(collectionController);
        expectRevertWithCollectionRole();
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithCollectionRole();
        CuT.revokeCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        expectRevertWithCollectionRole();
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithCollectionRole();
        CuT.revokeCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithCollectionRole();
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithCollectionRole();
        CuT.revokeCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithCollectionRole();
        CuT.grantCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithCollectionRole();
        CuT.revokeCollectionRole(FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();
    }

    function test_grantAndRevokeTokenRole() public {
        address randomAddress = address(99);

        // CollectionOwner
        vm.startPrank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithTokenRole();
        CuT.revokeTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // CollectionController
        vm.startPrank(collectionController);
        expectRevertWithTokenRole();
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithTokenRole();
        CuT.revokeTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        assertTrue(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress));
        CuT.revokeTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        assertFalse(CuT.hasTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress));
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithTokenRole();
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithTokenRole();
        CuT.revokeTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithTokenRole();
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        expectRevertWithTokenRole();
        CuT.revokeTokenRole(tokenId, FleekAccessControl.Roles.Controller, randomAddress);
        vm.stopPrank();
    }

    function test_mint() public {
        address randomAddress = address(99);

        // CollectionOwner
        vm.startPrank(collectionOwner);
        mintDefault(randomAddress);
        vm.stopPrank();

        // CollectionController
        vm.startPrank(collectionController);
        expectRevertWithCollectionRole();
        mintDefault(randomAddress);
        vm.stopPrank();

        // TokenOwner
        vm.startPrank(tokenOwner);
        expectRevertWithCollectionRole();
        mintDefault(randomAddress);
        vm.stopPrank();

        // TokenController
        vm.startPrank(tokenController);
        expectRevertWithCollectionRole();
        mintDefault(randomAddress);
        vm.stopPrank();

        // AnyAddress
        vm.startPrank(anyAddress);
        expectRevertWithCollectionRole();
        mintDefault(randomAddress);
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
        expectRevertWithTokenRole();
        CuT.setTokenExternalURL(tokenId, externalURL);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenExternalURL(tokenId, externalURL);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenExternalURL(tokenId, externalURL);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenExternalURL(tokenId, externalURL);
    }

    function test_setTokenENS() public {
        string memory ens = "ens";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenENS(tokenId, ens);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenENS(tokenId, ens);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenENS(tokenId, ens);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenENS(tokenId, ens);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenENS(tokenId, ens);
    }

    function test_setTokenName() public {
        string memory name = "name";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenName(tokenId, name);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenName(tokenId, name);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenName(tokenId, name);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenName(tokenId, name);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenName(tokenId, name);
    }

    function test_setTokenDescription() public {
        string memory description = "description";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenDescription(tokenId, description);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenDescription(tokenId, description);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenDescription(tokenId, description);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenDescription(tokenId, description);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenDescription(tokenId, description);
    }

    function test_setTokenLogo() public {
        string memory logo = "logo";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenLogo(tokenId, logo);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenLogo(tokenId, logo);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenLogo(tokenId, logo);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenLogo(tokenId, logo);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenLogo(tokenId, logo);
    }

    function test_setTokenColor() public {
        uint24 color = 0x000000;

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenColor(tokenId, color);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenColor(tokenId, color);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenColor(tokenId, color);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenColor(tokenId, color);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenColor(tokenId, color);
    }

    function test_setTokenLogoAndColor() public {
        string memory logo = "logo";
        uint24 color = 0x000000;

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenLogoAndColor(tokenId, logo, color);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenLogoAndColor(tokenId, logo, color);
    }

    function test_setTokenBuild() public {
        string memory commitHash = "commitHash";
        string memory gitRepository = "gitRepository";

        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.setTokenBuild(tokenId, commitHash, gitRepository);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.setTokenBuild(tokenId, commitHash, gitRepository);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository);

        // TokenController
        vm.prank(tokenController);
        CuT.setTokenBuild(tokenId, commitHash, gitRepository);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.setTokenBuild(tokenId, commitHash, gitRepository);
    }

    function test_testBurn() public {
        // ColletionOwner
        vm.prank(collectionOwner);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);

        // TokenOwner
        vm.prank(tokenOwner);
        CuT.burn(tokenId);
    }

    function test_setBilling() public {
        // ColletionOwner
        vm.prank(collectionOwner);
        CuT.setBilling(FleekBilling.Billing.Mint, 1 ether);

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithCollectionRole();
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole();
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole();
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole();
        CuT.setBilling(FleekBilling.Billing.Mint, 2 ether);
    }

    function test_withdraw() public {
        // ColletionOwner
        vm.deal(address(CuT), 1 ether);
        vm.prank(collectionOwner);
        CuT.withdraw();

        // CollectionController
        vm.prank(collectionController);
        expectRevertWithCollectionRole();
        CuT.withdraw();

        // TokenOwner
        vm.prank(tokenOwner);
        expectRevertWithCollectionRole();
        CuT.withdraw();

        // TokenController
        vm.prank(tokenController);
        expectRevertWithCollectionRole();
        CuT.withdraw();

        // AnyAddress
        vm.prank(anyAddress);
        expectRevertWithCollectionRole();
        CuT.withdraw();
    }

    /**
     * @dev `receive` and `fallback` are required for test contract receive ETH
     */
    receive() external payable {}

    fallback() external payable {}
}

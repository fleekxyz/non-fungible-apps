// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./FleekERC721.base.t.sol";

contract Test_FleekERC721_Mint is Test_FleekERC721_Base {
    function setUp() public {
        baseSetUp();
    }

    function test_mint() public {
        uint256 mint = mintDefault(deployer);

        assertEq(mint, 0);
        assertEq(CuT.ownerOf(mint), deployer);
    }

    function test_mintingMintedToken() public {
        uint256 firstMint = mintDefault(deployer);
        uint256 secondMint = mintDefault(deployer);

        assertEq(firstMint, 0);
        assertEq(secondMint, 1);
    }

    function test_mintTwoTokensForTwoAddresses() public {
        uint256 firstMint = mintDefault(deployer);
        uint256 secondMint = CuT.mint(
            address(12),
            "Different App Name",
            "This is a different description for another app.",
            "https://fleek.xyz",
            "fleek.eth",
            "94e8ba38568aea4fb277a37a4c472d94a6ce880a",
            "https://github.com/a-different/repository",
            TestConstants.LOGO_1,
            0x654321
        );

        assertEq(firstMint, 0);
        assertEq(secondMint, 1);
    }

    function test_balanceOfDeployerAfterAndBeforeMinting() public {
        assertEq(CuT.balanceOf(deployer), 0);

        mintDefault(deployer);

        assertEq(CuT.balanceOf(deployer), 1);
    }
}

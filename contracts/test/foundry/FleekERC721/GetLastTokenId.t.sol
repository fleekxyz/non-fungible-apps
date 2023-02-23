// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import "contracts/FleekERC721.sol";

contract Test_FleekERC721_GetLastTokenId is Test_FleekERC721_Base {
    function setUp() public {
        baseSetUp();
    }

    function test_cannotGetLastTokenIdWhenThereIsNoTokenMinted() public {
        vm.expectRevert(ThereIsNoTokenMinted.selector);
        CuT.getLastTokenId();
    }

    function test_getLastTokenIdForOneToken() public {
        uint256 mint = mintDefault(deployer);

        assertEq(mint, CuT.getLastTokenId());
    }

    function test_getLastTokenIdAfterThreeMints() public {
        mintDefault(deployer);
        mintDefault(deployer);
        uint256 lastMint = mintDefault(deployer);

        assertEq(lastMint, CuT.getLastTokenId());
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";

contract Test_FleekERC721_Burn is Test_FleekERC721_Base {
    uint256 internal tokenId;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
    }

    function test_burn() public {
        CuT.burn(tokenId);
    }

    function testFuzz_cannotBurnAsNotOwner(address account) public {
        vm.assume(account != deployer);
        vm.prank(account);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }

    function testFuzz_cannotBurnAsController(address account) public {
        vm.assume(account != deployer);
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, account);
        vm.prank(account);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }

    function testFuzz_cannotBurnInexistentToken(uint256 _tokenId) public {
        vm.assume(_tokenId != tokenId);
        expectRevertWithTokenRole(); // Token role is tested first before if token exists
        CuT.burn(_tokenId);
    }
}

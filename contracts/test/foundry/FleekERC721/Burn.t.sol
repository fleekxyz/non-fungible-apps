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

    function test_cannotBurnAsNotOwner() public {
        vm.prank(address(1));
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }

    function test_cannotBurnAsController() public {
        address user = address(1);
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, user);
        vm.prank(user);
        expectRevertWithTokenRole();
        CuT.burn(tokenId);
    }

    function test_cannotBurnInexistentToken() public {
        expectRevertWithTokenRole(); // Token role is tested first before if token exists
        CuT.burn(1);
    }
}

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

    function testFail_burnAsNotOwner() public {
        vm.prank(address(1));
        CuT.burn(tokenId);
    }

    function testFail_burnAsController() public {
        address user = address(1);
        CuT.grantTokenRole(tokenId, FleekAccessControl.Roles.Controller, user);
        vm.prank(user);
        CuT.burn(tokenId);
    }

    function testFail_burnInexistentToken() public {
        CuT.burn(1);
    }
}

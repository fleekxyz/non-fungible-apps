// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";
import {FleekAccessControl} from "contracts/FleekAccessControl.sol";

contract Test_FleekERC721_Deploy is Test_FleekERC721_Base {
    function setUp() public {
        baseSetUp();
    }

    function test_name() public {
        assertEq(CuT.name(), "Test Contract");
    }

    function test_symbol() public {
        assertEq(CuT.symbol(), "FLKAPS");
    }

    function test_deployerShouldBeCollectionOwner() public {
        assertTrue(CuT.hasCollectionRole(FleekAccessControl.Roles.Owner, deployer));
    }
}

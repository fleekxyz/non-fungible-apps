pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol";

contract ContractBTest is Test {
    FleekERC721 fleekContract;
    uint256 testNumber;

    function setUp() public {
        fleekContract = new FleekERC721("Test Contract", "FLKAPS");
    }

    function testName() public {
        assertEq(fleekContract.name(), "Test Contract");
    }

    function testSymbol() public {
        assertEq(fleekContract.symbol(), "FLKAPS");
    }

    function testMint() public {}

    function testTokenURI() public {}

    function testBurn() public {}

    function testSetTokenName() public {}

    function testSetTokenDescription() public {}

    function testSetTokenImage() public {}

    function testSetTokenExternalURL() public {}

    function testSetTokenBuild() public {}

    function testUpgradeTokenBuild() public {}

    function testSetTokenENS() public {}

    function testAddTokenController() public {}

    function testRemoveTokenController() public {}
}

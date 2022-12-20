pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol";

contract FleekTest is Test {
    FleekERC721 fleekContract;
    address constant DEPLOYER = 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496;

    function setUp() public {
        fleekContract = new FleekERC721("Test Contract", "FLKAPS");
    }

    function testName() public {
        assertEq(fleekContract.name(), "Test Contract");
    }

    function testSymbol() public {
        assertEq(fleekContract.symbol(), "FLKAPS");
    }

    function testMint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);
        assertEq(fleekContract.ownerOf(mint), DEPLOYER);
    }

    function testMintingMintedToken() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(first_mint, 0);
        assertEq(second_mint, 1);
    }

    function testMintingMoreThanOneTokenForTheSameAddress() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests [2].",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(second_mint, 1);
    }

    function testMintingTwoTokensForTwoAddresses() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            address(12),
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests[2].",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(second_mint, 1);
    }

    function testTokenURI() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App",',
            '"description":"This is a test application submitted by foundry tests.",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek.xyz",',
            '"image":"https://fleek.xyz",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz"},',
            '{"trait_type": "Commit Hash", "value":"afff3f6"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts"},',
            '{"trait_type": "Version", "value":"0"}',
            "]",
            "}"
        );

        assertEq(tokenURI, string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testCallingTokenURIAfterChangingAllPossibleFields() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenImage(mint, "https://fleek2.xyz");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/contracts2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App 2",',
            '"description":"This is a test application submitted by foundry tests. 2",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek2.xyz",',
            '"image":"https://fleek2.xyz",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz2"},',
            '{"trait_type": "Commit Hash", "value":"afff3f62"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts2"},',
            '{"trait_type": "Version", "value":"1"}',
            "]",
            "}"
        );

        assertEq(tokenURI, string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testFailChangingAllPossibleFieldsOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenImage(mint, "https://fleek2.xyz");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/contracts2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App 2",',
            '"description":"This is a test application submitted by foundry tests. 2",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek2.xyz",',
            '"image":"https://fleek2.xyz",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz2"},',
            '{"trait_type": "Commit Hash", "value":"afff3f62"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts2"},',
            '{"trait_type": "Version", "value":"1"}',
            "]",
            "}"
        );

        assertEq(tokenURI, string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testFailCallingTokenURIOnNonExistantToken() public {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App",',
            '"description":"This is a test application submitted by foundry tests.",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek.xyz",',
            '"image":"https://fleek.xyz",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz"},',
            '{"trait_type": "Commit Hash", "value":"afff3f6"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts"},',
            '{"trait_type": "Version", "value":"0"}',
            "]",
            "}"
        );

        assertEq(
            fleekContract.tokenURI(0),
            string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI))))
        );
    }

    function testBurn() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.burn(mint);
    }

    function testFailBurningNonExistantToken() public {
        fleekContract.burn(0);
    }

    function testFailBurnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.burn(mint);
    }

    function testFailTokenControllerAttemptsToBurnToken() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.burn(mint);
    }

    function testSetTokenName() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "NEW TOKEN NAME!");
    }

    function testFailSetTokenNameOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "NEW TOKEN NAME!");
    }

    function testSetTokenDescription() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenDescription(mint, "NEW TOKEN NAME!");
    }

    function testFailSetTokenDescriptionOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenDescription(mint, "NEW TOKEN NAME!");
    }

    function testSetTokenImage() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenImage(mint, "https://ethereum.org");
    }

    function testFailSetTokenImageOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenImage(mint, "https://ethereum.org");
    }

    function testSetTokenExternalURL() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenExternalURL(mint, "https://ethereum.org");
    }

    function testFailSetTokenExternalURLOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenExternalURL(mint, "https://ethereum.org");
    }

    function testSetTokenBuild() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenBuild(mint, "aaaaaaa", "https://github.com/fleekxyz/test_contracts");
    }

    function testFailSetTokenBuildOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenBuild(mint, "aaaaaaa", "https://github.com/fleekxyz/test_contracts");
    }

    function testSetTokenENS() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.setTokenENS(mint, "fleek_nfts");
    }

    function testFailSetTokenENSOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenENS(mint, "fleek_nfts");
    }

    function testAddTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailAddTokenControllerOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testAddTokenControllerTwice() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testRemoveTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveTokenControllerOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0x91A425C1CA320A99a09BE1bee114Fce5d30153d9
        );
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0x91A425C1CA320A99a09BE1bee114Fce5d30153d9
        );
    }

    function testRemoveTokenControllerTwice() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testRemoveUnknownTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.revokeTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveUnknownTokenControllerFromUnknownToken() public {
        fleekContract.revokeTokenRole(
            0,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
    }

    function testFailRemoveTokenOwnerByTokenController() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        fleekContract.grantTokenRole(
            mint,
            FleekAccessControl.Roles.Controller,
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84
        );
        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.revokeTokenRole(mint, FleekAccessControl.Roles.Controller, DEPLOYER);
    }

    function testBalanceOfDeployerAfterAndBeforeMinting() public {
        assertEq(fleekContract.balanceOf(DEPLOYER), 0);

        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/contracts"
        );

        assertEq(mint, 0);

        assertEq(fleekContract.balanceOf(DEPLOYER), 1);
    }
}

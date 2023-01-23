pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol";
import "../../contracts/util/FleekStrings.sol";

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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests [2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(second_mint, 1);
    }

    function testMintingTwoTokensForTwoAddresses() public {
        uint256 first_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            address(12),
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests[2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(second_mint, 1);
    }

    function _generateSVG(string memory name, string memory ENS) internal pure returns (string memory) {
        return (
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="640" height="480" viewBox="0 0 640 480" xml:space="preserve">',
                            "<defs>",
                            "</defs>",
                            '<g transform="matrix(3.42 0 0 3.42 300.98 252.98)"  >',
                            '<polygon style="stroke: rgb(0,0,0); stroke-width: 8; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(152,152,183); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  points="-50,-50 -50,50 50,50 50,-50 " />',
                            "</g>",
                            '<g transform="matrix(1 0 0 1 303.5 115.67)" style=""  >',
                            '<text xml:space="preserve" font-family="Open Sans" font-size="24" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-45.7" y="5.65" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">Fleek NFAs</tspan></text>',
                            "</g>",
                            '<g transform="matrix(1 0 0 1 302 261.47)" style=""  >',
                            '<text xml:space="preserve" font-family="Open Sans" font-size="28" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-44.26" y="-6.14" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">',
                            name,
                            '</tspan><tspan x="-37.14" y="17.45" style="stroke-width: 1; font-family: "Open Sans", sans-serif; font-size: 18px; font-style: normal; font-weight: normal; fill: rgb(0,0,0); ">',
                            ENS,
                            "</tspan></text>",
                            "</g>",
                            "</svg>"
                        )
                    )
                )
            )
        );
    }

    function testTokenURI() public {
        string memory name = "Foundry Test App";
        string memory ens = "fleek_xyz";

        uint256 mint = fleekContract.mint(
            DEPLOYER,
            name,
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            ens,
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"',
            name,
            '",',
            '"description":"This is a test application submitted by foundry tests.",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek.xyz",',
            '"image":"',
            _generateSVG(name, ens),
            '",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"',
            ens,
            '"},',
            '{"trait_type": "Commit Hash", "value":"afff3f6"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps"},',
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App 2",',
            '"description":"This is a test application submitted by foundry tests. 2",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek2.xyz",',
            '"image":"',
            _generateSVG("Foundry Test App 2", "fleek_xyz2"),
            '",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz2"},',
            '{"trait_type": "Commit Hash", "value":"afff3f62"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps2"},',
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name":"Foundry Test App 2",',
            '"description":"This is a test application submitted by foundry tests. 2",',
            '"owner":"',
            Strings.toHexString(uint160(DEPLOYER), 20),
            '",',
            '"external_url":"https://fleek2.xyz",',
            '"image":"',
            _generateSVG("Foundry Test App 2", "fleek_xyz2"),
            '",',
            '"attributes": [',
            '{"trait_type": "ENS", "value":"fleek_xyz2"},',
            '{"trait_type": "Commit Hash", "value":"afff3f62"},',
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps2"},',
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
            '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/non-fungible-apps"},',
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenDescription(mint, "NEW TOKEN NAME!");
    }

    function testSetTokenExternalURL() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
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
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        assertEq(fleekContract.balanceOf(DEPLOYER), 1);
    }

    function testAddAccessPoint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");

        assertEq(
            fleekContract.getAccessPointJSON("https://fleek_cloned.xyz"),
            '{"tokenId":0,"score":0,"nameVerified":false,"contentVerified":false,"owner":"0x7fa9385be102ac3eac297483dd6233d62b3e1496"}'
        );
    }

    function testFailRemoveAccessPoint() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");
        fleekContract.removeAccessPoint("https://fleek_cloned.xyz");
        fleekContract.getAccessPointJSON("https://fleek_cloned.xyz");
    }

    function testIsAccessPointNameVerified() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");
        assertFalse(fleekContract.isAccessPointNameVerified("https://fleek_cloned.xyz")); // is false now.

        fleekContract.setAccessPointNameVerify("https://fleek_cloned.xyz", true);
        assertTrue(fleekContract.isAccessPointNameVerified("https://fleek_cloned.xyz")); // is true now.
    }

    function testIncreaseAccessPointScore() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");
        fleekContract.increaseAccessPointScore("https://fleek_cloned.xyz");
        assertEq(
            fleekContract.getAccessPointJSON("https://fleek_cloned.xyz"),
            '{"tokenId":0,"score":1,"nameVerified":false,"contentVerified":false,"owner":"0x7fa9385be102ac3eac297483dd6233d62b3e1496"}'
        );
    }

    function testFailDecreaseAccessPointScoreToMinusOne() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");
        fleekContract.decreaseAccessPointScore("https://fleek_cloned.xyz");
    }

    function testDecreaseAccessPointScore() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");
        fleekContract.increaseAccessPointScore("https://fleek_cloned.xyz");
        fleekContract.decreaseAccessPointScore("https://fleek_cloned.xyz");
        assertEq(
            fleekContract.getAccessPointJSON("https://fleek_cloned.xyz"),
            '{"tokenId":0,"score":0,"nameVerified":false,"contentVerified":false,"owner":"0x7fa9385be102ac3eac297483dd6233d62b3e1496"}'
        );
    }

    function testAppAccessPoints() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");

        string[] memory accessPointList = fleekContract.appAccessPoints(mint);
        assertEq(accessPointList[0], "https://fleek_cloned.xyz");

        fleekContract.addAccessPoint(0, "https://fleek_cloned_2.xyz");

        accessPointList = fleekContract.appAccessPoints(mint);
        assertEq(accessPointList[1], "https://fleek_cloned_2.xyz");
    }

    function testFailSetAccessPointNameVerifyWithUnknownIdentity() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setAccessPointNameVerify("https://fleek_cloned.xyz", true);
    }

    function testFailSetAccessPointContentVerifyWithUnknownIdentity() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps"
        );

        assertEq(mint, 0);

        fleekContract.addAccessPoint(0, "https://fleek_cloned.xyz");

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setAccessPointContentVerify("https://fleek_cloned.xyz", true);
    }
}

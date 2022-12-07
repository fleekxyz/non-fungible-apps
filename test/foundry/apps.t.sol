pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol"; 

contract ContractBTest is Test {
    FleekERC721 fleekContract;

    function setUp() public {
        fleekContract = new FleekERC721('Test Contract', 'FLKAPS');
    }
    
    function testName() public {
        assertEq(fleekContract.name(), 'Test Contract');
    }

    function testSymbol() public {
        assertEq(fleekContract.symbol(), 'FLKAPS');
    }

    function testMint() public {
        uint256 mint = fleekContract.mint(
        0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
        'Foundry Test App',
        'This is a test application submitted by foundry tests.',
        'https://fleek.xyz',
        'https://fleek.xyz',
        'fleek_xyz',
        'afff3f6',
        'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);
    }

    function testMintingMintedToken() public {
        uint256 first_mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        uint256 second_mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(first_mint, 0);
        assertEq(second_mint, 1);
    }

    function testMintingMoreThanOneTokenForTheSameAddress() public {
        uint256 first_mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App 2',
            'This is a test application submitted by foundry tests [2].',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(second_mint, 1);
    }

    function testMintingTwoTokensForTwoAddresses() public {
        uint256 first_mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            address(0),
            'Foundry Test App 2',
            'This is a test application submitted by foundry tests[2].',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(second_mint, 1);
    }

    function testTokenURI() public {
        uint256 mint = fleekContract.mint(
        0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
        'Foundry Test App',
        'This is a test application submitted by foundry tests.',
        'https://fleek.xyz',
        'https://fleek.xyz',
        'fleek_xyz',
        'afff3f6',
        'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        string memory tokenURI = fleekContract.tokenURI(mint);

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name":"Foundry Test App",',
                '"description":"This is a test application submitted by foundry tests.",',
                '"owner":"0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84",',
                '"external_url":"https://fleek.xyz",',
                '"image":"https://fleek.xyz",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"fleek_xyz"},',
                    '{"trait_type": "Commit Hash", "value":"afff3f6"},',
                    '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts"},',
                    '{"trait_type": "Version", "value":"0"}',
                ']',
            '}'
        );

        assertEq(tokenURI, string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testFailCallingTokenURIOnNonExistantToken() public {
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name":"Foundry Test App",',
                '"description":"This is a test application submitted by foundry tests.",',
                '"owner":"0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84",',
                '"external_url":"https://fleek.xyz",',
                '"image":"https://fleek.xyz",',
                '"attributes": [',
                    '{"trait_type": "ENS", "value":"fleek_xyz"},',
                    '{"trait_type": "Commit Hash", "value":"afff3f6"},',
                    '{"trait_type": "Repository", "value":"https://github.com/fleekxyz/contracts"},',
                    '{"trait_type": "Version", "value":"0"}',
                ']',
            '}'
        );

        assertEq(fleekContract.tokenURI(0), string(abi.encodePacked("data:application/json;base64,", Base64.encode((dataURI)))));
    }

    function testBurn() public {
        uint256 mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        fleekContract.burn(mint);
    }

    function testFailBurningNonExistantToken() public {
        fleekContract.burn(0);
    }

    function testSetTokenName() public {
        uint256 mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, 'NEW TOKEN NAME!');
    }

    function testSetTokenDescription() public {
        uint256 mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        fleekContract.setTokenDescription(mint, 'NEW TOKEN NAME!');
    }

    function testSetTokenImage() public {
        uint256 mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        fleekContract.setTokenImage(mint, 'https://ethereum.org');
    }

    function testSetTokenExternalURL() public {
        uint256 mint = fleekContract.mint(
            0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84,
            'Foundry Test App',
            'This is a test application submitted by foundry tests.',
            'https://fleek.xyz',
            'https://fleek.xyz',
            'fleek_xyz',
            'afff3f6',
            'https://github.com/fleekxyz/contracts'
        );

        assertEq(mint, 0);

        fleekContract.setTokenExternalURL(mint, 'https://ethereum.org');
    }

    function testSetTokenBuild() public {
    }

    function testUpgradeTokenBuild() public {
    }

    function testSetTokenENS() public {
    }

    function testAddTokenController() public {
    }

    function testRemoveTokenController() public {   
    }

}

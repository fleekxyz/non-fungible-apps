pragma solidity ^0.8.7;

import "forge-std/Test.sol";
import "../../contracts/FleekERC721.sol";
import "./constants.t.sol";

contract FleekTest is Test {
    FleekERC721 fleekContract;
    address DEPLOYER;

    function setUp() public {
        DEPLOYER = address(this);
        fleekContract = new FleekERC721();
        fleekContract.initialize("Test Contract", "FLKAPS");
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests [2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(first_mint, 0);

        uint256 second_mint = fleekContract.mint(
            address(12),
            "Foundry Test App 2",
            "This is a test application submitted by foundry tests[2].",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(second_mint, 1);
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        string memory tokenURI = fleekContract.tokenURI(mint);

        assertEq(tokenURI, TestConstants.DEFAULT_TOKEN_URI);
    }

    function testCallingTokenURIAfterChangingAllPossibleFields() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");

        string memory tokenURI = fleekContract.tokenURI(mint);

        assertEq(
            tokenURI,
            "data:application/json;base64,eyJuYW1lIjoiRm91bmRyeSBUZXN0IEFwcCAyIiwiZGVzY3JpcHRpb24iOiJUaGlzIGlzIGEgdGVzdCBhcHBsaWNhdGlvbiBzdWJtaXR0ZWQgYnkgZm91bmRyeSB0ZXN0cy4gMiIsIm93bmVyIjoiMHgzNGExZDNmZmYzOTU4ODQzYzQzYWQ4MGYzMGI5NGM1MTA2NDVjMzE2IiwiZXh0ZXJuYWxfdXJsIjoiaHR0cHM6Ly9mbGVlazIueHl6IiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVEEyTlNJZ2FHVnBaMmgwUFNJeE1EWTFJaUIyYVdWM1FtOTRQU0l3SURBZ01UQTJOU0F4TURZMUlpQm1hV3hzUFNKdWIyNWxJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGh0Ykc1ek9uaHNhVzVyUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMM2hzYVc1cklqNDhjM1I1YkdVZ2RIbHdaVDBpZEdWNGRDOWpjM01pUGtCcGJYQnZjblFnZFhKc0tDSm9kSFJ3Y3pvdkwyWnZiblJ6TG1kdmIyZHNaV0Z3YVhNdVkyOXRMMk56Y3pJL1ptRnRhV3g1UFVsdWRHVnlPbmRuYUhSQU5UQXdPell3TUNJcE96d3ZjM1I1YkdVK1BISmxZM1FnZDJsa2RHZzlJakV3TmpVaUlHaGxhV2RvZEQwaU1UQTJOU0lnWm1sc2JEMGlkWEpzS0NOaVlXTnJaM0p2ZFc1a0tTSWdMejQ4Y21WamRDQnZjR0ZqYVhSNVBTSXdMaklpSUhkcFpIUm9QU0l4TURZMUlpQm9aV2xuYUhROUlqRXdOalVpSUdacGJHdzlJblZ5YkNnalltRmphMmR5YjNWdVpDMXlZV1JwWVd3cElpQXZQanhuSUdacGJIUmxjajBpZFhKc0tDTmthWE5yWlhSMFpTMXphR0ZrYjNjcElqNDhjR0YwYUNCa1BTSk5PRFUzTGpJek1TQXlOemt1TnpFeVREa3dNaTR5TkNBeU9EWXVOamMxUXpreE1DNDFORGNnTWpnM0xqazJJRGt4Tnk0NU1UVWdNamt5TGpjeU1TQTVNakl1TlNBeU9Ua3VOelk0VERrek9DNDRPVFFnTXpJMExqazJORU01TkRJdU1qUTVJRE16TUM0eE1pQTVORE11TXpFeElETXpOaTQwTXpjZ09UUXhMamd5TnlBek5ESXVOREEyVERrek55NDNPVGdnTXpVNExqWXhOVXc1TWpRdU1EUTVJRE0xTmk0Mk5VdzVNVGt1TkRFMklETTNOQzR3T0RSTU9UTTBMakEyT0NBek56WXVNalJNTnpreExqazBOeUE1TWpJdU1UVXlRemM0T0M0eE1Ea2dPVE0yTGpnNU5pQTNOek11TmprMElEazBOaTR6TURnZ056VTRMalkxTVNBNU5ETXVPRGt6VERFM09TNDJNellnT0RVd0xqa3lPRU14TmpJdU16RTRJRGcwT0M0eE5EY2dNVFV4TGpJeE5TQTRNekF1T1RnM0lERTFOUzQzTnpZZ09ERTBMakExTVV3eE5qQXVORGM0SURjNU5pNDFPVXczTURRdU16RTFJRGczT1M0MU56Uk1PRFUzTGpJek1TQXlOemt1TnpFeVdpSWdabWxzYkQwaUl6QTFNRFV3TlNJZ0x6NDhMMmMrUEhCaGRHZ2daRDBpVFRnME1DNHlNekVnTWpRd0xqY3hNa3c0T0RVdU1qUWdNalEzTGpZM05VTTRPVE11TlRRM0lESTBPQzQ1TmpFZ09UQXdMamt4TlNBeU5UTXVOekl5SURrd05TNDFJREkyTUM0M05qaE1PVEl4TGpnNU5DQXlPRFV1T1RZMVF6a3lOUzR5TkRrZ01qa3hMakV5SURreU5pNHpNVEVnTWprM0xqUXpOeUE1TWpRdU9ESTNJRE13TXk0ME1EWk1PVEl3TGpjNU9DQXpNVGt1TmpFMlREa3dOeTR3TkRrZ016RTNMalkxVERrd01pNDBNVFlnTXpNMUxqQTRORXc1TVRjdU1EWTRJRE16Tnk0eU5ERk1OemMwTGprME55QTRPRE11TVRVeVF6YzNNUzR4TURrZ09EazNMamc1TmlBM05UWXVOamswSURrd055NHpNRGdnTnpReExqWTFNU0E1TURRdU9Ea3pUREUyTWk0Mk16WWdPREV4TGpreU9FTXhORFV1TXpFNElEZ3dPUzR4TkRjZ01UTTBMakl4TlNBM09URXVPVGczSURFek9DNDNOellnTnpjMUxqQTFNVXd4TkRNdU5EYzRJRGMxTnk0MU9VdzJPRGN1TXpFMUlEZzBNQzQxTnpSTU9EUXdMakl6TVNBeU5EQXVOekV5V2lJZ1ptbHNiRDBpZFhKc0tDTnRZV2x1S1NJZ0x6NDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRNeE9TNDRORGNnTVRZeExqVXdNa016TVRBdU16VTJJREUyTUM0d01EY2dNekF3TGpZM05DQXhOall1TXpJMklESTVPQzR5TWpFZ01UYzFMall4Tmt3eE16Z3VOekkwSURjM09TNDNOVGhETVRNMkxqSTNNU0EzT0RrdU1EUTRJREUwTVM0NU56Y2dOemszTGpjNUlERTFNUzQwTmpnZ056azVMakk0TlV3M05EQXVNRFl4SURnNU1TNDVOek5ETnpRNUxqVTFNeUE0T1RNdU5EWTNJRGMxT1M0eU16VWdPRGczTGpFME9DQTNOakV1TmpnM0lEZzNOeTQ0TlRoTU9UQXlMalF3TlNBek5EUXVPRFUwVERnNE9TNHhOVGdnTXpReUxqYzJPRXc0T1RndU9EY3lJRE13TlM0NU56Sk1PVEV5TGpFeE9TQXpNRGd1TURVNVREa3hNeTQzTXpNZ016QXhMamswTmtNNU1UUXVPRE0zSURJNU55NDNOaklnT1RFMExqTXdPU0F5T1RNdU5EYzJJRGt4TWk0eU5URWdNamc1TGpreU4wdzRPVE11TkRnMElESTFOeTQxTmpsRE9Ea3hMakUxTXlBeU5UTXVOVFE1SURnNE55NHdOak1nTWpVd0xqZ3lNeUE0T0RJdU1qSXhJREkxTUM0d05qRk1PREk0TGpJd05TQXlOREV1TlRVMFF6Z3lNaTR5TWpRZ01qUXdMall4TXlBNE1UVXVPRFk1SURJME1pNDNPRE1nT0RFeExqUXlOeUF5TkRjdU1qZzBURGd3TlM0Mk9EWWdNalV6TGpFd00wTTRNRFF1TWpBMUlESTFOQzQyTURNZ09EQXlMakE0TnlBeU5UVXVNekkySURnd01DNHdPVE1nTWpVMUxqQXhNMHczT0RNdU5qRXhJREkxTWk0ME1UZE1Oek0wTGpNZ05ETTVMakU1TmtNM016RXVORE01SURRMU1DNHdNelVnTnpJd0xqRTBNeUEwTlRjdU5EQTNJRGN3T1M0d055QTBOVFV1TmpZelRETXlPQzQ0TkRjZ016azFMamM0T0VNek1UY3VOemMwSURNNU5DNHdORFVnTXpFeExqRXhOeUF6T0RNdU9EUTFJRE14TXk0NU56Z2dNemN6TGpBd04wd3pOall1TlRJNElERTNNeTQ1TmpKTU16WTJMalV6TXlBeE56TXVPVFF4UXpNMk55NHlNelFnTVRjeExqSTBJRE0yTlM0MU56SWdNVFk0TGpjd01pQXpOakl1T0RFZ01UWTRMakkyTjB3ek1Ua3VPRFEzSURFMk1TNDFNREphVFRNMk9TNHpPVElnTVRjMExqUXhORXd6TmpndU5qVXlJREUzTnk0eU1UZE1NekUyTGpnME15QXpOek11TkRVNFF6TXhOQzR6T1NBek9ESXVOelE0SURNeU1DNHdPVFlnTXpreExqUTVJRE15T1M0MU9EY2dNemt5TGprNE5VdzNNRGt1T0RFZ05EVXlMamcyUXpjeE9TNHpNREVnTkRVMExqTTFOQ0EzTWpndU9UZ3pJRFEwT0M0d016VWdOek14TGpRek5pQTBNemd1TnpRMVREYzRNQzQzTkRjZ01qVXhMamsyTmt3M09ETXVNalExSURJME1pNDFNRFJNTnpnekxqazROU0F5TXprdU56QXhURE0yT1M0ek9USWdNVGMwTGpReE5Gb2lJR1pwYkd3OUlpTXhNekV6TVRZaUlDOCtQSEJoZEdnZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lpQmpiR2x3TFhKMWJHVTlJbVYyWlc1dlpHUWlJSE4wY205clpUMGlkWEpzS0NOdFlXbHVLU0lnYzNSeWIydGxMWGRwWkhSb1BTSTBJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUdROUlrMHpNVGt1T0RRM0lERTJNUzQxTURKRE16RXdMak0xTmlBeE5qQXVNREEzSURNd01DNDJOelFnTVRZMkxqTXlOaUF5T1RndU1qSXhJREUzTlM0Mk1UWk1NVE00TGpjeU5DQTNOemt1TnpVNFF6RXpOaTR5TnpFZ056ZzVMakEwT0NBeE5ERXVPVGMzSURjNU55NDNPU0F4TlRFdU5EWTRJRGM1T1M0eU9EVk1OelF3TGpBMk1TQTRPVEV1T1RjelF6YzBPUzQxTlRNZ09Ea3pMalEyTnlBM05Ua3VNak0xSURnNE55NHhORGdnTnpZeExqWTROeUE0TnpjdU9EVTRURGt3TWk0ME1EVWdNelEwTGpnMU5FdzRPRGt1TVRVNElETTBNaTQzTmpoTU9EazRMamczTWlBek1EVXVPVGN5VERreE1pNHhNVGtnTXpBNExqQTFPVXc1TVRNdU56TXpJRE13TVM0NU5EWkRPVEUwTGpnek55QXlPVGN1TnpZeUlEa3hOQzR6TURrZ01qa3pMalEzTmlBNU1USXVNalV4SURJNE9TNDVNamRNT0RrekxqUTROQ0F5TlRjdU5UWTVRemc1TVM0eE5UTWdNalV6TGpVME9TQTRPRGN1TURZeklESTFNQzQ0TWpNZ09EZ3lMakl5TVNBeU5UQXVNRFl4VERneU9DNHlNRFVnTWpReExqVTFORU00TWpJdU1qSTBJREkwTUM0Mk1UTWdPREUxTGpnMk9TQXlOREl1TnpneklEZ3hNUzQwTWpjZ01qUTNMakk0TkV3NE1EVXVOamcySURJMU15NHhNRE5ET0RBMExqSXdOU0F5TlRRdU5qQXpJRGd3TWk0d09EY2dNalUxTGpNeU5pQTRNREF1TURreklESTFOUzR3TVROTU56Z3pMall4TVNBeU5USXVOREUzVERjek5DNHpJRFF6T1M0eE9UWkROek14TGpRek9TQTBOVEF1TURNMUlEY3lNQzR4TkRNZ05EVTNMalF3TnlBM01Ea3VNRGNnTkRVMUxqWTJNMHd6TWpndU9EUTNJRE01TlM0M09EaERNekUzTGpjM05DQXpPVFF1TURRMUlETXhNUzR4TVRjZ016Z3pMamcwTlNBek1UTXVPVGM0SURNM015NHdNRGRNTXpZMkxqVXlPQ0F4TnpNdU9UWXlURE0yTmk0MU16TWdNVGN6TGprME1VTXpOamN1TWpNMElERTNNUzR5TkNBek5qVXVOVGN5SURFMk9DNDNNRElnTXpZeUxqZ3hJREUyT0M0eU5qZE1NekU1TGpnME55QXhOakV1TlRBeVdrMHpOamt1TXpreUlERTNOQzQwTVRSTU16WTRMalkxTWlBeE56Y3VNakUzVERNeE5pNDRORE1nTXpjekxqUTFPRU16TVRRdU16a2dNemd5TGpjME9DQXpNakF1TURrMklETTVNUzQwT1NBek1qa3VOVGczSURNNU1pNDVPRFZNTnpBNUxqZ3hJRFExTWk0NE5rTTNNVGt1TXpBeElEUTFOQzR6TlRRZ056STRMams0TXlBME5EZ3VNRE0xSURjek1TNDBNellnTkRNNExqYzBOVXczT0RBdU56UTNJREkxTVM0NU5qWk1Oemd6TGpJME5TQXlOREl1TlRBMFREYzRNeTQ1T0RVZ01qTTVMamN3TVV3ek5qa3VNemt5SURFM05DNDBNVFJhSWlCbWFXeHNQU0oxY213b0kyUnBjMnRsZEhSbExXZHlZV1JwWlc1MEtTSWdabWxzYkMxdmNHRmphWFI1UFNJd0xqSWlJQzgrUEhCaGRHZ2daRDBpVFRNek5TNHpPQ0F5TURndU1URXpRek16TlM0NU1qSWdNakE0TGpFNU9DQXpNell1TkRFM0lESXdOeTQyT0RZZ016TTJMakk0TXlBeU1EY3VNVGM1VERNek1DNHpPU0F4T0RRdU56azFRek16TUM0eU5Ea2dNVGcwTGpJMk1TQXpNamt1TlRJNUlERTROQzR4TkRnZ016STVMakV5T1NBeE9EUXVOVGszVERNeE1pNHpOVGdnTWpBekxqUXhNVU16TVRFdU9UYzRJREl3TXk0NE16Z2dNekV5TGpFM05DQXlNRFF1TkRVNElETXhNaTQzTVRZZ01qQTBMalUwTkV3ek1UY3VPVFl5SURJd05TNHpOME16TVRndU16VTNJREl3TlM0ME16SWdNekU0TGpVNU5TQXlNRFV1TnprMklETXhPQzQwT1RNZ01qQTJMakU0TTB3ek1UUXVOeUF5TWpBdU5UVXhRek14TkM0MU9UY2dNakl3TGprek9DQXpNVFF1T0RNMUlESXlNUzR6TURJZ016RTFMakl6TVNBeU1qRXVNelkwVERNeU5DNDFNemtnTWpJeUxqZ3pRek15TkM0NU16VWdNakl5TGpnNU15QXpNalV1TXpNNElESXlNaTQyTWprZ016STFMalEwSURJeU1pNHlOREpNTXpJNUxqSXpNeUF5TURjdU9EYzFRek15T1M0ek16WWdNakEzTGpRNE9DQXpNamt1TnpNNUlESXdOeTR5TWpRZ016TXdMakV6TlNBeU1EY3VNamcyVERNek5TNHpPQ0F5TURndU1URXpXaUlnWm1sc2JEMGlkWEpzS0NOdFlXbHVLU0lnTHo0OGNHRjBhQ0JrUFNKTk16RTVMakk0TWlBeU5qa3VNRGczUXpNeE9TNDRNalFnTWpZNUxqRTNNeUF6TWpBdU16RTVJREkyT0M0Mk5qRWdNekl3TGpFNE5pQXlOamd1TVRVMFRETXhOQzR5T1RJZ01qUTFMamMzUXpNeE5DNHhOVEVnTWpRMUxqSXpOaUF6TVRNdU5ETXhJREkwTlM0eE1qTWdNekV6TGpBek1TQXlORFV1TlRjeVRESTVOaTR5TmpFZ01qWTBMak00TmtNeU9UVXVPRGdnTWpZMExqZ3hNaUF5T1RZdU1EYzJJREkyTlM0ME16TWdNamsyTGpZeE9DQXlOalV1TlRFNFRETXdNUzQ0TmpRZ01qWTJMak0wTkVNek1ESXVNalU1SURJMk5pNDBNRGNnTXpBeUxqUTVOeUF5TmpZdU56Y3hJRE13TWk0ek9UVWdNalkzTGpFMU9Fd3lPVGd1TmpBeUlESTRNUzQxTWpaRE1qazRMalVnTWpneExqa3hNeUF5T1RndU56TTNJREk0TWk0eU56Y2dNams1TGpFek15QXlPREl1TXpNNVRETXdPQzQwTkRFZ01qZ3pMamd3TlVNek1EZ3VPRE0zSURJNE15NDROamNnTXpBNUxqSTBJREk0TXk0Mk1EUWdNekE1TGpNME15QXlPRE11TWpFM1RETXhNeTR4TXpZZ01qWTRMamcwT1VNek1UTXVNak00SURJMk9DNDBOaklnTXpFekxqWTBNU0F5TmpndU1UazVJRE14TkM0d016Y2dNalk0TGpJMk1Vd3pNVGt1TWpneUlESTJPUzR3T0RkYUlpQm1hV3hzUFNKaWJHRmpheUlnWm1sc2JDMXZjR0ZqYVhSNVBTSXdMalVpSUM4K1BIQmhkR2dnWkQwaVRUTXdNeTR4T0RRZ016TXdMakEyTWtNek1ETXVOekkySURNek1DNHhORGdnTXpBMExqSXlNU0F6TWprdU5qTTJJRE13TkM0d09EZ2dNekk1TGpFeU9Fd3lPVGd1TVRrMElETXdOaTQzTkRWRE1qazRMakExTXlBek1EWXVNakV4SURJNU55NHpNek1nTXpBMkxqQTVPQ0F5T1RZdU9UTXpJRE13Tmk0MU5EZE1Namd3TGpFMk15QXpNalV1TXpZeFF6STNPUzQzT0RJZ016STFMamM0TnlBeU56a3VPVGM1SURNeU5pNDBNRGdnTWpnd0xqVXlJRE15Tmk0ME9UTk1NamcxTGpjMk5pQXpNamN1TXpFNVF6STROaTR4TmpFZ016STNMak00TWlBeU9EWXVNems1SURNeU55NDNORFlnTWpnMkxqSTVOeUF6TWpndU1UTXpUREk0TWk0MU1EUWdNelF5TGpVd01VTXlPREl1TkRBeUlETTBNaTQ0T0RnZ01qZ3lMall6T1NBek5ETXVNalV5SURJNE15NHdNelVnTXpRekxqTXhORXd5T1RJdU16UTBJRE0wTkM0M09FTXlPVEl1TnpNNUlETTBOQzQ0TkRJZ01qa3pMakUwTWlBek5EUXVOVGM1SURJNU15NHlORFVnTXpRMExqRTVNa3d5T1RjdU1ETTRJRE15T1M0NE1qUkRNamszTGpFMElETXlPUzQwTXpjZ01qazNMalUwTXlBek1qa3VNVGMwSURJNU55NDVNemtnTXpJNUxqSXpOa3d6TURNdU1UZzBJRE16TUM0d05qSmFJaUJtYVd4c1BTSmliR0ZqYXlJZ1ptbHNiQzF2Y0dGamFYUjVQU0l3TGpVaUlDOCtQSEJoZEdnZ2MzUnliMnRsUFNKMWNtd29JMjFoYVc0cElpQnpkSEp2YTJVdGQybGtkR2c5SWpZaUlITjBjbTlyWlMxc2FXNWxZMkZ3UFNKeWIzVnVaQ0lnYzNSeWIydGxMV3hwYm1WcWIybHVQU0p5YjNWdVpDSWdaRDBpVFRJNU1DNHhNRGtnTkRZekxqUXhPRU15T1RJdU16VTRJRFExTkM0NU1ESWdNekF4TGpJek15QTBORGt1TVRFZ016QTVMamt6TXlBME5UQXVORGhNTnpjeExqQTNJRFV5TXk0d09UWkROemM1TGpjM0lEVXlOQzQwTmpjZ056ZzFJRFV6TWk0ME9DQTNPREl1TnpVeUlEVTBNQzQ1T1RaTU5qa3lMakE0TmlBNE9EUXVOREU0VERFNU9TNDBORE1nT0RBMkxqZzBUREk1TUM0eE1Ea2dORFl6TGpReE9Gb2lJR1pwYkd3OUltSnNZV05ySWlCbWFXeHNMVzl3WVdOcGRIazlJakF1TVRRaUlDOCtQSEJoZEdnZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lpQmpiR2x3TFhKMWJHVTlJbVYyWlc1dlpHUWlJSE4wY205clpUMGlkWEpzS0NOdFlXbHVLU0lnYzNSeWIydGxMWGRwWkhSb1BTSTJJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUdROUlrMDNPRGN1TlRnNUlESXpOeTR6TkRsTU5EWXdMak0xTkNBeE9EVXVPREU0VERRd05pNHpNalVnTXprd0xqUTJPVU0wTURNdU9EY3lJRE01T1M0M05Ua2dOREE1TGpVM09DQTBNRGd1TlRBeElEUXhPUzR3TmprZ05EQTVMams1Tmt3M01URXVPVE0wSURRMU5pNHhNVFJETnpJeExqUXlOU0EwTlRjdU5qQTVJRGN6TVM0eE1EY2dORFV4TGpJNUlEY3pNeTQxTmlBME5ESk1OemczTGpVNE9TQXlNemN1TXpRNVdrMDJOakF1TWpZNUlESTBOUzR3TVVNMk5UVXVOVEl6SURJME5DNHlOak1nTmpVd0xqWTRNaUF5TkRjdU5ESXpJRFkwT1M0ME5UWWdNalV5TGpBMk9FdzJNRGN1TXpnMklEUXhNUzQwTVRoRE5qQTJMakUySURReE5pNHdOak1nTmpBNUxqQXhNeUEwTWpBdU5ETTBJRFl4TXk0M05Ua2dOREl4TGpFNE1VdzJPREl1TkRrNUlEUXpNaTR3TURaRE5qZzNMakkwTlNBME16SXVOelV6SURZNU1pNHdPRFlnTkRJNUxqVTVOQ0EyT1RNdU16RXlJRFF5TkM0NU5EbE1Oek0xTGpNNE1pQXlOalV1TlRrNVF6Y3pOaTQyTURnZ01qWXdMamsxTkNBM016TXVOelUxSURJMU5pNDFPRE1nTnpJNUxqQXhJREkxTlM0NE16Vk1Oall3TGpJMk9TQXlORFV1TURGYUlpQm1hV3hzUFNKMWNtd29JMjFoYVc0cElpQXZQanh3WVhSb0lHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdZMnhwY0MxeWRXeGxQU0psZG1WdWIyUmtJaUJrUFNKTk9EWTBMalkwTXlBeU9ETXVPVE0zUXpnMk5TNHhPRFlnTWpnekxqWXdOU0E0TmpVdU56QTRJREk0TkM0eU5UY2dPRFkxTGpJek9TQXlPRFF1TmpnelREZzBOQzR5TmpnZ016QXpMamN4T1VNNE5ETXVPVE00SURNd05DNHdNVGdnT0RRMExqQTVNeUF6TURRdU5URTNJRGcwTkM0MU1qWWdNekEwTGpVME9FdzROVE11TnpJMklETXdOUzR5TURkRE9EVTBMakU0TkNBek1EVXVNalFnT0RVMExqTXlNU0F6TURVdU56ZzNJRGcxTXk0NU5ESWdNekEyTGpBM01VdzRNek11T0RnMElETXlNUzR4TVRKRE9ETXpMalV3TmlBek1qRXVNemsySURnek15NDJORE1nTXpJeExqazBNeUE0TXpRdU1UQXhJRE15TVM0NU56Wk1PRFEwTGpBd055QXpNakl1TmpnMVF6ZzBOQzQwT1RFZ016SXlMamN5SURnME5DNDJNRFVnTXpJekxqTXhPU0E0TkRRdU1UYzNJRE15TXk0MU9FdzNPVGN1TnpVeUlETTFNUzQ1TlRSRE56azNMakl3T1NBek5USXVNamcySURjNU5pNDJPRGNnTXpVeExqWXpOQ0EzT1RjdU1UVTJJRE0xTVM0eU1EbE1PREU0TGpRd015QXpNekV1T1RJeVF6Z3hPQzQzTXpNZ016TXhMall5TWlBNE1UZ3VOVGMzSURNek1TNHhNak1nT0RFNExqRTBOU0F6TXpFdU1Ea3lURGd3T0M0M05EZ2dNek13TGpReVF6Z3dPQzR5T1RJZ016TXdMak00TnlBNE1EZ3VNVFUwSURNeU9TNDRORE1nT0RBNExqVXlPU0F6TWprdU5UVTRURGd5T0M0d05UUWdNekUwTGpjME5FTTRNamd1TkRNZ016RTBMalExT1NBNE1qZ3VNamt4SURNeE15NDVNVFVnT0RJM0xqZ3pOU0F6TVRNdU9EZ3lURGd4T0M0ek9Ea2dNekV6TGpJd05rTTRNVGN1T1RBMElETXhNeTR4TnpFZ09ERTNMamM1SURNeE1pNDFOeklnT0RFNExqSXhPQ0F6TVRJdU16RXhURGcyTkM0Mk5ETWdNamd6TGprek4xb2lJR1pwYkd3OUluZG9hWFJsSWlBdlBqeG5JSFJ5WVc1elptOXliVDBpYldGMGNtbDRLREF1T1RnM09ESTNJREF1TVRVMU5UVTNJQzB3TGpJMU5USTJNU0F3TGprMk5qZzNNaUF5TlRBZ056TTFLU0krUEhSbGVIUWdabTl1ZEMxbVlXMXBiSGs5SWtsdWRHVnlMQ0J6WVc1ekxYTmxjbWxtSWlCbWIyNTBMWGRsYVdkb2REMGlZbTlzWkNJZ1ptOXVkQzF6YVhwbFBTSTBNaUlnWm1sc2JEMGlJMFUxUlRkR09DSStSbTkxYm1SeWVTQlVaWE4wSUVGd2NDQXlQQzkwWlhoMFBqeDBaWGgwSUdadmJuUXRabUZ0YVd4NVBTSkpiblJsY2l3Z2MyRnVjeTF6WlhKcFppSWdabTl1ZEMxM1pXbG5hSFE5SW01dmNtMWhiQ0lnZVQwaU5EQWlJR1p2Ym5RdGMybDZaVDBpTWpJaUlHWnBiR3c5SWlNM1JqZ3hPVElpUG1ac1pXVnJYM2g1ZWpJOEwzUmxlSFErUEM5blBqeHBiV0ZuWlNCM2FXUjBhRDBpTVRZM0lpQm9aV2xuYUhROUlqRTJOeUlnZEhKaGJuTm1iM0p0UFNKdFlYUnlhWGdvTUM0NU9EYzRNamNnTUM0eE5UVTFOVGNnTFRBdU1qVTFNall4SURBdU9UWTJPRGN5SURRME5DNHhNVGNnTlRJMExqRTNLU0lnYUhKbFpqMGlaR0YwWVRwcGJXRm5aUzl6ZG1jcmVHMXNPMkpoYzJVMk5DeFFTRTR5V25sQ2JXRlhlSE5RVTBwMVlqSTFiRWxwUW05YVYyeHVZVWhST1VscVNURk5SRUZwU1Voa2NGcElVbTlRVTBsNVRWUm5la2xwUWpSaVYzaDFZM293YVdGSVVqQmpSRzkyVEROa00yUjVOVE5OZVRWMlkyMWpkazFxUVhkTlF6bDZaRzFqYVVsSVduQmFXR1JEWWpObk9VbHFRV2ROUTBGNFRXcFJaMDFVVVhoTWFsVjZUVlJyTlU5VWF6VlBWR3MxVDFSck5FbHFORGhqUjBZd1lVTkNhMUJUU2s1TlZFRjFUWHBuZWtsRVJYbE9hVFEwVDFSU1RVMURRWGRpUkVWNVRrTkJkVTFxVlRGTVZFVjNUR3ByTTA5VFFYaE5hbGwxVG1wTk5VeFVWWGRNYWxVeFRYbEJlRTVETkRKTmVtZzJTV2xDYldGWGVITlFVMGxxV2xSTk1GcHFTVEpKYVRnclVFaENhR1JIWjJkYVJEQnBWRlJaZVV4cVVUSlBRMEY0VFdwcmRVMXFZek5XYWtWNVRHcEJORTVYZHpGTlV6UjNUbXBSZFUxVVkzUlBVelI0VFVSWlowMVVRVEJNYW1jeFRWaHZhVWxIV25CaVIzYzVTV2xPYkZwcVdURk5iVVZwVEhvME9HTkhSakJoUTBKclVGTktUazlVYTNWT1JHdG5Ua1JGZFUxNldYbGlSRVYxVGtSUk1reFVSVEZNYWxFMVUwUkplVXhxVFRSTk1uY3dUR3BOTUVsRVVUTk1hbEUxWVVSVk1FeHFTWGhOTUhjelQwTTBORTFUUVRWTmVUUXlUVlJrYzB4VVJUTk1hazB5VFdsQk1FeHFXVFJNVkVVelRHcFplRTU1TURGTWFrVjNUbWt3ZFU5VVRUSk1WRVY1VEdwQk5FNVZaM2xPZVRSNlRWUnNjMDFwTkhoTmFtZG5UV3BSZFU1cVozaEpSRTE1U1VSbmRVOVVUVEpKUkUxNVRHcEpNVTVUTURSTWFtdDZUbWxCTUV4cVRUQk1WRkUwVEdwRk0xTkVVWGhNYWtWM1RqQjNlazlUTkRCUFUwRXdUVk0wZWs1cVNqWkphVUp0WVZkNGMxQlRTV3BhYlZwdFNXazRLMUJET1hwa2JXTXJJaUF2UGp4a1pXWnpQanhtYVd4MFpYSWdhV1E5SW1ScGMydGxkSFJsTFhOb1lXUnZkeUlnZUQwaU56QXVOelE0T1NJZ2VUMGlNVGsxTGpjeE1pSWdkMmxrZEdnOUlqazFOUzQzTXpNaUlHaGxhV2RvZEQwaU9ETXlMalUxT0NJZ1ptbHNkR1Z5Vlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElpQmpiMnh2Y2kxcGJuUmxjbkJ2YkdGMGFXOXVMV1pwYkhSbGNuTTlJbk5TUjBJaVBqeG1aVVpzYjI5a0lHWnNiMjlrTFc5d1lXTnBkSGs5SWpBaUlDOCtQR1psUW14bGJtUWdhVzQ5SWxOdmRYSmpaVWR5WVhCb2FXTWlJQzgrUEdabFIyRjFjM05wWVc1Q2JIVnlJSE4wWkVSbGRtbGhkR2x2YmowaU5ESWlJQzgrUEM5bWFXeDBaWEkrUEd4cGJtVmhja2R5WVdScFpXNTBJR2xrUFNKaVlXTnJaM0p2ZFc1a0lpQjRNVDBpTlRNeUxqVWlJSGt4UFNJd0lpQjRNajBpTlRNeUxqVWlJSGt5UFNJeE1EWTFJaUJuY21Ga2FXVnVkRlZ1YVhSelBTSjFjMlZ5VTNCaFkyVlBibFZ6WlNJK1BITjBiM0FnTHo0OGMzUnZjQ0J2Wm1aelpYUTlJakVpSUhOMGIzQXRZMjlzYjNJOUlpTXhNekV6TVRNaUlDOCtQQzlzYVc1bFlYSkhjbUZrYVdWdWRENDhjbUZrYVdGc1IzSmhaR2xsYm5RZ2FXUTlJbUpoWTJ0bmNtOTFibVF0Y21Ga2FXRnNJaUJqZUQwaU1DSWdZM2s5SWpBaUlISTlJakVpSUdkeVlXUnBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElpQm5jbUZrYVdWdWRGUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLRFV6TWk0MUlEVXpNaTQxS1NCeWIzUmhkR1VvT0RrdU9UWXhLU0J6WTJGc1pTZzNNelVwSWo0OGMzUnZjQ0J6ZEc5d0xXTnZiRzl5UFNJalpUTTBaakkySWlBdlBqeHpkRzl3SUc5bVpuTmxkRDBpTVNJZ2MzUnZjQzFqYjJ4dmNqMGlJMlV6TkdZeU5pSWdjM1J2Y0MxdmNHRmphWFI1UFNJd0lpQXZQand2Y21Ga2FXRnNSM0poWkdsbGJuUStQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU0prYVhOclpYUjBaUzFuY21Ga2FXVnVkQ0lnZURFOUlqa3lOUzQyTWpZaUlIa3hQU0l5TlRZdU9EazJJaUI0TWowaU1UTTJMamMzT1NJZ2VUSTlJamd3TUM0eU1ETWlJR2R5WVdScFpXNTBWVzVwZEhNOUluVnpaWEpUY0dGalpVOXVWWE5sSWo0OGMzUnZjQ0J6ZEc5d0xXTnZiRzl5UFNJalpUTTBaakkySWlBdlBqeHpkRzl3SUc5bVpuTmxkRDBpTVNJZ2MzUnZjQzFqYjJ4dmNqMGlJekpETXpFelJpSWdMejQ4TDJ4cGJtVmhja2R5WVdScFpXNTBQanhzYVc1bFlYSkhjbUZrYVdWdWRDQnBaRDBpYldGcGJpSStQSE4wYjNBZ2MzUnZjQzFqYjJ4dmNqMGlJMlV6TkdZeU5pSWdMejQ4TDJ4cGJtVmhja2R5WVdScFpXNTBQand2WkdWbWN6NDhMM04yWno0PSIsImF0dHJpYnV0ZXMiOiBbeyJ0cmFpdF90eXBlIjogIkVOUyIsICJ2YWx1ZSI6ImZsZWVrX3h5ejIifSx7InRyYWl0X3R5cGUiOiAiQ29tbWl0IEhhc2giLCAidmFsdWUiOiJhZmZmM2Y2MiJ9LHsidHJhaXRfdHlwZSI6ICJSZXBvc2l0b3J5IiwgInZhbHVlIjoiaHR0cHM6Ly9naXRodWIuY29tL2ZsZWVreHl6L25vbi1mdW5naWJsZS1hcHBzMiJ9LHsidHJhaXRfdHlwZSI6ICJWZXJzaW9uIiwgInZhbHVlIjoiMSJ9LHsidHJhaXRfdHlwZSI6ICJDb2xvciIsICJ2YWx1ZSI6IiNlMzRmMjYifV19"
        );
    }

    function testFailChangingAllPossibleFieldsOnAnotherUsersTokenWithoutAccess() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));

        fleekContract.setTokenName(mint, "Foundry Test App 2");
        fleekContract.setTokenDescription(mint, "This is a test application submitted by foundry tests. 2");
        fleekContract.setTokenExternalURL(mint, "https://fleek2.xyz");
        fleekContract.setTokenENS(mint, "fleek_xyz2");
        fleekContract.setTokenBuild(mint, "afff3f62", "https://github.com/fleekxyz/non-fungible-apps2");
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
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
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        assertEq(fleekContract.balanceOf(DEPLOYER), 1);
    }

    function testSetTokenLogo() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenLogo(mint, TestConstants.LOGO_1);
    }

    function testFailSetTokenLogoForInvalidAccount() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.setTokenLogo(mint, TestConstants.LOGO_1);
    }

    function testFailSetTokenLogoForInvalidToken() public {
        fleekContract.setTokenLogo(3, TestConstants.LOGO_1);
    }

    function testSetTokenColor() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        fleekContract.setTokenColor(mint, 0x000000);
    }

    function testFailSetTokenColorForInvalidAccount() public {
        uint256 mint = fleekContract.mint(
            DEPLOYER,
            "Foundry Test App",
            "This is a test application submitted by foundry tests.",
            "https://fleek.xyz",
            "fleek_xyz",
            "afff3f6",
            "https://github.com/fleekxyz/non-fungible-apps",
            TestConstants.LOGO_0,
            0xe34f26
        );

        assertEq(mint, 0);

        vm.prank(address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84));
        fleekContract.setTokenColor(mint, 0x000000);
    }

    function testFailSetTokenColorForInvalidToken() public {
        fleekContract.setTokenColor(3, 0x000000);
    }
}

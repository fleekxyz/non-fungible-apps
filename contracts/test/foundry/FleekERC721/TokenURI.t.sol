// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./TestBase.sol";

contract Test_FleekERC721_TokenURIAssertions is Test {
    event MetadataUpdate(uint256 indexed _tokenId, string key, string value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, string[2] value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, uint24 value, address indexed triggeredBy);

    function expectMetadataUpdate(
        uint256 _tokenId,
        string memory key,
        string memory value,
        address triggeredBy
    ) public {
        vm.expectEmit(true, true, true, true);
        emit MetadataUpdate(_tokenId, key, value, triggeredBy);
    }

    function expectMetadataUpdate(
        uint256 _tokenId,
        string memory key,
        string[2] memory value,
        address triggeredBy
    ) public {
        vm.expectEmit(true, true, true, true);
        emit MetadataUpdate(_tokenId, key, value, triggeredBy);
    }

    function expectMetadataUpdate(uint256 _tokenId, string memory key, uint24 value, address triggeredBy) public {
        vm.expectEmit(true, true, true, true);
        emit MetadataUpdate(_tokenId, key, value, triggeredBy);
    }
}

contract Test_FleekERC721_TokenURI is Test_FleekERC721_Base, Test_FleekERC721_TokenURIAssertions {
    uint256 internal tokenId;

    function setUp() public {
        baseSetUp();
        tokenId = mintDefault(deployer);
    }

    function test_tokenURI() public {
        string memory uri = CuT.tokenURI(tokenId);
        assertEq(
            uri,
            "data:application/json;base64,eyJuYW1lIjoiRm91bmRyeSBUZXN0IEFwcCIsImRlc2NyaXB0aW9uIjoiVGhpcyBpcyBhIHRlc3QgYXBwbGljYXRpb24gc3VibWl0dGVkIGJ5IGZvdW5kcnkgdGVzdHMuIiwib3duZXIiOiIweDM0YTFkM2ZmZjM5NTg4NDNjNDNhZDgwZjMwYjk0YzUxMDY0NWMzMTYiLCJleHRlcm5hbF91cmwiOiJodHRwczovL2ZvdW5kcnkudGVzdCIsImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRBMk5TSWdhR1ZwWjJoMFBTSXhNRFkxSWlCMmFXVjNRbTk0UFNJd0lEQWdNVEEyTlNBeE1EWTFJaUJtYVd4c1BTSnViMjVsSWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhodGJHNXpPbmhzYVc1clBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1TDNoc2FXNXJJajQ4YzNSNWJHVWdkSGx3WlQwaWRHVjRkQzlqYzNNaVBrQnBiWEJ2Y25RZ2RYSnNLQ0pvZEhSd2N6b3ZMMlp2Ym5SekxtZHZiMmRzWldGd2FYTXVZMjl0TDJOemN6SS9abUZ0YVd4NVBVbHVkR1Z5T25kbmFIUkFOVEF3T3pZd01DSXBPend2YzNSNWJHVStQSEpsWTNRZ2QybGtkR2c5SWpFd05qVWlJR2hsYVdkb2REMGlNVEEyTlNJZ1ptbHNiRDBpZFhKc0tDTmlZV05yWjNKdmRXNWtLU0lnTHo0OGNtVmpkQ0J2Y0dGamFYUjVQU0l3TGpJaUlIZHBaSFJvUFNJeE1EWTFJaUJvWldsbmFIUTlJakV3TmpVaUlHWnBiR3c5SW5WeWJDZ2pZbUZqYTJkeWIzVnVaQzF5WVdScFlXd3BJaUF2UGp4bklHWnBiSFJsY2owaWRYSnNLQ05rYVhOclpYUjBaUzF6YUdGa2IzY3BJajQ4Y0dGMGFDQmtQU0pOT0RVM0xqSXpNU0F5TnprdU56RXlURGt3TWk0eU5DQXlPRFl1TmpjMVF6a3hNQzQxTkRjZ01qZzNMamsySURreE55NDVNVFVnTWpreUxqY3lNU0E1TWpJdU5TQXlPVGt1TnpZNFREa3pPQzQ0T1RRZ016STBMamsyTkVNNU5ESXVNalE1SURNek1DNHhNaUE1TkRNdU16RXhJRE16Tmk0ME16Y2dPVFF4TGpneU55QXpOREl1TkRBMlREa3pOeTQzT1RnZ016VTRMall4TlV3NU1qUXVNRFE1SURNMU5pNDJOVXc1TVRrdU5ERTJJRE0zTkM0d09EUk1PVE0wTGpBMk9DQXpOell1TWpSTU56a3hMamswTnlBNU1qSXVNVFV5UXpjNE9DNHhNRGtnT1RNMkxqZzVOaUEzTnpNdU5qazBJRGswTmk0ek1EZ2dOelU0TGpZMU1TQTVORE11T0RrelRERTNPUzQyTXpZZ09EVXdMamt5T0VNeE5qSXVNekU0SURnME9DNHhORGNnTVRVeExqSXhOU0E0TXpBdU9UZzNJREUxTlM0M056WWdPREUwTGpBMU1Vd3hOakF1TkRjNElEYzVOaTQxT1V3M01EUXVNekUxSURnM09TNDFOelJNT0RVM0xqSXpNU0F5TnprdU56RXlXaUlnWm1sc2JEMGlJekExTURVd05TSWdMejQ4TDJjK1BIQmhkR2dnWkQwaVRUZzBNQzR5TXpFZ01qUXdMamN4TWt3NE9EVXVNalFnTWpRM0xqWTNOVU00T1RNdU5UUTNJREkwT0M0NU5qRWdPVEF3TGpreE5TQXlOVE11TnpJeUlEa3dOUzQxSURJMk1DNDNOamhNT1RJeExqZzVOQ0F5T0RVdU9UWTFRemt5TlM0eU5Ea2dNamt4TGpFeUlEa3lOaTR6TVRFZ01qazNMalF6TnlBNU1qUXVPREkzSURNd015NDBNRFpNT1RJd0xqYzVPQ0F6TVRrdU5qRTJURGt3Tnk0d05Ea2dNekUzTGpZMVREa3dNaTQwTVRZZ016TTFMakE0TkV3NU1UY3VNRFk0SURNek55NHlOREZNTnpjMExqazBOeUE0T0RNdU1UVXlRemMzTVM0eE1Ea2dPRGszTGpnNU5pQTNOVFl1TmprMElEa3dOeTR6TURnZ056UXhMalkxTVNBNU1EUXVPRGt6VERFMk1pNDJNellnT0RFeExqa3lPRU14TkRVdU16RTRJRGd3T1M0eE5EY2dNVE0wTGpJeE5TQTNPVEV1T1RnM0lERXpPQzQzTnpZZ056YzFMakExTVV3eE5ETXVORGM0SURjMU55NDFPVXcyT0RjdU16RTFJRGcwTUM0MU56Uk1PRFF3TGpJek1TQXlOREF1TnpFeVdpSWdabWxzYkQwaWRYSnNLQ050WVdsdUtTSWdMejQ4Y0dGMGFDQm1hV3hzTFhKMWJHVTlJbVYyWlc1dlpHUWlJR05zYVhBdGNuVnNaVDBpWlhabGJtOWtaQ0lnWkQwaVRUTXhPUzQ0TkRjZ01UWXhMalV3TWtNek1UQXVNelUySURFMk1DNHdNRGNnTXpBd0xqWTNOQ0F4TmpZdU16STJJREk1T0M0eU1qRWdNVGMxTGpZeE5rd3hNemd1TnpJMElEYzNPUzQzTlRoRE1UTTJMakkzTVNBM09Ea3VNRFE0SURFME1TNDVOemNnTnprM0xqYzVJREUxTVM0ME5qZ2dOems1TGpJNE5VdzNOREF1TURZeElEZzVNUzQ1TnpORE56UTVMalUxTXlBNE9UTXVORFkzSURjMU9TNHlNelVnT0RnM0xqRTBPQ0EzTmpFdU5qZzNJRGczTnk0NE5UaE1PVEF5TGpRd05TQXpORFF1T0RVMFREZzRPUzR4TlRnZ016UXlMamMyT0V3NE9UZ3VPRGN5SURNd05TNDVOekpNT1RFeUxqRXhPU0F6TURndU1EVTVURGt4TXk0M016TWdNekF4TGprME5rTTVNVFF1T0RNM0lESTVOeTQzTmpJZ09URTBMak13T1NBeU9UTXVORGMySURreE1pNHlOVEVnTWpnNUxqa3lOMHc0T1RNdU5EZzBJREkxTnk0MU5qbERPRGt4TGpFMU15QXlOVE11TlRRNUlEZzROeTR3TmpNZ01qVXdMamd5TXlBNE9ESXVNakl4SURJMU1DNHdOakZNT0RJNExqSXdOU0F5TkRFdU5UVTBRemd5TWk0eU1qUWdNalF3TGpZeE15QTRNVFV1T0RZNUlESTBNaTQzT0RNZ09ERXhMalF5TnlBeU5EY3VNamcwVERnd05TNDJPRFlnTWpVekxqRXdNME00TURRdU1qQTFJREkxTkM0Mk1ETWdPREF5TGpBNE55QXlOVFV1TXpJMklEZ3dNQzR3T1RNZ01qVTFMakF4TTB3M09ETXVOakV4SURJMU1pNDBNVGRNTnpNMExqTWdORE01TGpFNU5rTTNNekV1TkRNNUlEUTFNQzR3TXpVZ056SXdMakUwTXlBME5UY3VOREEzSURjd09TNHdOeUEwTlRVdU5qWXpURE15T0M0NE5EY2dNemsxTGpjNE9FTXpNVGN1TnpjMElETTVOQzR3TkRVZ016RXhMakV4TnlBek9ETXVPRFExSURNeE15NDVOemdnTXpjekxqQXdOMHd6TmpZdU5USTRJREUzTXk0NU5qSk1NelkyTGpVek15QXhOek11T1RReFF6TTJOeTR5TXpRZ01UY3hMakkwSURNMk5TNDFOeklnTVRZNExqY3dNaUF6TmpJdU9ERWdNVFk0TGpJMk4wd3pNVGt1T0RRM0lERTJNUzQxTURKYVRUTTJPUzR6T1RJZ01UYzBMalF4TkV3ek5qZ3VOalV5SURFM055NHlNVGRNTXpFMkxqZzBNeUF6TnpNdU5EVTRRek14TkM0ek9TQXpPREl1TnpRNElETXlNQzR3T1RZZ016a3hMalE1SURNeU9TNDFPRGNnTXpreUxqazROVXczTURrdU9ERWdORFV5TGpnMlF6Y3hPUzR6TURFZ05EVTBMak0xTkNBM01qZ3VPVGd6SURRME9DNHdNelVnTnpNeExqUXpOaUEwTXpndU56UTFURGM0TUM0M05EY2dNalV4TGprMk5rdzNPRE11TWpRMUlESTBNaTQxTURSTU56Z3pMams0TlNBeU16a3VOekF4VERNMk9TNHpPVElnTVRjMExqUXhORm9pSUdacGJHdzlJaU14TXpFek1UWWlJQzgrUEhCaGRHZ2dabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJaUJqYkdsd0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOMGNtOXJaVDBpZFhKc0tDTnRZV2x1S1NJZ2MzUnliMnRsTFhkcFpIUm9QU0kwSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlHUTlJazB6TVRrdU9EUTNJREUyTVM0MU1ESkRNekV3TGpNMU5pQXhOakF1TURBM0lETXdNQzQyTnpRZ01UWTJMak15TmlBeU9UZ3VNakl4SURFM05TNDJNVFpNTVRNNExqY3lOQ0EzTnprdU56VTRRekV6Tmk0eU56RWdOemc1TGpBME9DQXhOREV1T1RjM0lEYzVOeTQzT1NBeE5URXVORFk0SURjNU9TNHlPRFZNTnpRd0xqQTJNU0E0T1RFdU9UY3pRemMwT1M0MU5UTWdPRGt6TGpRMk55QTNOVGt1TWpNMUlEZzROeTR4TkRnZ056WXhMalk0TnlBNE56Y3VPRFU0VERrd01pNDBNRFVnTXpRMExqZzFORXc0T0RrdU1UVTRJRE0wTWk0M05qaE1PRGs0TGpnM01pQXpNRFV1T1RjeVREa3hNaTR4TVRrZ016QTRMakExT1V3NU1UTXVOek16SURNd01TNDVORFpET1RFMExqZ3pOeUF5T1RjdU56WXlJRGt4TkM0ek1Ea2dNamt6TGpRM05pQTVNVEl1TWpVeElESTRPUzQ1TWpkTU9Ea3pMalE0TkNBeU5UY3VOVFk1UXpnNU1TNHhOVE1nTWpVekxqVTBPU0E0T0RjdU1EWXpJREkxTUM0NE1qTWdPRGd5TGpJeU1TQXlOVEF1TURZeFREZ3lPQzR5TURVZ01qUXhMalUxTkVNNE1qSXVNakkwSURJME1DNDJNVE1nT0RFMUxqZzJPU0F5TkRJdU56Z3pJRGd4TVM0ME1qY2dNalEzTGpJNE5FdzRNRFV1TmpnMklESTFNeTR4TURORE9EQTBMakl3TlNBeU5UUXVOakF6SURnd01pNHdPRGNnTWpVMUxqTXlOaUE0TURBdU1Ea3pJREkxTlM0d01UTk1Oemd6TGpZeE1TQXlOVEl1TkRFM1REY3pOQzR6SURRek9TNHhPVFpETnpNeExqUXpPU0EwTlRBdU1ETTFJRGN5TUM0eE5ETWdORFUzTGpRd055QTNNRGt1TURjZ05EVTFMalkyTTB3ek1qZ3VPRFEzSURNNU5TNDNPRGhETXpFM0xqYzNOQ0F6T1RRdU1EUTFJRE14TVM0eE1UY2dNemd6TGpnME5TQXpNVE11T1RjNElETTNNeTR3TURkTU16WTJMalV5T0NBeE56TXVPVFl5VERNMk5pNDFNek1nTVRjekxqazBNVU16TmpjdU1qTTBJREUzTVM0eU5DQXpOalV1TlRjeUlERTJPQzQzTURJZ016WXlMamd4SURFMk9DNHlOamRNTXpFNUxqZzBOeUF4TmpFdU5UQXlXazB6TmprdU16a3lJREUzTkM0ME1UUk1Nelk0TGpZMU1pQXhOemN1TWpFM1RETXhOaTQ0TkRNZ016Y3pMalExT0VNek1UUXVNemtnTXpneUxqYzBPQ0F6TWpBdU1EazJJRE01TVM0ME9TQXpNamt1TlRnM0lETTVNaTQ1T0RWTU56QTVMamd4SURRMU1pNDROa00zTVRrdU16QXhJRFExTkM0ek5UUWdOekk0TGprNE15QTBORGd1TURNMUlEY3pNUzQwTXpZZ05ETTRMamMwTlV3M09EQXVOelEzSURJMU1TNDVOalpNTnpnekxqSTBOU0F5TkRJdU5UQTBURGM0TXk0NU9EVWdNak01TGpjd01Vd3pOamt1TXpreUlERTNOQzQwTVRSYUlpQm1hV3hzUFNKMWNtd29JMlJwYzJ0bGRIUmxMV2R5WVdScFpXNTBLU0lnWm1sc2JDMXZjR0ZqYVhSNVBTSXdMaklpSUM4K1BIQmhkR2dnWkQwaVRUTXpOUzR6T0NBeU1EZ3VNVEV6UXpNek5TNDVNaklnTWpBNExqRTVPQ0F6TXpZdU5ERTNJREl3Tnk0Mk9EWWdNek0yTGpJNE15QXlNRGN1TVRjNVRETXpNQzR6T1NBeE9EUXVOemsxUXpNek1DNHlORGtnTVRnMExqSTJNU0F6TWprdU5USTVJREU0TkM0eE5EZ2dNekk1TGpFeU9TQXhPRFF1TlRrM1RETXhNaTR6TlRnZ01qQXpMalF4TVVNek1URXVPVGM0SURJd015NDRNemdnTXpFeUxqRTNOQ0F5TURRdU5EVTRJRE14TWk0M01UWWdNakEwTGpVME5Fd3pNVGN1T1RZeUlESXdOUzR6TjBNek1UZ3VNelUzSURJd05TNDBNeklnTXpFNExqVTVOU0F5TURVdU56azJJRE14T0M0ME9UTWdNakEyTGpFNE0wd3pNVFF1TnlBeU1qQXVOVFV4UXpNeE5DNDFPVGNnTWpJd0xqa3pPQ0F6TVRRdU9ETTFJREl5TVM0ek1ESWdNekUxTGpJek1TQXlNakV1TXpZMFRETXlOQzQxTXprZ01qSXlMamd6UXpNeU5DNDVNelVnTWpJeUxqZzVNeUF6TWpVdU16TTRJREl5TWk0Mk1qa2dNekkxTGpRMElESXlNaTR5TkRKTU16STVMakl6TXlBeU1EY3VPRGMxUXpNeU9TNHpNellnTWpBM0xqUTRPQ0F6TWprdU56TTVJREl3Tnk0eU1qUWdNek13TGpFek5TQXlNRGN1TWpnMlRETXpOUzR6T0NBeU1EZ3VNVEV6V2lJZ1ptbHNiRDBpZFhKc0tDTnRZV2x1S1NJZ0x6NDhjR0YwYUNCa1BTSk5NekU1TGpJNE1pQXlOamt1TURnM1F6TXhPUzQ0TWpRZ01qWTVMakUzTXlBek1qQXVNekU1SURJMk9DNDJOakVnTXpJd0xqRTROaUF5TmpndU1UVTBURE14TkM0eU9USWdNalExTGpjM1F6TXhOQzR4TlRFZ01qUTFMakl6TmlBek1UTXVORE14SURJME5TNHhNak1nTXpFekxqQXpNU0F5TkRVdU5UY3lUREk1Tmk0eU5qRWdNalkwTGpNNE5rTXlPVFV1T0RnZ01qWTBMamd4TWlBeU9UWXVNRGMySURJMk5TNDBNek1nTWprMkxqWXhPQ0F5TmpVdU5URTRURE13TVM0NE5qUWdNalkyTGpNME5FTXpNREl1TWpVNUlESTJOaTQwTURjZ016QXlMalE1TnlBeU5qWXVOemN4SURNd01pNHpPVFVnTWpZM0xqRTFPRXd5T1RndU5qQXlJREk0TVM0MU1qWkRNams0TGpVZ01qZ3hMamt4TXlBeU9UZ3VOek0zSURJNE1pNHlOemNnTWprNUxqRXpNeUF5T0RJdU16TTVURE13T0M0ME5ERWdNamd6TGpnd05VTXpNRGd1T0RNM0lESTRNeTQ0TmpjZ016QTVMakkwSURJNE15NDJNRFFnTXpBNUxqTTBNeUF5T0RNdU1qRTNURE14TXk0eE16WWdNalk0TGpnME9VTXpNVE11TWpNNElESTJPQzQwTmpJZ016RXpMalkwTVNBeU5qZ3VNVGs1SURNeE5DNHdNemNnTWpZNExqSTJNVXd6TVRrdU1qZ3lJREkyT1M0d09EZGFJaUJtYVd4c1BTSmliR0ZqYXlJZ1ptbHNiQzF2Y0dGamFYUjVQU0l3TGpVaUlDOCtQSEJoZEdnZ1pEMGlUVE13TXk0eE9EUWdNek13TGpBMk1rTXpNRE11TnpJMklETXpNQzR4TkRnZ016QTBMakl5TVNBek1qa3VOak0ySURNd05DNHdPRGdnTXpJNUxqRXlPRXd5T1RndU1UazBJRE13Tmk0M05EVkRNams0TGpBMU15QXpNRFl1TWpFeElESTVOeTR6TXpNZ016QTJMakE1T0NBeU9UWXVPVE16SURNd05pNDFORGRNTWpnd0xqRTJNeUF6TWpVdU16WXhRekkzT1M0M09ESWdNekkxTGpjNE55QXlOemt1T1RjNUlETXlOaTQwTURnZ01qZ3dMalV5SURNeU5pNDBPVE5NTWpnMUxqYzJOaUF6TWpjdU16RTVRekk0Tmk0eE5qRWdNekkzTGpNNE1pQXlPRFl1TXprNUlETXlOeTQzTkRZZ01qZzJMakk1TnlBek1qZ3VNVE16VERJNE1pNDFNRFFnTXpReUxqVXdNVU15T0RJdU5EQXlJRE0wTWk0NE9EZ2dNamd5TGpZek9TQXpORE11TWpVeUlESTRNeTR3TXpVZ016UXpMak14TkV3eU9USXVNelEwSURNME5DNDNPRU15T1RJdU56TTVJRE0wTkM0NE5ESWdNamt6TGpFME1pQXpORFF1TlRjNUlESTVNeTR5TkRVZ016UTBMakU1TWt3eU9UY3VNRE00SURNeU9TNDRNalJETWprM0xqRTBJRE15T1M0ME16Y2dNamszTGpVME15QXpNamt1TVRjMElESTVOeTQ1TXprZ016STVMakl6Tmt3ek1ETXVNVGcwSURNek1DNHdOakphSWlCbWFXeHNQU0ppYkdGamF5SWdabWxzYkMxdmNHRmphWFI1UFNJd0xqVWlJQzgrUEhCaGRHZ2djM1J5YjJ0bFBTSjFjbXdvSTIxaGFXNHBJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqWWlJSE4wY205clpTMXNhVzVsWTJGd1BTSnliM1Z1WkNJZ2MzUnliMnRsTFd4cGJtVnFiMmx1UFNKeWIzVnVaQ0lnWkQwaVRUSTVNQzR4TURrZ05EWXpMalF4T0VNeU9USXVNelU0SURRMU5DNDVNRElnTXpBeExqSXpNeUEwTkRrdU1URWdNekE1TGprek15QTBOVEF1TkRoTU56Y3hMakEzSURVeU15NHdPVFpETnpjNUxqYzNJRFV5TkM0ME5qY2dOemcxSURVek1pNDBPQ0EzT0RJdU56VXlJRFUwTUM0NU9UWk1Oamt5TGpBNE5pQTRPRFF1TkRFNFRERTVPUzQwTkRNZ09EQTJMamcwVERJNU1DNHhNRGtnTkRZekxqUXhPRm9pSUdacGJHdzlJbUpzWVdOcklpQm1hV3hzTFc5d1lXTnBkSGs5SWpBdU1UUWlJQzgrUEhCaGRHZ2dabWxzYkMxeWRXeGxQU0psZG1WdWIyUmtJaUJqYkdsd0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOMGNtOXJaVDBpZFhKc0tDTnRZV2x1S1NJZ2MzUnliMnRsTFhkcFpIUm9QU0kySWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlHUTlJazAzT0RjdU5UZzVJREl6Tnk0ek5EbE1ORFl3TGpNMU5DQXhPRFV1T0RFNFREUXdOaTR6TWpVZ016a3dMalEyT1VNME1ETXVPRGN5SURNNU9TNDNOVGtnTkRBNUxqVTNPQ0EwTURndU5UQXhJRFF4T1M0d05qa2dOREE1TGprNU5rdzNNVEV1T1RNMElEUTFOaTR4TVRSRE56SXhMalF5TlNBME5UY3VOakE1SURjek1TNHhNRGNnTkRVeExqSTVJRGN6TXk0MU5pQTBOREpNTnpnM0xqVTRPU0F5TXpjdU16UTVXazAyTmpBdU1qWTVJREkwTlM0d01VTTJOVFV1TlRJeklESTBOQzR5TmpNZ05qVXdMalk0TWlBeU5EY3VOREl6SURZME9TNDBOVFlnTWpVeUxqQTJPRXcyTURjdU16ZzJJRFF4TVM0ME1UaEROakEyTGpFMklEUXhOaTR3TmpNZ05qQTVMakF4TXlBME1qQXVORE0wSURZeE15NDNOVGtnTkRJeExqRTRNVXcyT0RJdU5EazVJRFF6TWk0d01EWkROamczTGpJME5TQTBNekl1TnpVeklEWTVNaTR3T0RZZ05ESTVMalU1TkNBMk9UTXVNekV5SURReU5DNDVORGxNTnpNMUxqTTRNaUF5TmpVdU5UazVRemN6Tmk0Mk1EZ2dNall3TGprMU5DQTNNek11TnpVMUlESTFOaTQxT0RNZ056STVMakF4SURJMU5TNDRNelZNTmpZd0xqSTJPU0F5TkRVdU1ERmFJaUJtYVd4c1BTSjFjbXdvSTIxaGFXNHBJaUF2UGp4d1lYUm9JR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnWTJ4cGNDMXlkV3hsUFNKbGRtVnViMlJrSWlCa1BTSk5PRFkwTGpZME15QXlPRE11T1RNM1F6ZzJOUzR4T0RZZ01qZ3pMall3TlNBNE5qVXVOekE0SURJNE5DNHlOVGNnT0RZMUxqSXpPU0F5T0RRdU5qZ3pURGcwTkM0eU5qZ2dNekF6TGpjeE9VTTRORE11T1RNNElETXdOQzR3TVRnZ09EUTBMakE1TXlBek1EUXVOVEUzSURnME5DNDFNallnTXpBMExqVTBPRXc0TlRNdU56STJJRE13TlM0eU1EZERPRFUwTGpFNE5DQXpNRFV1TWpRZ09EVTBMak15TVNBek1EVXVOemczSURnMU15NDVORElnTXpBMkxqQTNNVXc0TXpNdU9EZzBJRE15TVM0eE1USkRPRE16TGpVd05pQXpNakV1TXprMklEZ3pNeTQyTkRNZ016SXhMamswTXlBNE16UXVNVEF4SURNeU1TNDVOelpNT0RRMExqQXdOeUF6TWpJdU5qZzFRemcwTkM0ME9URWdNekl5TGpjeUlEZzBOQzQyTURVZ016SXpMak14T1NBNE5EUXVNVGMzSURNeU15NDFPRXczT1RjdU56VXlJRE0xTVM0NU5UUkROemszTGpJd09TQXpOVEl1TWpnMklEYzVOaTQyT0RjZ016VXhMall6TkNBM09UY3VNVFUySURNMU1TNHlNRGxNT0RFNExqUXdNeUF6TXpFdU9USXlRemd4T0M0M016TWdNek14TGpZeU1pQTRNVGd1TlRjM0lETXpNUzR4TWpNZ09ERTRMakUwTlNBek16RXVNRGt5VERnd09DNDNORGdnTXpNd0xqUXlRemd3T0M0eU9USWdNek13TGpNNE55QTRNRGd1TVRVMElETXlPUzQ0TkRNZ09EQTRMalV5T1NBek1qa3VOVFU0VERneU9DNHdOVFFnTXpFMExqYzBORU00TWpndU5ETWdNekUwTGpRMU9TQTRNamd1TWpreElETXhNeTQ1TVRVZ09ESTNMamd6TlNBek1UTXVPRGd5VERneE9DNHpPRGtnTXpFekxqSXdOa000TVRjdU9UQTBJRE14TXk0eE56RWdPREUzTGpjNUlETXhNaTQxTnpJZ09ERTRMakl4T0NBek1USXVNekV4VERnMk5DNDJORE1nTWpnekxqa3pOMW9pSUdacGJHdzlJbmRvYVhSbElpQXZQanhuSUhSeVlXNXpabTl5YlQwaWJXRjBjbWw0S0RBdU9UZzNPREkzSURBdU1UVTFOVFUzSUMwd0xqSTFOVEkyTVNBd0xqazJOamczTWlBeU5UQWdOek0xS1NJK1BIUmxlSFFnWm05dWRDMW1ZVzFwYkhrOUlrbHVkR1Z5TENCellXNXpMWE5sY21sbUlpQm1iMjUwTFhkbGFXZG9kRDBpWW05c1pDSWdabTl1ZEMxemFYcGxQU0kwTWlJZ1ptbHNiRDBpSTBVMVJUZEdPQ0krUm05MWJtUnllU0JVWlhOMElFRndjRHd2ZEdWNGRENDhkR1Y0ZENCbWIyNTBMV1poYldsc2VUMGlTVzUwWlhJc0lITmhibk10YzJWeWFXWWlJR1p2Ym5RdGQyVnBaMmgwUFNKdWIzSnRZV3dpSUhrOUlqUXdJaUJtYjI1MExYTnBlbVU5SWpJeUlpQm1hV3hzUFNJak4wWTRNVGt5SWo1bWIzVnVaSEo1TG1WMGFEd3ZkR1Y0ZEQ0OEwyYytQR2x0WVdkbElIZHBaSFJvUFNJeE5qY2lJR2hsYVdkb2REMGlNVFkzSWlCMGNtRnVjMlp2Y20wOUltMWhkSEpwZUNnd0xqazROemd5TnlBd0xqRTFOVFUxTnlBdE1DNHlOVFV5TmpFZ01DNDVOalk0TnpJZ05EUTBMakV4TnlBMU1qUXVNVGNwSWlCb2NtVm1QU0prWVhSaE9tbHRZV2RsTDNOMlp5dDRiV3c3WW1GelpUWTBMRkJJVGpKYWVVSnRZVmQ0YzFCVFNuVmlNalZzU1dsQ2IxcFhiRzVoU0ZFNVNXcEpNVTFFUVdsSlNHUndXa2hTYjFCVFNYbE5WR2Q2U1dsQ05HSlhlSFZqZWpCcFlVaFNNR05FYjNaTU0yUXpaSGsxTTAxNU5YWmpiV04yVFdwQmQwMURPWHBrYldOcFNVaGFjRnBZWkVOaU0yYzVTV3BCWjAxRFFYaE5hbEZuVFZSUmVFeHFWWHBOVkdzMVQxUnJOVTlVYXpWUFZHczBTV28wT0dOSFJqQmhRMEpyVUZOS1RrMVVRWFZOZW1kNlNVUkZlVTVwTkRSUFZGSk5UVU5CZDJKRVJYbE9RMEYxVFdwVk1VeFVSWGRNYW1zelQxTkJlRTFxV1hWT2FrMDFURlJWZDB4cVZURk5lVUY0VGtNME1rMTZhRFpKYVVKdFlWZDRjMUJUU1dwYVZFMHdXbXBKTWtscE9DdFFTRUpvWkVkbloxcEVNR2xVVkZsNVRHcFJNazlEUVhoTmFtdDFUV3BqTTFacVJYbE1ha0UwVGxkM01VMVROSGRPYWxGMVRWUmpkRTlUTkhoTlJGbG5UVlJCTUV4cVp6Rk5XRzlwU1VkYWNHSkhkemxKYVU1c1dtcFpNVTF0UldsTWVqUTRZMGRHTUdGRFFtdFFVMHBPVDFScmRVNUVhMmRPUkVWMVRYcFplV0pFUlhWT1JGRXlURlJGTVV4cVVUVlRSRWw1VEdwTk5FMHlkekJNYWswd1NVUlJNMHhxVVRWaFJGVXdUR3BKZUUwd2R6TlBRelEwVFZOQk5VMTVOREpOVkdSelRGUkZNMHhxVFRKTmFVRXdUR3BaTkV4VVJUTk1hbGw0VG5rd01VeHFSWGRPYVRCMVQxUk5Na3hVUlhsTWFrRTBUbFZuZVU1NU5IcE5WR3h6VFdrMGVFMXFaMmROYWxGMVRtcG5lRWxFVFhsSlJHZDFUMVJOTWtsRVRYbE1ha2t4VGxNd05FeHFhM3BPYVVFd1RHcE5NRXhVVVRSTWFrVXpVMFJSZUV4cVJYZE9NSGQ2VDFNME1FOVRRVEJOVXpSNlRtcEtOa2xwUW0xaFYzaHpVRk5KYWxwdFdtMUphVGdyVUVNNWVtUnRZeXNpSUM4K1BHUmxabk0rUEdacGJIUmxjaUJwWkQwaVpHbHphMlYwZEdVdGMyaGhaRzkzSWlCNFBTSTNNQzQzTkRnNUlpQjVQU0l4T1RVdU56RXlJaUIzYVdSMGFEMGlPVFUxTGpjek15SWdhR1ZwWjJoMFBTSTRNekl1TlRVNElpQm1hV3gwWlhKVmJtbDBjejBpZFhObGNsTndZV05sVDI1VmMyVWlJR052Ykc5eUxXbHVkR1Z5Y0c5c1lYUnBiMjR0Wm1sc2RHVnljejBpYzFKSFFpSStQR1psUm14dmIyUWdabXh2YjJRdGIzQmhZMmwwZVQwaU1DSWdMejQ4Wm1WQ2JHVnVaQ0JwYmowaVUyOTFjbU5sUjNKaGNHaHBZeUlnTHo0OFptVkhZWFZ6YzJsaGJrSnNkWElnYzNSa1JHVjJhV0YwYVc5dVBTSTBNaUlnTHo0OEwyWnBiSFJsY2o0OGJHbHVaV0Z5UjNKaFpHbGxiblFnYVdROUltSmhZMnRuY205MWJtUWlJSGd4UFNJMU16SXVOU0lnZVRFOUlqQWlJSGd5UFNJMU16SXVOU0lnZVRJOUlqRXdOalVpSUdkeVlXUnBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElqNDhjM1J2Y0NBdlBqeHpkRzl3SUc5bVpuTmxkRDBpTVNJZ2MzUnZjQzFqYjJ4dmNqMGlJekV6TVRNeE15SWdMejQ4TDJ4cGJtVmhja2R5WVdScFpXNTBQanh5WVdScFlXeEhjbUZrYVdWdWRDQnBaRDBpWW1GamEyZHliM1Z1WkMxeVlXUnBZV3dpSUdONFBTSXdJaUJqZVQwaU1DSWdjajBpTVNJZ1ozSmhaR2xsYm5SVmJtbDBjejBpZFhObGNsTndZV05sVDI1VmMyVWlJR2R5WVdScFpXNTBWSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTlRNeUxqVWdOVE15TGpVcElISnZkR0YwWlNnNE9TNDVOakVwSUhOallXeGxLRGN6TlNraVBqeHpkRzl3SUhOMGIzQXRZMjlzYjNJOUlpTXhNak0wTlRZaUlDOCtQSE4wYjNBZ2IyWm1jMlYwUFNJeElpQnpkRzl3TFdOdmJHOXlQU0lqTVRJek5EVTJJaUJ6ZEc5d0xXOXdZV05wZEhrOUlqQWlJQzgrUEM5eVlXUnBZV3hIY21Ga2FXVnVkRDQ4YkdsdVpXRnlSM0poWkdsbGJuUWdhV1E5SW1ScGMydGxkSFJsTFdkeVlXUnBaVzUwSWlCNE1UMGlPVEkxTGpZeU5pSWdlVEU5SWpJMU5pNDRPVFlpSUhneVBTSXhNell1TnpjNUlpQjVNajBpT0RBd0xqSXdNeUlnWjNKaFpHbGxiblJWYm1sMGN6MGlkWE5sY2xOd1lXTmxUMjVWYzJVaVBqeHpkRzl3SUhOMGIzQXRZMjlzYjNJOUlpTXhNak0wTlRZaUlDOCtQSE4wYjNBZ2IyWm1jMlYwUFNJeElpQnpkRzl3TFdOdmJHOXlQU0lqTWtNek1UTkdJaUF2UGp3dmJHbHVaV0Z5UjNKaFpHbGxiblErUEd4cGJtVmhja2R5WVdScFpXNTBJR2xrUFNKdFlXbHVJajQ4YzNSdmNDQnpkRzl3TFdOdmJHOXlQU0lqTVRJek5EVTJJaUF2UGp3dmJHbHVaV0Z5UjNKaFpHbGxiblErUEM5a1pXWnpQand2YzNablBnPT0iLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJFTlMiLCAidmFsdWUiOiJmb3VuZHJ5LmV0aCJ9LHsidHJhaXRfdHlwZSI6ICJDb21taXQgSGFzaCIsICJ2YWx1ZSI6ImFmZmYzZjYifSx7InRyYWl0X3R5cGUiOiAiUmVwb3NpdG9yeSIsICJ2YWx1ZSI6Imh0dHBzOi8vZ2l0aHViLmNvbS9mbGVla3h5ei9ub24tZnVuZ2libGUtYXBwcyJ9LHsidHJhaXRfdHlwZSI6ICJWZXJzaW9uIiwgInZhbHVlIjoiMCJ9LHsidHJhaXRfdHlwZSI6ICJDb2xvciIsICJ2YWx1ZSI6IiMxMjM0NTYifV19"
        );
    }

    function test_tokenURIAfterUpdate() public {
        CuT.setTokenName(tokenId, "New App Name");
        CuT.setTokenDescription(tokenId, "New description for the app.");
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");
        CuT.setTokenENS(tokenId, "new-ens.eth");
        CuT.setTokenBuild(tokenId, "ce1a3fc141e29f8e1d00a654e156c4982d7711bf", "https://github.com/other/repo");
        CuT.setTokenLogoAndColor(tokenId, TestConstants.LOGO_1, 0x654321);

        string memory uri = CuT.tokenURI(tokenId);
        assertEq(
            uri,
            "data:application/json;base64,eyJuYW1lIjoiTmV3IEFwcCBOYW1lIiwiZGVzY3JpcHRpb24iOiJOZXcgZGVzY3JpcHRpb24gZm9yIHRoZSBhcHAuIiwib3duZXIiOiIweDM0YTFkM2ZmZjM5NTg4NDNjNDNhZDgwZjMwYjk0YzUxMDY0NWMzMTYiLCJleHRlcm5hbF91cmwiOiJodHRwczovL25ldy11cmwuY29tIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVEEyTlNJZ2FHVnBaMmgwUFNJeE1EWTFJaUIyYVdWM1FtOTRQU0l3SURBZ01UQTJOU0F4TURZMUlpQm1hV3hzUFNKdWIyNWxJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGh0Ykc1ek9uaHNhVzVyUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMM2hzYVc1cklqNDhjM1I1YkdVZ2RIbHdaVDBpZEdWNGRDOWpjM01pUGtCcGJYQnZjblFnZFhKc0tDSm9kSFJ3Y3pvdkwyWnZiblJ6TG1kdmIyZHNaV0Z3YVhNdVkyOXRMMk56Y3pJL1ptRnRhV3g1UFVsdWRHVnlPbmRuYUhSQU5UQXdPell3TUNJcE96d3ZjM1I1YkdVK1BISmxZM1FnZDJsa2RHZzlJakV3TmpVaUlHaGxhV2RvZEQwaU1UQTJOU0lnWm1sc2JEMGlkWEpzS0NOaVlXTnJaM0p2ZFc1a0tTSWdMejQ4Y21WamRDQnZjR0ZqYVhSNVBTSXdMaklpSUhkcFpIUm9QU0l4TURZMUlpQm9aV2xuYUhROUlqRXdOalVpSUdacGJHdzlJblZ5YkNnalltRmphMmR5YjNWdVpDMXlZV1JwWVd3cElpQXZQanhuSUdacGJIUmxjajBpZFhKc0tDTmthWE5yWlhSMFpTMXphR0ZrYjNjcElqNDhjR0YwYUNCa1BTSk5PRFUzTGpJek1TQXlOemt1TnpFeVREa3dNaTR5TkNBeU9EWXVOamMxUXpreE1DNDFORGNnTWpnM0xqazJJRGt4Tnk0NU1UVWdNamt5TGpjeU1TQTVNakl1TlNBeU9Ua3VOelk0VERrek9DNDRPVFFnTXpJMExqazJORU01TkRJdU1qUTVJRE16TUM0eE1pQTVORE11TXpFeElETXpOaTQwTXpjZ09UUXhMamd5TnlBek5ESXVOREEyVERrek55NDNPVGdnTXpVNExqWXhOVXc1TWpRdU1EUTVJRE0xTmk0Mk5VdzVNVGt1TkRFMklETTNOQzR3T0RSTU9UTTBMakEyT0NBek56WXVNalJNTnpreExqazBOeUE1TWpJdU1UVXlRemM0T0M0eE1Ea2dPVE0yTGpnNU5pQTNOek11TmprMElEazBOaTR6TURnZ056VTRMalkxTVNBNU5ETXVPRGt6VERFM09TNDJNellnT0RVd0xqa3lPRU14TmpJdU16RTRJRGcwT0M0eE5EY2dNVFV4TGpJeE5TQTRNekF1T1RnM0lERTFOUzQzTnpZZ09ERTBMakExTVV3eE5qQXVORGM0SURjNU5pNDFPVXczTURRdU16RTFJRGczT1M0MU56Uk1PRFUzTGpJek1TQXlOemt1TnpFeVdpSWdabWxzYkQwaUl6QTFNRFV3TlNJZ0x6NDhMMmMrUEhCaGRHZ2daRDBpVFRnME1DNHlNekVnTWpRd0xqY3hNa3c0T0RVdU1qUWdNalEzTGpZM05VTTRPVE11TlRRM0lESTBPQzQ1TmpFZ09UQXdMamt4TlNBeU5UTXVOekl5SURrd05TNDFJREkyTUM0M05qaE1PVEl4TGpnNU5DQXlPRFV1T1RZMVF6a3lOUzR5TkRrZ01qa3hMakV5SURreU5pNHpNVEVnTWprM0xqUXpOeUE1TWpRdU9ESTNJRE13TXk0ME1EWk1PVEl3TGpjNU9DQXpNVGt1TmpFMlREa3dOeTR3TkRrZ016RTNMalkxVERrd01pNDBNVFlnTXpNMUxqQTRORXc1TVRjdU1EWTRJRE16Tnk0eU5ERk1OemMwTGprME55QTRPRE11TVRVeVF6YzNNUzR4TURrZ09EazNMamc1TmlBM05UWXVOamswSURrd055NHpNRGdnTnpReExqWTFNU0E1TURRdU9Ea3pUREUyTWk0Mk16WWdPREV4TGpreU9FTXhORFV1TXpFNElEZ3dPUzR4TkRjZ01UTTBMakl4TlNBM09URXVPVGczSURFek9DNDNOellnTnpjMUxqQTFNVXd4TkRNdU5EYzRJRGMxTnk0MU9VdzJPRGN1TXpFMUlEZzBNQzQxTnpSTU9EUXdMakl6TVNBeU5EQXVOekV5V2lJZ1ptbHNiRDBpZFhKc0tDTnRZV2x1S1NJZ0x6NDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRNeE9TNDRORGNnTVRZeExqVXdNa016TVRBdU16VTJJREUyTUM0d01EY2dNekF3TGpZM05DQXhOall1TXpJMklESTVPQzR5TWpFZ01UYzFMall4Tmt3eE16Z3VOekkwSURjM09TNDNOVGhETVRNMkxqSTNNU0EzT0RrdU1EUTRJREUwTVM0NU56Y2dOemszTGpjNUlERTFNUzQwTmpnZ056azVMakk0TlV3M05EQXVNRFl4SURnNU1TNDVOek5ETnpRNUxqVTFNeUE0T1RNdU5EWTNJRGMxT1M0eU16VWdPRGczTGpFME9DQTNOakV1TmpnM0lEZzNOeTQ0TlRoTU9UQXlMalF3TlNBek5EUXVPRFUwVERnNE9TNHhOVGdnTXpReUxqYzJPRXc0T1RndU9EY3lJRE13TlM0NU56Sk1PVEV5TGpFeE9TQXpNRGd1TURVNVREa3hNeTQzTXpNZ016QXhMamswTmtNNU1UUXVPRE0zSURJNU55NDNOaklnT1RFMExqTXdPU0F5T1RNdU5EYzJJRGt4TWk0eU5URWdNamc1TGpreU4wdzRPVE11TkRnMElESTFOeTQxTmpsRE9Ea3hMakUxTXlBeU5UTXVOVFE1SURnNE55NHdOak1nTWpVd0xqZ3lNeUE0T0RJdU1qSXhJREkxTUM0d05qRk1PREk0TGpJd05TQXlOREV1TlRVMFF6Z3lNaTR5TWpRZ01qUXdMall4TXlBNE1UVXVPRFk1SURJME1pNDNPRE1nT0RFeExqUXlOeUF5TkRjdU1qZzBURGd3TlM0Mk9EWWdNalV6TGpFd00wTTRNRFF1TWpBMUlESTFOQzQyTURNZ09EQXlMakE0TnlBeU5UVXVNekkySURnd01DNHdPVE1nTWpVMUxqQXhNMHczT0RNdU5qRXhJREkxTWk0ME1UZE1Oek0wTGpNZ05ETTVMakU1TmtNM016RXVORE01SURRMU1DNHdNelVnTnpJd0xqRTBNeUEwTlRjdU5EQTNJRGN3T1M0d055QTBOVFV1TmpZelRETXlPQzQ0TkRjZ016azFMamM0T0VNek1UY3VOemMwSURNNU5DNHdORFVnTXpFeExqRXhOeUF6T0RNdU9EUTFJRE14TXk0NU56Z2dNemN6TGpBd04wd3pOall1TlRJNElERTNNeTQ1TmpKTU16WTJMalV6TXlBeE56TXVPVFF4UXpNMk55NHlNelFnTVRjeExqSTBJRE0yTlM0MU56SWdNVFk0TGpjd01pQXpOakl1T0RFZ01UWTRMakkyTjB3ek1Ua3VPRFEzSURFMk1TNDFNREphVFRNMk9TNHpPVElnTVRjMExqUXhORXd6TmpndU5qVXlJREUzTnk0eU1UZE1NekUyTGpnME15QXpOek11TkRVNFF6TXhOQzR6T1NBek9ESXVOelE0SURNeU1DNHdPVFlnTXpreExqUTVJRE15T1M0MU9EY2dNemt5TGprNE5VdzNNRGt1T0RFZ05EVXlMamcyUXpjeE9TNHpNREVnTkRVMExqTTFOQ0EzTWpndU9UZ3pJRFEwT0M0d016VWdOek14TGpRek5pQTBNemd1TnpRMVREYzRNQzQzTkRjZ01qVXhMamsyTmt3M09ETXVNalExSURJME1pNDFNRFJNTnpnekxqazROU0F5TXprdU56QXhURE0yT1M0ek9USWdNVGMwTGpReE5Gb2lJR1pwYkd3OUlpTXhNekV6TVRZaUlDOCtQSEJoZEdnZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lpQmpiR2x3TFhKMWJHVTlJbVYyWlc1dlpHUWlJSE4wY205clpUMGlkWEpzS0NOdFlXbHVLU0lnYzNSeWIydGxMWGRwWkhSb1BTSTBJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUdROUlrMHpNVGt1T0RRM0lERTJNUzQxTURKRE16RXdMak0xTmlBeE5qQXVNREEzSURNd01DNDJOelFnTVRZMkxqTXlOaUF5T1RndU1qSXhJREUzTlM0Mk1UWk1NVE00TGpjeU5DQTNOemt1TnpVNFF6RXpOaTR5TnpFZ056ZzVMakEwT0NBeE5ERXVPVGMzSURjNU55NDNPU0F4TlRFdU5EWTRJRGM1T1M0eU9EVk1OelF3TGpBMk1TQTRPVEV1T1RjelF6YzBPUzQxTlRNZ09Ea3pMalEyTnlBM05Ua3VNak0xSURnNE55NHhORGdnTnpZeExqWTROeUE0TnpjdU9EVTRURGt3TWk0ME1EVWdNelEwTGpnMU5FdzRPRGt1TVRVNElETTBNaTQzTmpoTU9EazRMamczTWlBek1EVXVPVGN5VERreE1pNHhNVGtnTXpBNExqQTFPVXc1TVRNdU56TXpJRE13TVM0NU5EWkRPVEUwTGpnek55QXlPVGN1TnpZeUlEa3hOQzR6TURrZ01qa3pMalEzTmlBNU1USXVNalV4SURJNE9TNDVNamRNT0RrekxqUTROQ0F5TlRjdU5UWTVRemc1TVM0eE5UTWdNalV6TGpVME9TQTRPRGN1TURZeklESTFNQzQ0TWpNZ09EZ3lMakl5TVNBeU5UQXVNRFl4VERneU9DNHlNRFVnTWpReExqVTFORU00TWpJdU1qSTBJREkwTUM0Mk1UTWdPREUxTGpnMk9TQXlOREl1TnpneklEZ3hNUzQwTWpjZ01qUTNMakk0TkV3NE1EVXVOamcySURJMU15NHhNRE5ET0RBMExqSXdOU0F5TlRRdU5qQXpJRGd3TWk0d09EY2dNalUxTGpNeU5pQTRNREF1TURreklESTFOUzR3TVROTU56Z3pMall4TVNBeU5USXVOREUzVERjek5DNHpJRFF6T1M0eE9UWkROek14TGpRek9TQTBOVEF1TURNMUlEY3lNQzR4TkRNZ05EVTNMalF3TnlBM01Ea3VNRGNnTkRVMUxqWTJNMHd6TWpndU9EUTNJRE01TlM0M09EaERNekUzTGpjM05DQXpPVFF1TURRMUlETXhNUzR4TVRjZ016Z3pMamcwTlNBek1UTXVPVGM0SURNM015NHdNRGRNTXpZMkxqVXlPQ0F4TnpNdU9UWXlURE0yTmk0MU16TWdNVGN6TGprME1VTXpOamN1TWpNMElERTNNUzR5TkNBek5qVXVOVGN5SURFMk9DNDNNRElnTXpZeUxqZ3hJREUyT0M0eU5qZE1NekU1TGpnME55QXhOakV1TlRBeVdrMHpOamt1TXpreUlERTNOQzQwTVRSTU16WTRMalkxTWlBeE56Y3VNakUzVERNeE5pNDRORE1nTXpjekxqUTFPRU16TVRRdU16a2dNemd5TGpjME9DQXpNakF1TURrMklETTVNUzQwT1NBek1qa3VOVGczSURNNU1pNDVPRFZNTnpBNUxqZ3hJRFExTWk0NE5rTTNNVGt1TXpBeElEUTFOQzR6TlRRZ056STRMams0TXlBME5EZ3VNRE0xSURjek1TNDBNellnTkRNNExqYzBOVXczT0RBdU56UTNJREkxTVM0NU5qWk1Oemd6TGpJME5TQXlOREl1TlRBMFREYzRNeTQ1T0RVZ01qTTVMamN3TVV3ek5qa3VNemt5SURFM05DNDBNVFJhSWlCbWFXeHNQU0oxY213b0kyUnBjMnRsZEhSbExXZHlZV1JwWlc1MEtTSWdabWxzYkMxdmNHRmphWFI1UFNJd0xqSWlJQzgrUEhCaGRHZ2daRDBpVFRNek5TNHpPQ0F5TURndU1URXpRek16TlM0NU1qSWdNakE0TGpFNU9DQXpNell1TkRFM0lESXdOeTQyT0RZZ016TTJMakk0TXlBeU1EY3VNVGM1VERNek1DNHpPU0F4T0RRdU56azFRek16TUM0eU5Ea2dNVGcwTGpJMk1TQXpNamt1TlRJNUlERTROQzR4TkRnZ016STVMakV5T1NBeE9EUXVOVGszVERNeE1pNHpOVGdnTWpBekxqUXhNVU16TVRFdU9UYzRJREl3TXk0NE16Z2dNekV5TGpFM05DQXlNRFF1TkRVNElETXhNaTQzTVRZZ01qQTBMalUwTkV3ek1UY3VPVFl5SURJd05TNHpOME16TVRndU16VTNJREl3TlM0ME16SWdNekU0TGpVNU5TQXlNRFV1TnprMklETXhPQzQwT1RNZ01qQTJMakU0TTB3ek1UUXVOeUF5TWpBdU5UVXhRek14TkM0MU9UY2dNakl3TGprek9DQXpNVFF1T0RNMUlESXlNUzR6TURJZ016RTFMakl6TVNBeU1qRXVNelkwVERNeU5DNDFNemtnTWpJeUxqZ3pRek15TkM0NU16VWdNakl5TGpnNU15QXpNalV1TXpNNElESXlNaTQyTWprZ016STFMalEwSURJeU1pNHlOREpNTXpJNUxqSXpNeUF5TURjdU9EYzFRek15T1M0ek16WWdNakEzTGpRNE9DQXpNamt1TnpNNUlESXdOeTR5TWpRZ016TXdMakV6TlNBeU1EY3VNamcyVERNek5TNHpPQ0F5TURndU1URXpXaUlnWm1sc2JEMGlkWEpzS0NOdFlXbHVLU0lnTHo0OGNHRjBhQ0JrUFNKTk16RTVMakk0TWlBeU5qa3VNRGczUXpNeE9TNDRNalFnTWpZNUxqRTNNeUF6TWpBdU16RTVJREkyT0M0Mk5qRWdNekl3TGpFNE5pQXlOamd1TVRVMFRETXhOQzR5T1RJZ01qUTFMamMzUXpNeE5DNHhOVEVnTWpRMUxqSXpOaUF6TVRNdU5ETXhJREkwTlM0eE1qTWdNekV6TGpBek1TQXlORFV1TlRjeVRESTVOaTR5TmpFZ01qWTBMak00TmtNeU9UVXVPRGdnTWpZMExqZ3hNaUF5T1RZdU1EYzJJREkyTlM0ME16TWdNamsyTGpZeE9DQXlOalV1TlRFNFRETXdNUzQ0TmpRZ01qWTJMak0wTkVNek1ESXVNalU1SURJMk5pNDBNRGNnTXpBeUxqUTVOeUF5TmpZdU56Y3hJRE13TWk0ek9UVWdNalkzTGpFMU9Fd3lPVGd1TmpBeUlESTRNUzQxTWpaRE1qazRMalVnTWpneExqa3hNeUF5T1RndU56TTNJREk0TWk0eU56Y2dNams1TGpFek15QXlPREl1TXpNNVRETXdPQzQwTkRFZ01qZ3pMamd3TlVNek1EZ3VPRE0zSURJNE15NDROamNnTXpBNUxqSTBJREk0TXk0Mk1EUWdNekE1TGpNME15QXlPRE11TWpFM1RETXhNeTR4TXpZZ01qWTRMamcwT1VNek1UTXVNak00SURJMk9DNDBOaklnTXpFekxqWTBNU0F5TmpndU1UazVJRE14TkM0d016Y2dNalk0TGpJMk1Vd3pNVGt1TWpneUlESTJPUzR3T0RkYUlpQm1hV3hzUFNKaWJHRmpheUlnWm1sc2JDMXZjR0ZqYVhSNVBTSXdMalVpSUM4K1BIQmhkR2dnWkQwaVRUTXdNeTR4T0RRZ016TXdMakEyTWtNek1ETXVOekkySURNek1DNHhORGdnTXpBMExqSXlNU0F6TWprdU5qTTJJRE13TkM0d09EZ2dNekk1TGpFeU9Fd3lPVGd1TVRrMElETXdOaTQzTkRWRE1qazRMakExTXlBek1EWXVNakV4SURJNU55NHpNek1nTXpBMkxqQTVPQ0F5T1RZdU9UTXpJRE13Tmk0MU5EZE1Namd3TGpFMk15QXpNalV1TXpZeFF6STNPUzQzT0RJZ016STFMamM0TnlBeU56a3VPVGM1SURNeU5pNDBNRGdnTWpnd0xqVXlJRE15Tmk0ME9UTk1NamcxTGpjMk5pQXpNamN1TXpFNVF6STROaTR4TmpFZ016STNMak00TWlBeU9EWXVNems1SURNeU55NDNORFlnTWpnMkxqSTVOeUF6TWpndU1UTXpUREk0TWk0MU1EUWdNelF5TGpVd01VTXlPREl1TkRBeUlETTBNaTQ0T0RnZ01qZ3lMall6T1NBek5ETXVNalV5SURJNE15NHdNelVnTXpRekxqTXhORXd5T1RJdU16UTBJRE0wTkM0M09FTXlPVEl1TnpNNUlETTBOQzQ0TkRJZ01qa3pMakUwTWlBek5EUXVOVGM1SURJNU15NHlORFVnTXpRMExqRTVNa3d5T1RjdU1ETTRJRE15T1M0NE1qUkRNamszTGpFMElETXlPUzQwTXpjZ01qazNMalUwTXlBek1qa3VNVGMwSURJNU55NDVNemtnTXpJNUxqSXpOa3d6TURNdU1UZzBJRE16TUM0d05qSmFJaUJtYVd4c1BTSmliR0ZqYXlJZ1ptbHNiQzF2Y0dGamFYUjVQU0l3TGpVaUlDOCtQSEJoZEdnZ2MzUnliMnRsUFNKMWNtd29JMjFoYVc0cElpQnpkSEp2YTJVdGQybGtkR2c5SWpZaUlITjBjbTlyWlMxc2FXNWxZMkZ3UFNKeWIzVnVaQ0lnYzNSeWIydGxMV3hwYm1WcWIybHVQU0p5YjNWdVpDSWdaRDBpVFRJNU1DNHhNRGtnTkRZekxqUXhPRU15T1RJdU16VTRJRFExTkM0NU1ESWdNekF4TGpJek15QTBORGt1TVRFZ016QTVMamt6TXlBME5UQXVORGhNTnpjeExqQTNJRFV5TXk0d09UWkROemM1TGpjM0lEVXlOQzQwTmpjZ056ZzFJRFV6TWk0ME9DQTNPREl1TnpVeUlEVTBNQzQ1T1RaTU5qa3lMakE0TmlBNE9EUXVOREU0VERFNU9TNDBORE1nT0RBMkxqZzBUREk1TUM0eE1Ea2dORFl6TGpReE9Gb2lJR1pwYkd3OUltSnNZV05ySWlCbWFXeHNMVzl3WVdOcGRIazlJakF1TVRRaUlDOCtQSEJoZEdnZ1ptbHNiQzF5ZFd4bFBTSmxkbVZ1YjJSa0lpQmpiR2x3TFhKMWJHVTlJbVYyWlc1dlpHUWlJSE4wY205clpUMGlkWEpzS0NOdFlXbHVLU0lnYzNSeWIydGxMWGRwWkhSb1BTSTJJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUdROUlrMDNPRGN1TlRnNUlESXpOeTR6TkRsTU5EWXdMak0xTkNBeE9EVXVPREU0VERRd05pNHpNalVnTXprd0xqUTJPVU0wTURNdU9EY3lJRE01T1M0M05Ua2dOREE1TGpVM09DQTBNRGd1TlRBeElEUXhPUzR3TmprZ05EQTVMams1Tmt3M01URXVPVE0wSURRMU5pNHhNVFJETnpJeExqUXlOU0EwTlRjdU5qQTVJRGN6TVM0eE1EY2dORFV4TGpJNUlEY3pNeTQxTmlBME5ESk1OemczTGpVNE9TQXlNemN1TXpRNVdrMDJOakF1TWpZNUlESTBOUzR3TVVNMk5UVXVOVEl6SURJME5DNHlOak1nTmpVd0xqWTRNaUF5TkRjdU5ESXpJRFkwT1M0ME5UWWdNalV5TGpBMk9FdzJNRGN1TXpnMklEUXhNUzQwTVRoRE5qQTJMakUySURReE5pNHdOak1nTmpBNUxqQXhNeUEwTWpBdU5ETTBJRFl4TXk0M05Ua2dOREl4TGpFNE1VdzJPREl1TkRrNUlEUXpNaTR3TURaRE5qZzNMakkwTlNBME16SXVOelV6SURZNU1pNHdPRFlnTkRJNUxqVTVOQ0EyT1RNdU16RXlJRFF5TkM0NU5EbE1Oek0xTGpNNE1pQXlOalV1TlRrNVF6Y3pOaTQyTURnZ01qWXdMamsxTkNBM016TXVOelUxSURJMU5pNDFPRE1nTnpJNUxqQXhJREkxTlM0NE16Vk1Oall3TGpJMk9TQXlORFV1TURGYUlpQm1hV3hzUFNKMWNtd29JMjFoYVc0cElpQXZQanh3WVhSb0lHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdZMnhwY0MxeWRXeGxQU0psZG1WdWIyUmtJaUJrUFNKTk9EWTBMalkwTXlBeU9ETXVPVE0zUXpnMk5TNHhPRFlnTWpnekxqWXdOU0E0TmpVdU56QTRJREk0TkM0eU5UY2dPRFkxTGpJek9TQXlPRFF1TmpnelREZzBOQzR5TmpnZ016QXpMamN4T1VNNE5ETXVPVE00SURNd05DNHdNVGdnT0RRMExqQTVNeUF6TURRdU5URTNJRGcwTkM0MU1qWWdNekEwTGpVME9FdzROVE11TnpJMklETXdOUzR5TURkRE9EVTBMakU0TkNBek1EVXVNalFnT0RVMExqTXlNU0F6TURVdU56ZzNJRGcxTXk0NU5ESWdNekEyTGpBM01VdzRNek11T0RnMElETXlNUzR4TVRKRE9ETXpMalV3TmlBek1qRXVNemsySURnek15NDJORE1nTXpJeExqazBNeUE0TXpRdU1UQXhJRE15TVM0NU56Wk1PRFEwTGpBd055QXpNakl1TmpnMVF6ZzBOQzQwT1RFZ016SXlMamN5SURnME5DNDJNRFVnTXpJekxqTXhPU0E0TkRRdU1UYzNJRE15TXk0MU9FdzNPVGN1TnpVeUlETTFNUzQ1TlRSRE56azNMakl3T1NBek5USXVNamcySURjNU5pNDJPRGNnTXpVeExqWXpOQ0EzT1RjdU1UVTJJRE0xTVM0eU1EbE1PREU0TGpRd015QXpNekV1T1RJeVF6Z3hPQzQzTXpNZ016TXhMall5TWlBNE1UZ3VOVGMzSURNek1TNHhNak1nT0RFNExqRTBOU0F6TXpFdU1Ea3lURGd3T0M0M05EZ2dNek13TGpReVF6Z3dPQzR5T1RJZ016TXdMak00TnlBNE1EZ3VNVFUwSURNeU9TNDRORE1nT0RBNExqVXlPU0F6TWprdU5UVTRURGd5T0M0d05UUWdNekUwTGpjME5FTTRNamd1TkRNZ016RTBMalExT1NBNE1qZ3VNamt4SURNeE15NDVNVFVnT0RJM0xqZ3pOU0F6TVRNdU9EZ3lURGd4T0M0ek9Ea2dNekV6TGpJd05rTTRNVGN1T1RBMElETXhNeTR4TnpFZ09ERTNMamM1SURNeE1pNDFOeklnT0RFNExqSXhPQ0F6TVRJdU16RXhURGcyTkM0Mk5ETWdNamd6TGprek4xb2lJR1pwYkd3OUluZG9hWFJsSWlBdlBqeG5JSFJ5WVc1elptOXliVDBpYldGMGNtbDRLREF1T1RnM09ESTNJREF1TVRVMU5UVTNJQzB3TGpJMU5USTJNU0F3TGprMk5qZzNNaUF5TlRBZ056TTFLU0krUEhSbGVIUWdabTl1ZEMxbVlXMXBiSGs5SWtsdWRHVnlMQ0J6WVc1ekxYTmxjbWxtSWlCbWIyNTBMWGRsYVdkb2REMGlZbTlzWkNJZ1ptOXVkQzF6YVhwbFBTSTBNaUlnWm1sc2JEMGlJMFUxUlRkR09DSStUbVYzSUVGd2NDQk9ZVzFsUEM5MFpYaDBQangwWlhoMElHWnZiblF0Wm1GdGFXeDVQU0pKYm5SbGNpd2djMkZ1Y3kxelpYSnBaaUlnWm05dWRDMTNaV2xuYUhROUltNXZjbTFoYkNJZ2VUMGlOREFpSUdadmJuUXRjMmw2WlQwaU1qSWlJR1pwYkd3OUlpTTNSamd4T1RJaVBtNWxkeTFsYm5NdVpYUm9QQzkwWlhoMFBqd3ZaejQ4YVcxaFoyVWdkMmxrZEdnOUlqRTJOeUlnYUdWcFoyaDBQU0l4TmpjaUlIUnlZVzV6Wm05eWJUMGliV0YwY21sNEtEQXVPVGczT0RJM0lEQXVNVFUxTlRVM0lDMHdMakkxTlRJMk1TQXdMamsyTmpnM01pQTBORFF1TVRFM0lEVXlOQzR4TnlraUlHaHlaV1k5SW1SaGRHRTZhVzFoWjJVdmMzWm5LM2h0YkR0aVlYTmxOalFzVUVoT01scDVRakphV0VwNllWYzVkVkJUU1hoTWFrVnBTVWhvZEdKSE5YcFFVMHB2WkVoU2QwOXBPSFprTTJRelRHNWpla3h0T1hsYWVUaDVUVVJCZDB3elRqSmFlVWxuWlVjeGMySnVUVFpsUjNod1ltMXpPVWx0YURCa1NFRTJUSGs1TTJRelkzVmtlazExWWpOS2JreDZSVFZQVkd0MlpVZDRjR0p0YzJsSlNHYzVTV3BDZDJWRFNXZGxWREJwVFVoQ05FbHBRakpoVjFZelVXMDVORkJUU1hkSlJFRm5UVlJCZDAxRFFYaE5SRUYzU1dsQ2JHSnRSbWxpUjFWMFdXMUdhbUV5WkhsaU0xWjFXa1F3YVdKdFZqTkpSRUZuVFVOQmVFMUVRWGRKUkVWM1RVUkJhVWxJYUhSaVJIQjZZMGRHYWxwVU1HbGpTRXBzWXpKV2VXUnRWV2xRWjI4NFdubzBPR05IUmpCaFEwSnJVRk5LVGs1VVFYZE1SRVYzVVhwSmVVOVROREJNUkVWM1RFUkZkMHhFU1hsUFV6UXdURVJGZDB4RVZYZE5SMDEzVEVSSk0wMUROREpNUkVsNFQxTTBNRXhFVVRWTlEzY3dUMVJCYzA1RWEzZFpla2t6VFVNME1reEVRWE5PUkd0M1RGUkplRTlUTkRCTVJGRTFUVU13TUU5VVFrUlBWR3QzVEVSSmVVOVROREJNUkdNelRVTTBNa3hFUlhkTVJGVjNUVU4zZUUxSWIyZFVWR2Q0VGxOM05FMVVWbXBNVkZGM1RHcHJjMDVFUVhWUFV6QTBUME0wTWt4RVkzcE1ha1YwVFZSUmVFeHFXWE5QVkZWMVRsZE5kRTVVVVhWUFUzZDVUWGswZVV4VVJYaE5lVFI1VEVSTk1VeFVSVE5OZVRRd1RFUk5NVmw1TURKTlF6UjVURVJCZEUxVVJUUk1hbFYwVFZSRmRVOURNSGhPZWsxMVRrTXdlazVWVFhsT2VrMTFUbWwzTkU5RVozTk5ha2t4VEdwcmMwOUVWVEZNYW10elRWUm5NVXhFWjNoT1dFMTBUbnBOZEU5RVozVk9hVEExVGxNME1VeFVSVEJOVXpReVdYa3dlVTE1TkhsTVZGVXdUR3ByZEUxNlZYUk5WRVY2VEdwSmRFMTZWWFJOVkdONlRHcFNhazFETURKTlF6UjVURVJGZUV4cVozUk5WRVUwVEdwVmMwMTZWWFJOVkdONlRHcFNhazFxU1hWT1F6QXhUWGwzTVU1RE5ESk1WRVYzVFVNME0weEVhekZNYWxWMFRWUlJlRXhxV25wUFJHZDFUbWt3TTAxNWQzaE9SRVYxVG1rd05VNVROREZaZWxVd1RHcHJkRTFxVFhWTmFYZDRUVlJOZFUxcE1IcE9VM2Q0VG5wTmRVNURNSHBPVjAweVRVTTBlVXhFUVhOTlZFVTBUR3BWYzAxVVJYVlBRM2Q0VG5wTmRVNURkM3BPVjAweFRYbDNlVTFwTkRCTVJFVjNUVU0wTTB4RVZUQk1hbGx6VFZSUmVFeHFXWE5QVkZWMVRsZE5NRTFETkRWTVJGRjNUR3ByYzA1NlRYTlBSR2QxVG1sM05VNVROREZNUkVVd1RWTTBNbGw2U1hwTWFrbHpUbFJSZFU5VGQzcE9VM2Q0VFZSTmRVMXBkM3BPVTNkNFRucE5kVTVIVFhkTVJGbDNUR3BKZEUxVVJYVlBRM2Q0VFZSbmRVNVRNSHBPVTNkNFRucE5kVTVGVFRSUFJHZHpUbnBKTWt4cVVYTlBSRlV4VEdwcmMwNTZZekJNYWtWelQwUkZNVXhFWjNoT1dHOXBUSG8wT0V3eVl5dERhbmQyWXpOYWJsQm5QVDBpSUM4K1BHUmxabk0rUEdacGJIUmxjaUJwWkQwaVpHbHphMlYwZEdVdGMyaGhaRzkzSWlCNFBTSTNNQzQzTkRnNUlpQjVQU0l4T1RVdU56RXlJaUIzYVdSMGFEMGlPVFUxTGpjek15SWdhR1ZwWjJoMFBTSTRNekl1TlRVNElpQm1hV3gwWlhKVmJtbDBjejBpZFhObGNsTndZV05sVDI1VmMyVWlJR052Ykc5eUxXbHVkR1Z5Y0c5c1lYUnBiMjR0Wm1sc2RHVnljejBpYzFKSFFpSStQR1psUm14dmIyUWdabXh2YjJRdGIzQmhZMmwwZVQwaU1DSWdMejQ4Wm1WQ2JHVnVaQ0JwYmowaVUyOTFjbU5sUjNKaGNHaHBZeUlnTHo0OFptVkhZWFZ6YzJsaGJrSnNkWElnYzNSa1JHVjJhV0YwYVc5dVBTSTBNaUlnTHo0OEwyWnBiSFJsY2o0OGJHbHVaV0Z5UjNKaFpHbGxiblFnYVdROUltSmhZMnRuY205MWJtUWlJSGd4UFNJMU16SXVOU0lnZVRFOUlqQWlJSGd5UFNJMU16SXVOU0lnZVRJOUlqRXdOalVpSUdkeVlXUnBaVzUwVlc1cGRITTlJblZ6WlhKVGNHRmpaVTl1VlhObElqNDhjM1J2Y0NBdlBqeHpkRzl3SUc5bVpuTmxkRDBpTVNJZ2MzUnZjQzFqYjJ4dmNqMGlJekV6TVRNeE15SWdMejQ4TDJ4cGJtVmhja2R5WVdScFpXNTBQanh5WVdScFlXeEhjbUZrYVdWdWRDQnBaRDBpWW1GamEyZHliM1Z1WkMxeVlXUnBZV3dpSUdONFBTSXdJaUJqZVQwaU1DSWdjajBpTVNJZ1ozSmhaR2xsYm5SVmJtbDBjejBpZFhObGNsTndZV05sVDI1VmMyVWlJR2R5WVdScFpXNTBWSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTlRNeUxqVWdOVE15TGpVcElISnZkR0YwWlNnNE9TNDVOakVwSUhOallXeGxLRGN6TlNraVBqeHpkRzl3SUhOMGIzQXRZMjlzYjNJOUlpTTJOVFF6TWpFaUlDOCtQSE4wYjNBZ2IyWm1jMlYwUFNJeElpQnpkRzl3TFdOdmJHOXlQU0lqTmpVME16SXhJaUJ6ZEc5d0xXOXdZV05wZEhrOUlqQWlJQzgrUEM5eVlXUnBZV3hIY21Ga2FXVnVkRDQ4YkdsdVpXRnlSM0poWkdsbGJuUWdhV1E5SW1ScGMydGxkSFJsTFdkeVlXUnBaVzUwSWlCNE1UMGlPVEkxTGpZeU5pSWdlVEU5SWpJMU5pNDRPVFlpSUhneVBTSXhNell1TnpjNUlpQjVNajBpT0RBd0xqSXdNeUlnWjNKaFpHbGxiblJWYm1sMGN6MGlkWE5sY2xOd1lXTmxUMjVWYzJVaVBqeHpkRzl3SUhOMGIzQXRZMjlzYjNJOUlpTTJOVFF6TWpFaUlDOCtQSE4wYjNBZ2IyWm1jMlYwUFNJeElpQnpkRzl3TFdOdmJHOXlQU0lqTWtNek1UTkdJaUF2UGp3dmJHbHVaV0Z5UjNKaFpHbGxiblErUEd4cGJtVmhja2R5WVdScFpXNTBJR2xrUFNKdFlXbHVJajQ4YzNSdmNDQnpkRzl3TFdOdmJHOXlQU0lqTmpVME16SXhJaUF2UGp3dmJHbHVaV0Z5UjNKaFpHbGxiblErUEM5a1pXWnpQand2YzNablBnPT0iLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJFTlMiLCAidmFsdWUiOiJuZXctZW5zLmV0aCJ9LHsidHJhaXRfdHlwZSI6ICJDb21taXQgSGFzaCIsICJ2YWx1ZSI6ImNlMWEzZmMxNDFlMjlmOGUxZDAwYTY1NGUxNTZjNDk4MmQ3NzExYmYifSx7InRyYWl0X3R5cGUiOiAiUmVwb3NpdG9yeSIsICJ2YWx1ZSI6Imh0dHBzOi8vZ2l0aHViLmNvbS9vdGhlci9yZXBvIn0seyJ0cmFpdF90eXBlIjogIlZlcnNpb24iLCAidmFsdWUiOiIxIn0seyJ0cmFpdF90eXBlIjogIkNvbG9yIiwgInZhbHVlIjoiIzY1NDMyMSJ9XX0="
        );
    }

    function test_tokenURIForDifferentAddresses() public {
        vm.prank(address(1));
        CuT.tokenURI(tokenId);
        vm.prank(address(2));
        CuT.tokenURI(tokenId);
        vm.prank(address(3));
        CuT.tokenURI(tokenId);
    }

    function testFail_tokenURIForInexistentId() public view {
        CuT.tokenURI(1);
    }

    function test_shouldEmitEventForMetadataChanges() public {
        expectMetadataUpdate(tokenId, "name", "New App Name", deployer);
        CuT.setTokenName(tokenId, "New App Name");

        expectMetadataUpdate(tokenId, "description", "New description for the app.", deployer);
        CuT.setTokenDescription(tokenId, "New description for the app.");

        expectMetadataUpdate(tokenId, "externalURL", "https://new-url.com", deployer);
        CuT.setTokenExternalURL(tokenId, "https://new-url.com");

        expectMetadataUpdate(tokenId, "ENS", "new-ens.eth", deployer);
        CuT.setTokenENS(tokenId, "new-ens.eth");

        expectMetadataUpdate(
            tokenId,
            "build",
            ["ce1a3fc141e29f8e1d00a654e156c4982d7711bf", "https://github.com/other/repo"],
            deployer
        );
        CuT.setTokenBuild(tokenId, "ce1a3fc141e29f8e1d00a654e156c4982d7711bf", "https://github.com/other/repo");

        expectMetadataUpdate(tokenId, "logo", TestConstants.LOGO_1, deployer);
        CuT.setTokenLogo(tokenId, TestConstants.LOGO_1);

        expectMetadataUpdate(tokenId, "color", 0x654321, deployer);
        CuT.setTokenColor(tokenId, 0x654321);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "../TestBase.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract APConstants is Test {
    using Strings for address;

    function expectRevertWithMustBeTokenVerifier(uint256 tokenId) public {
        vm.expectRevert(abi.encodeWithSelector(MustBeTokenVerifier.selector, tokenId));
    }

    function assertAccessPointJSON(
        string memory accessPointName,
        string memory _tokenId,
        string memory score,
        string memory nameVerified,
        string memory contentVerified,
        address owner,
        string memory status,
        string memory current // the json result from getAccessPointJSON
    ) public {
        // prettier-ignore
        string memory expectedJSON = string(abi.encodePacked('{"tokenId":', _tokenId, ',"score":', score, ',"nameVerified":', nameVerified, ',"contentVerified":', contentVerified, ',"owner":"', owner.toHexString(), '","status":', status,'}'));
        assertEq(current, expectedJSON);
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "base64-sol/base64.sol";

contract SitesNFTs is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Fleek Sites NFTs", "SNFT") {}

    // Token uri is the Base64 encoded json metadata
    function mintNFT(string memory _tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function _htmlToImageURI(string memory html) internal pure returns (string memory) {
        // text/html;charset=UTF-8,
        string memory baseURL = "data:text/html;charset=UTF-8,";
        return string(abi.encodePacked(baseURL, html));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }
}
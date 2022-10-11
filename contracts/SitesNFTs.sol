// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SitesNFTs is ERC721URIStorage, AccessControl {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private baseURI;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        baseURI = "data:application/json;base64,";
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Token uri is the Base64 encoded json metadata
    function mintNFT(string memory _tokenURI) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory _newBbaseURI) public {
        baseURI = _newBbaseURI;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    receive() external payable {}

    fallback() external {}
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./util/FleekSVG.sol";
import "./FleekERC721.sol";

contract FleekApps is Initializable, ERC721Upgradeable {
    using Strings for address;
    using Base64 for bytes;

    uint256 public bindCount;
    mapping(uint256 => uint256) public bindings;

    FleekERC721 private main;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbol, address _mainAddress) public initializer {
        __ERC721_init(_name, _symbol);
        main = FleekERC721(_mainAddress);
    }

    modifier _requireMainMinted(uint256 _tokenId) {
        require(main.ownerOf(_tokenId) != address(0), "Main token does not exist");
        _;
    }

    function mint(address _to, uint256 _tokenId) public _requireMainMinted(_tokenId) {
        _mint(_to, bindCount);
        bindings[bindCount] = _tokenId;
        bindCount++;
    }

    function tokenURI(uint256 _bindId) public view virtual override(ERC721Upgradeable) returns (string memory) {
        (string memory name, string memory ens, string memory logo, string memory color, string memory ipfsHash) = main
            .getAppData(bindings[_bindId]);

        // prettier-ignore
        return string(abi.encodePacked(_baseURI(),
            abi.encodePacked('{',
                '"owner":"', ownerOf(_bindId).toHexString(), '",',
                '"name":"', name, '",',
                '"image":"', FleekSVG.generateBase64(name, ens, logo, color), '",',
                '"external_url":"ipfs://', ipfsHash, '"',
            '}').encode()
        ));
    }

    /**
     * @dev Override of transfer of ERC721.
     * Transfer is disabled for NFA tokens.
     */
    function _transfer(address from, address to, uint256 tokenId) internal virtual override {
        revert TransferIsDisabled();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "data:application/json;base64,";
    }
}

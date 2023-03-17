// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title ERCX Interface
 * @author
 * @notice
 *
 * ERCX is a standard for NFTs that represent websites. It is a standard that
 * allows for the storage of metadata about a website, and allows for the
 * storage of multiple builds of a website. This allows for the NFT to be
 * used as a way to store the history of a website.
 */
interface IERCX {
    /**
     * Event emitted when a token's metadata is updated.
     * @param _tokenId the updated token id.
     * @param key which metadata key was updated
     * @param value the new value of the metadata
     * @param triggeredBy the address that triggered the update
     */
    event MetadataUpdate(uint256 indexed _tokenId, string key, string value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, uint24 value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, string[2] value, address indexed triggeredBy);
    event MetadataUpdate(uint256 indexed _tokenId, string key, bool value, address indexed triggeredBy);

    /**
     * The metadata that is stored for each build.
     */
    struct Build {
        string commitHash;
        string gitRepository;
    }

    /**
     * The properties are stored as string to keep consistency with
     * other token contracts, we might consider changing for bytes32
     * in the future due to gas optimization.
     */
    struct Token {
        string name; // Name of the site
        string description; // Description about the site
        string externalURL; // Site URL
        string ENS; // ENS for the site
        string logo; // Branding logo
        uint24 color; // Branding color
        uint256 currentBuild; // The current build number (Increments by one with each change, starts at zero)
        mapping(uint256 => Build) builds; // Mapping to build details for each build number
    }

    /**
     * @dev Sets a minted token's external URL.
     */
    function setTokenExternalURL(uint256 tokenId, string memory _tokenExternalURL) external;

    /**
     * @dev Sets a minted token's ENS.
     */
    function setTokenENS(uint256 tokenId, string memory _tokenENS) external;

    /**
     * @dev Sets a minted token's name.
     */
    function setTokenName(uint256 tokenId, string memory _tokenName) external;

    /**
     * @dev Sets a minted token's description.
     */
    function setTokenDescription(uint256 tokenId, string memory _tokenDescription) external;

    /**
     * @dev Sets a minted token's logo.
     */
    function setTokenLogo(uint256 tokenId, string memory _tokenLogo) external;

    /**
     * @dev Sets a minted token's color.
     */
    function setTokenColor(uint256 tokenId, uint24 _tokenColor) external;

    /**
     * @dev Sets a minted token's build.
     */
    function setTokenBuild(uint256 tokenId, string memory commitHash, string memory gitRepository) external;

    /**
     * @dev Returns the token metadata for a given tokenId.
     * It must return a valid JSON object in string format encoded in Base64.
     */
    function tokenURI(uint256 tokenId) external returns (string memory);
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FleekAccessControl.sol";
import "./FleekBilling.sol";
import "./FleekPausable.sol";
import "./FleekAccessPoints.sol";
import "./util/FleekENS.sol";
import "./util/FleekStrings.sol";
import "./IERCX.sol";

error MustBeTokenOwner(uint256 tokenId);
error MustBeTokenVerifier(uint256 tokenId);
error ThereIsNoTokenMinted();
error TransferIsDisabled();

contract FleekERC721 is
    IERCX,
    Initializable,
    ERC721Upgradeable,
    FleekAccessControl,
    FleekPausable,
    FleekBilling,
    FleekAccessPoints
{
    using Strings for uint256;
    using FleekStrings for FleekERC721.Token;
    using FleekStrings for string;
    using FleekStrings for uint24;

    event NewMint(
        uint256 indexed tokenId,
        string name,
        string description,
        string externalURL,
        string ENS,
        string commitHash,
        string gitRepository,
        string ipfsHash,
        string logo,
        uint24 color,
        bool accessPointAutoApproval,
        address indexed minter,
        address indexed owner,
        address verifier
    );

    event MetadataUpdate(uint256 indexed _tokenId, string key, address value, address indexed triggeredBy);

    uint256 private _appIds;
    mapping(uint256 => Token) private _apps;
    mapping(uint256 => address) private _tokenVerifier;
    mapping(uint256 => bool) private _tokenVerified;

    /**
     * @dev This constructor sets the state of implementation contract to paused
     * and disable initializers, not allowing interactions with the implementation
     * contracts.
     */
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _setPausable(true);
        _pause();
        _disableInitializers();
    }

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function initialize(
        string memory _name,
        string memory _symbol,
        uint256[] memory initialBillings
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __FleekAccessControl_init();
        __FleekBilling_init(initialBillings);
        __FleekPausable_init();
    }

    /**
     * @dev Checks if caller is the verifier of the token.
     */
    modifier requireTokenVerifier(uint256 tokenId) {
        if (_tokenVerifier[tokenId] != msg.sender) revert MustBeTokenVerifier(tokenId);
        _;
    }

    /**
     * @dev Mints a token and returns a tokenId.
     *
     * If the `tokenId` has not been minted before, and the `to` address is not zero, emits a {Transfer} event.
     *
     * Requirements:
     *
     * - the caller must have ``collectionOwner``'s admin role.
     * - billing for the minting may be applied.
     * - the contract must be not paused.
     *
     */
    function mint(
        address to,
        string memory name,
        string memory description,
        string memory externalURL,
        string calldata ens,
        string memory commitHash,
        string memory gitRepository,
        string memory ipfsHash,
        string memory logo,
        uint24 color,
        bool accessPointAutoApproval,
        address verifier
    ) public payable requirePayment(Billing.Mint) returns (uint256) {
        if (!hasCollectionRole(CollectionRoles.Verifier, verifier))
            revert MustHaveCollectionRole(uint8(CollectionRoles.Verifier));
        if (bytes(ens).length > 0) FleekENS.requireENSOwner(ens);
        uint256 tokenId = _appIds;
        _mint(to, tokenId);

        _appIds += 1;

        Token storage app = _apps[tokenId];
        app.name = name;
        app.description = description;
        app.externalURL = externalURL;
        app.ENS = ens;
        app.logo = logo;
        app.color = color;

        // The mint interaction is considered to be the first build of the site. Updates from now on all increment the currentBuild by one and update the mapping.
        app.currentBuild = 0;
        app.builds[0] = Build(commitHash, gitRepository, ipfsHash, externalURL);

        emit NewMint(
            tokenId,
            name,
            description,
            externalURL,
            ens,
            commitHash,
            gitRepository,
            ipfsHash,
            logo,
            color,
            accessPointAutoApproval,
            msg.sender,
            to,
            verifier
        );

        _tokenVerifier[tokenId] = verifier;
        _tokenVerified[tokenId] = false;
        _setAccessPointAutoApproval(tokenId, accessPointAutoApproval);

        return tokenId;
    }

    /**
     * @dev Returns the token metadata associated with the `tokenId`.
     *
     * Returns a based64 encoded string value of the URI.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function tokenURI(uint256 tokenId) public view virtual override(ERC721Upgradeable, IERCX) returns (string memory) {
        _requireMinted(tokenId);
        address owner = ownerOf(tokenId);
        bool accessPointAutoApproval = _getAccessPointAutoApproval(tokenId);
        bool verified = _tokenVerified[tokenId];
        Token storage app = _apps[tokenId];

        return string(abi.encodePacked(_baseURI(), app.toString(owner, accessPointAutoApproval, verified).toBase64()));
    }

    /**
     * @dev Returns the token metadata associated with the `tokenId`.
     *
     * Returns multiple string and uint values in relation to metadata fields of the App struct.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function getToken(
        uint256 tokenId
    )
        public
        view
        virtual
        returns (string memory, string memory, string memory, string memory, uint256, string memory, uint24)
    {
        _requireMinted(tokenId);
        Token storage app = _apps[tokenId];
        return (app.name, app.description, app.externalURL, app.ENS, app.currentBuild, app.logo, app.color);
    }

    function getAppData(
        uint256 tokenId
    ) public view returns (string memory, string memory, string memory, string memory, string memory) {
        _requireMinted(tokenId);
        Token storage app = _apps[tokenId];

        return (app.name, app.ENS, app.logo, app.color.toColorString(), app.builds[app.currentBuild].ipfsHash);
    }

    /**
     * @dev Returns the last minted tokenId.
     */
    function getLastTokenId() public view virtual returns (uint256) {
        uint256 current = _appIds;
        if (current == 0) revert ThereIsNoTokenMinted();
        return current - 1;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Override of _beforeTokenTransfer of ERC721.
     * Here it needs to update the token controller roles for mint, burn and transfer.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            // Transfer
            _clearTokenRoles(tokenId);
        } else if (from == address(0)) {
            // Mint
            // TODO: set contract owner as controller
        } else if (to == address(0)) {
            // Burn
            _clearTokenRoles(tokenId);
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Override of transfer of ERC721.
     * Transfer is disabled for NFA tokens.
     */
    function _transfer(address from, address to, uint256 tokenId) internal virtual override whenNotPaused {
        revert TransferIsDisabled();
    }

    /**
     * @dev A baseURI internal function implementation to be called in the `tokenURI` function.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    /**
     * @dev Updates the `externalURL` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenExternalURL} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenExternalURL(
        uint256 tokenId,
        string memory _tokenExternalURL
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].externalURL = _tokenExternalURL;
        emit MetadataUpdate(tokenId, "externalURL", _tokenExternalURL, msg.sender);
    }

    /**
     * @dev Updates the `ENS` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenENS} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenENS(
        uint256 tokenId,
        string calldata _tokenENS
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        FleekENS.requireENSOwner(_tokenENS);
        _requireMinted(tokenId);
        _apps[tokenId].ENS = _tokenENS;
        emit MetadataUpdate(tokenId, "ENS", _tokenENS, msg.sender);
    }

    /**
     * @dev Updates the `name` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenName} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenName(
        uint256 tokenId,
        string memory _tokenName
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].name = _tokenName;
        emit MetadataUpdate(tokenId, "name", _tokenName, msg.sender);
    }

    /**
     * @dev Updates the `description` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenDescription} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenDescription(
        uint256 tokenId,
        string memory _tokenDescription
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].description = _tokenDescription;
        emit MetadataUpdate(tokenId, "description", _tokenDescription, msg.sender);
    }

    /**
     * @dev Updates the `logo` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenLogo} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenLogo(
        uint256 tokenId,
        string memory _tokenLogo
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].logo = _tokenLogo;
        emit MetadataUpdate(tokenId, "logo", _tokenLogo, msg.sender);
    }

    /**
     * @dev Updates the `color` metadata field of a minted `tokenId`.
     *
     * May emit a {NewTokenColor} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenColor(
        uint256 tokenId,
        uint24 _tokenColor
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].color = _tokenColor;
        emit MetadataUpdate(tokenId, "color", _tokenColor, msg.sender);
    }

    /**
     * @dev Updates the `logo` and `color` metadata fields of a minted `tokenId`.
     *
     * May emit a {NewTokenLogo} and a {NewTokenColor} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenLogoAndColor(uint256 tokenId, string memory _tokenLogo, uint24 _tokenColor) public virtual {
        setTokenLogo(tokenId, _tokenLogo);
        setTokenColor(tokenId, _tokenColor);
    }

    /**
     * @dev Adds a new build to a minted `tokenId`'s builds mapping.
     *
     * May emit a {NewBuild} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setTokenBuild(
        uint256 tokenId,
        string memory _commitHash,
        string memory _gitRepository,
        string memory _ipfsHash,
        string memory _domain
    ) public virtual requireTokenRole(tokenId, TokenRoles.Controller) {
        _requireMinted(tokenId);
        _apps[tokenId].builds[++_apps[tokenId].currentBuild] = Build(_commitHash, _gitRepository, _ipfsHash, _domain);
        // Note from Nima: should we update the externalURL field with each new domain?
        emit MetadataUpdate(tokenId, "build", [_commitHash, _gitRepository, _ipfsHash, _domain], msg.sender);
    }

    /**
     * @dev Burns a previously minted `tokenId`.
     *
     * May emit a {Transfer} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must be the owner of the token.
     * - the contract must be not paused.
     *
     */
    function burn(uint256 tokenId) public virtual requireTokenOwner(tokenId) {
        super._burn(tokenId);

        if (bytes(_apps[tokenId].externalURL).length != 0) {
            delete _apps[tokenId];
        }
    }

    /**
     * @dev Sets an address as verifier of a token.
     * The verifier must have `CollectionRoles.Verifier` role.
     *
     * May emit a {MetadataUpdate} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must be the owner of the token.
     * - the verifier must have `CollectionRoles.Verifier` role.
     *
     */
    function setTokenVerifier(uint256 tokenId, address verifier) public requireTokenOwner(tokenId) {
        if (!hasCollectionRole(CollectionRoles.Verifier, verifier))
            revert MustHaveCollectionRole(uint8(CollectionRoles.Verifier));
        _requireMinted(tokenId);
        _tokenVerifier[tokenId] = verifier;
        emit MetadataUpdate(tokenId, "verifier", verifier, msg.sender);
    }

    /**
     * @dev Returns the verifier of a token.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function getTokenVerifier(uint256 tokenId) public view returns (address) {
        _requireMinted(tokenId);
        return _tokenVerifier[tokenId];
    }

    /**
     * @dev Sets the verification status of a token.
     *
     * May emit a {MetadataUpdate} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must be the token verifier.
     * - the sender must have `CollectionRoles.Verifier` role.
     *
     */
    function setTokenVerified(
        uint256 tokenId,
        bool verified
    ) public requireCollectionRole(CollectionRoles.Verifier) requireTokenVerifier(tokenId) {
        _requireMinted(tokenId);
        _tokenVerified[tokenId] = verified;
        emit MetadataUpdate(tokenId, "verified", verified, msg.sender);
    }

    /**
     * @dev Returns the verification status of a token.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     *
     */
    function isTokenVerified(uint256 tokenId) public view returns (bool) {
        _requireMinted(tokenId);
        return _tokenVerified[tokenId];
    }

    /*//////////////////////////////////////////////////////////////
        ACCESS POINTS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Add a new AccessPoint register for an app token.
     * The AP name should be a DNS or ENS url and it should be unique.
     * Anyone can add an AP but it should requires a payment.
     *
     * May emit a {NewAccessPoint} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - billing for add acess point may be applied.
     * - the contract must be not paused.
     *
     */
    function addAccessPoint(
        uint256 tokenId,
        string memory apName
    ) public payable whenNotPaused requirePayment(Billing.AddAccessPoint) {
        _requireMinted(tokenId);
        _addAccessPoint(tokenId, apName);
    }

    /**
     * @dev Remove an AccessPoint registry for an app token.
     * It will also remove the AP from the app token APs list.
     *
     * May emit a {RemoveAccessPoint} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - must be called by the AP owner.
     * - the contract must be not paused.
     *
     */
    function removeAccessPoint(string memory apName) public whenNotPaused {
        _removeAccessPoint(apName);
    }

    /**
     * @dev Updates the `accessPointAutoApproval` settings on minted `tokenId`.
     *
     * May emit a {MetadataUpdate} event.
     *
     * Requirements:
     *
     * - the tokenId must be minted and valid.
     * - the sender must have the `tokenController` role.
     *
     */
    function setAccessPointAutoApproval(uint256 tokenId, bool _apAutoApproval) public requireTokenOwner(tokenId) {
        _requireMinted(tokenId);
        _setAccessPointAutoApproval(tokenId, _apAutoApproval);
        emit MetadataUpdate(tokenId, "accessPointAutoApproval", _apAutoApproval, msg.sender);
    }

    /**
     * @dev Set approval settings for an access point.
     * It will add the access point to the token's AP list, if `approved` is true.
     *
     * May emit a {ChangeAccessPointApprovalStatus} event.
     *
     * Requirements:
     *
     * - the tokenId must exist and be the same as the tokenId that is set for the AP.
     * - the AP must exist.
     * - must be called by a token controller.
     */
    function setApprovalForAccessPoint(
        uint256 tokenId,
        string memory apName,
        bool approved
    ) public requireTokenOwner(tokenId) {
        _setApprovalForAccessPoint(tokenId, apName, approved);
    }

    /**
     * @dev Set the content verification of a AccessPoint registry.
     *
     * May emit a {ChangeAccessPointContentVerify} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - the sender must have the token controller role.
     *
     */
    function setAccessPointContentVerify(
        string memory apName,
        bool verified
    ) public requireCollectionRole(CollectionRoles.Verifier) requireTokenVerifier(_getAccessPointTokenId(apName)) {
        _setAccessPointContentVerify(apName, verified);
    }

    /**
     * @dev Set the name verification of a AccessPoint registry.
     *
     * May emit a {ChangeAccessPointNameVerify} event.
     *
     * Requirements:
     *
     * - the AP must exist.
     * - the sender must have the token controller role.
     *
     */
    function setAccessPointNameVerify(
        string memory apName,
        bool verified
    ) public requireCollectionRole(CollectionRoles.Verifier) requireTokenVerifier(_getAccessPointTokenId(apName)) {
        _setAccessPointNameVerify(apName, verified);
    }

    /*//////////////////////////////////////////////////////////////
        ACCESS CONTROL
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Requires caller to have a selected collection role.
     */
    modifier requireCollectionRole(CollectionRoles role) {
        _requireCollectionRole(role);
        _;
    }

    /**
     * @dev Requires caller to have a selected token role.
     */
    modifier requireTokenRole(uint256 tokenId, TokenRoles role) {
        if (ownerOf(tokenId) != msg.sender) _requireTokenRole(tokenId, role);
        _;
    }

    /**
     * @dev Requires caller to be selected token owner.
     */
    modifier requireTokenOwner(uint256 tokenId) {
        if (ownerOf(tokenId) != msg.sender) revert MustBeTokenOwner(tokenId);
        _;
    }

    /**
     * @dev Grants the collection role to an address.
     *
     * Requirements:
     *
     * - the caller should have the collection role.
     *
     */
    function grantCollectionRole(
        CollectionRoles role,
        address account
    ) public whenNotPaused requireCollectionRole(CollectionRoles.Owner) {
        _grantCollectionRole(role, account);
    }

    /**
     * @dev Grants the token role to an address.
     *
     * Requirements:
     *
     * - the caller should have the token role.
     *
     */
    function grantTokenRole(
        uint256 tokenId,
        TokenRoles role,
        address account
    ) public whenNotPaused requireTokenOwner(tokenId) {
        _grantTokenRole(tokenId, role, account);
    }

    /**
     * @dev Revokes the collection role of an address.
     *
     * Requirements:
     *
     * - the caller should have the collection role.
     *
     */
    function revokeCollectionRole(
        CollectionRoles role,
        address account
    ) public whenNotPaused requireCollectionRole(CollectionRoles.Owner) {
        _revokeCollectionRole(role, account);
    }

    /**
     * @dev Revokes the token role of an address.
     *
     * Requirements:
     *
     * - the caller should have the token role.
     *
     */
    function revokeTokenRole(
        uint256 tokenId,
        TokenRoles role,
        address account
    ) public whenNotPaused requireTokenOwner(tokenId) {
        _revokeTokenRole(tokenId, role, account);
    }

    /*//////////////////////////////////////////////////////////////
        PAUSABLE
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Sets the contract to paused state.
     *
     * Requirements:
     *
     * - the sender must have the `controller` role.
     * - the contract must be pausable.
     * - the contract must be not paused.
     *
     */
    function pause() public requireCollectionRole(CollectionRoles.Owner) {
        _pause();
    }

    /**
     * @dev Sets the contract to unpaused state.
     *
     * Requirements:
     *
     * - the sender must have the `controller` role.
     * - the contract must be paused.
     *
     */
    function unpause() public requireCollectionRole(CollectionRoles.Owner) {
        _unpause();
    }

    /**
     * @dev Sets the contract to pausable state.
     *
     * Requirements:
     *
     * - the sender must have the `owner` role.
     * - the contract must be in the oposite pausable state.
     *
     */
    function setPausable(bool pausable) public requireCollectionRole(CollectionRoles.Owner) {
        _setPausable(pausable);
    }

    /*//////////////////////////////////////////////////////////////
        BILLING
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Modifier to require billing with a given key.
     */
    modifier requirePayment(Billing key) {
        _requirePayment(key);
        _;
    }

    /**
     * @dev Sets the billing value for a given key.
     *
     * May emit a {BillingChanged} event.
     *
     * Requirements:
     *
     * - the sender must have the `collectionOwner` role.
     *
     */
    function setBilling(Billing key, uint256 value) public requireCollectionRole(CollectionRoles.Owner) {
        _setBilling(key, value);
    }

    /**
     * @dev Withdraws all the funds from contract.
     *
     * May emmit a {Withdrawn} event.
     *
     * Requirements:
     *
     * - the sender must have the `collectionOwner` role.
     *
     */
    function withdraw() public requireCollectionRole(CollectionRoles.Owner) {
        _withdraw();
    }
}

pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./NonBlockingLzApp.sol";
import "./FleekPausable.sol";

/// @title The Fleek Prints contract is responsible for the Print NFT collection and the NFA -> ENS data registry.
/// @author Nima Rasooli (EmperorOrokuSaki / Nima-Ra)
/// @notice All Print NFTs are updated, registered, and managed in this contract.
/// @dev This contract uses LayerZero to enable cross-messaging.
contract FleekPrints is NonblockingLzApp, ERC721Upgradeable, FleekPausable {
    using Strings for uint160;

    struct NFA {
        uint256 ENSId; // NFA ENS ID
        string ENS; // NFA ENS Name
        string name; // NFA Name
    }

    struct Token {
        uint256 nfaId; // NFA ID in the registry
        address owner; // Print owner address
    }

    mapping(uint256 => NFA) nfaMetadata; // nfa id to metadata
    mapping(uint256 => Token) printMetadata; // print id to metadata
    mapping(uint16 => address) otherContracts; // chain id to address

    uint16[] chainIds; // The LayerZero IDs of chains that are hosting other Fleek Prints contracts
    uint256 printId;

    /// @notice The authorized address to make updates/changes to the NFA registry
    /// @dev The value for the main contract is equal to the NFA project's admin address, and for non-main contracts is the main contract's address.
    address public authorizedSource;

    uint16 public mainChainID;

    bool public isMain; // is only set to `true` on the ethereum main-net Print contract

    string constant CHANGE_MAIN_ALERT = "NewMainAddress";

    ////////////
    // MODIFIERS
    ////////////

    modifier onlyFromAuthorizedSources(address caller) {
        require(authorizedSource == caller, "Unauthorized caller address.");
        _;
    }

    /// @notice The constructor function
    /// @dev Initiates the LayerZero functionality and sets up the contracts by assigning values to the immutable state variables
    /// @param _isMain => determins if the contracts is deployed on the main chain or not
    /// @param _mainChainId => the main chain's layerzero ID
    /// @param _authorizedSource => address of the only authorized on-chain entity responsible for updating the NFA metadata
    /// @param _lzEndpoint => address of the LayerZero endpoint on the source chain
    constructor(
        bool _isMain,
        uint16 _mainChainId,
        address _authorizedSource,
        address _lzEndpoint
    ) NonblockingLzApp(_lzEndpoint) {
        isMain = _isMain;
        mainChainID = _mainChainId;
        authorizedSource = _authorizedSource;

        if (!isMain) {
            setTrustedRemote(mainChainID, abi.encodePacked(_authorizedSource, address(this))); // add the main contract address to trusted remotes
        }

        __ERC721_init("NFA Prints", "PRNT");
    }

    ///////////////////////////
    // ERC 721 METHODS (PRINTS)
    ///////////////////////////

    // Mints a print for an nfa
    function mint(uint256 _nfaId) external returns (uint256) {
        require(nfaMetadata[_nfaId].ENSId > 0, "The passed nfa id is non-existent.");

        uint256 tokenId = printId;
        tokenId++;

        _safeMint(msg.sender, tokenId); // msg.sender should always be an EOA, it will revert for contracts.

        printMetadata[tokenId] = Token(_nfaId, msg.sender);
        printId = tokenId;
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        Token memory metadata = printMetadata[tokenId];
        NFA memory nfa = nfaMetadata[metadata.nfaId];

        return
            string(
                abi.encodePacked(
                    "{",
                    '"tokenId":',
                    tokenId,
                    ",",
                    '"nfaId":',
                    metadata.nfaId,
                    ",",
                    '"name":',
                    nfa.name,
                    ",",
                    '"ENS":',
                    nfa.ENS,
                    ",",
                    '"ENSId":',
                    nfa.ENSId,
                    ",",
                    '"owner":',
                    uint160(metadata.owner).toHexString(20),
                    ",",
                    "}"
                )
            );
    }

    //////////////
    // MANAGEMENT
    //////////////

    function transferControl(address _newMain, uint16 _newMainChainId) external onlyFromAuthorizedSources(msg.sender) {
        if (isMain) {
            // Update state variables
            authorizedSource = _newMain;
            mainChainID = _newMainChainId;
            isMain = false;

            uint256 chainNumber = chainIds.length;
            bytes memory _payload = abi.encode(CHANGE_MAIN_ALERT, _newMain, _newMainChainId);
            for (uint256 index = 0; index < chainNumber; index++) {
                uint16 chainId = chainIds[index];
                broadcast(_payload, chainId);
            }
        }
    }

    //////////////
    // NFA METHODS
    //////////////

    function addContract(address _contract, uint16 _chainId) external onlyFromAuthorizedSources(msg.sender) {
        otherContracts[_chainId] = _contract;
        chainIds.push(_chainId);

        setTrustedRemote(_chainId, abi.encodePacked(_contract, address(this)));
    }

    /**
     * Authorized address is able to change nfa metadata by calling this function with an existing nfaId.
     * (even if the id is already present in the nfaMetadata mapping)
     */
    function importNFA(
        string calldata _ENS,
        uint256 _ENSId,
        string calldata _name,
        uint256 _nfaId
    ) external payable onlyFromAuthorizedSources(msg.sender) {
        nfaMetadata[_nfaId] = NFA(_ENSId, _ENS, _name);

        if (isMain) {
            // share nfa metadata with other print contracts
            uint256 chainNumber = chainIds.length;
            for (uint256 index = 0; index < chainNumber; index++) {
                uint16 chainId = chainIds[index];
                broadcast(abi.encode(_ENS, _ENSId, _name, _nfaId), chainId);
            }
        }
    }

    function broadcast(bytes memory _payload, uint16 _destinationChainId) internal {
        require(address(this).balance > 0, "The balance of this contract is 0. Send gas for message fees");

        uint16 version = 1;
        uint gasForDestinationLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);

        _lzSend(_destinationChainId, _payload, payable(this), address(0x0), adapterParams, msg.value);
    }

    function _nonblockingLzReceive(
        uint16 _sourceChainId,
        bytes memory _sourceAddress,
        uint64,
        bytes memory _payload
    ) internal override {
        if (_payload.length != 128) {
            (string memory _ENS, uint256 _ENSId, string memory _name, uint256 _nfaId) = abi.decode(
                _payload,
                (string, uint256, string, uint256)
            );
            nfaMetadata[_nfaId] = NFA(_ENSId, _ENS, _name);
        } else {
            (string memory _changeType, address _newMain, uint16 _newChainId) = abi.decode(
                _payload,
                (string, address, uint16)
            );
            require(
                keccak256(abi.encodePacked(_changeType)) == keccak256(abi.encodePacked(CHANGE_MAIN_ALERT)),
                "Unknown payload"
            );
            mainChainID = _newChainId;
            authorizedSource = _newMain;
        }
    }

    receive() external payable {}
}

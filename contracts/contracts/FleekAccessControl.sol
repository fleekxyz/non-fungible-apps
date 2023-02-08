// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error MustHaveCollectionRole(uint8 role);
error MustHaveTokenRole(uint256 tokenId, uint8 role);
error MustHaveAtLeastOneOwner();
error RoleAlreadySet();

contract FleekAccessControl is Initializable {
    using Counters for Counters.Counter;

    /**
     * @dev All available collection roles.
     */
    enum CollectionRoles {
        Owner
    }

    /**
     * @dev All available token roles.
     */
    enum TokenRoles {
        Controller
    }

    /**
     * @dev Emitted when a collection role is granted.
     */
    event TokenRoleGranted(
        uint256 indexed tokenId,
        TokenRoles indexed role,
        address indexed toAddress,
        address byAddress
    );

    /**
     * @dev Emitted when a collection role is revoked.
     */
    event TokenRoleRevoked(
        uint256 indexed tokenId,
        TokenRoles indexed role,
        address indexed toAddress,
        address byAddress
    );

    /**
     * @dev Emitted when token roles version is increased and all token roles are cleared and.
     */
    event TokenRolesCleared(uint256 indexed tokenId, address byAddress);

    /**
     * @dev Emitted when a collection role is granted.
     */
    event CollectionRoleGranted(CollectionRoles indexed role, address indexed toAddress, address byAddress);

    /**
     * @dev Emitted when a collection role is revoked.
     */
    event CollectionRoleRevoked(CollectionRoles indexed role, address indexed toAddress, address byAddress);

    /**
     * @dev _collectionRolesCounter[role] is the number of addresses that have the role.
     * This is prevent Owner role to go to 0.
     */
    mapping(CollectionRoles => Counters.Counter) private _collectionRolesCounter;

    /**
     * @dev _collectionRoles[role][address] is the mapping of addresses that have the role.
     */
    mapping(CollectionRoles => mapping(address => bool)) private _collectionRoles;

    /**
     * @dev _tokenRolesVersion[tokenId] is the version of the token roles.
     * The version is incremented every time the token roles are cleared.
     * Should be incremented every token transfer.
     */
    mapping(uint256 => Counters.Counter) private _tokenRolesVersion;

    /**
     * @dev _tokenRoles[tokenId][version][role][address] is the mapping of addresses that have the role.
     */
    mapping(uint256 => mapping(uint256 => mapping(TokenRoles => mapping(address => bool)))) private _tokenRoles;

    /**
     * @dev Initializes the contract by granting the `Owner` role to the deployer.
     */
    function __FleekAccessControl_init() internal onlyInitializing {
        _grantCollectionRole(CollectionRoles.Owner, msg.sender);
    }

    /**
     * @dev Checks if the `msg.sender` has a certain role.
     */
    function requireCollectionRole(CollectionRoles role) internal view {
        if (!hasCollectionRole(role, msg.sender)) revert MustHaveCollectionRole(uint8(role));
    }

    /**
     * @dev Checks if the `msg.sender` has the `Token` role for a certain `tokenId`.
     */
    function requireTokenRole(uint256 tokenId, TokenRoles role) internal view {
        if (!hasTokenRole(tokenId, role, msg.sender)) revert MustHaveTokenRole(tokenId, uint8(role));
    }

    /**
     * @dev Returns `True` if a certain address has the collection role.
     */
    function hasCollectionRole(CollectionRoles role, address account) public view returns (bool) {
        return _collectionRoles[role][account];
    }

    /**
     * @dev Returns `True` if a certain address has the token role.
     */
    function hasTokenRole(uint256 tokenId, TokenRoles role, address account) public view returns (bool) {
        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        return _tokenRoles[tokenId][currentVersion][role][account];
    }

    /**
     * @dev Grants the collection role to an address.
     */
    function _grantCollectionRole(CollectionRoles role, address account) internal {
        if (hasCollectionRole(role, account)) revert RoleAlreadySet();

        _collectionRoles[role][account] = true;
        _collectionRolesCounter[role].increment();

        emit CollectionRoleGranted(role, account, msg.sender);
    }

    /**
     * @dev Revokes the collection role of an address.
     */
    function _revokeCollectionRole(CollectionRoles role, address account) internal {
        if (!hasCollectionRole(role, account)) revert RoleAlreadySet();
        if (role == CollectionRoles.Owner && _collectionRolesCounter[role].current() == 1)
            revert MustHaveAtLeastOneOwner();

        _collectionRoles[role][account] = false;
        _collectionRolesCounter[role].decrement();

        emit CollectionRoleRevoked(role, account, msg.sender);
    }

    /**
     * @dev Grants the token role to an address.
     */
    function _grantTokenRole(uint256 tokenId, TokenRoles role, address account) internal {
        if (hasTokenRole(tokenId, role, account)) revert RoleAlreadySet();

        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        _tokenRoles[tokenId][currentVersion][role][account] = true;

        emit TokenRoleGranted(tokenId, role, account, msg.sender);
    }

    /**
     * @dev Revokes the token role of an address.
     */
    function _revokeTokenRole(uint256 tokenId, TokenRoles role, address account) internal {
        if (!hasTokenRole(tokenId, role, account)) revert RoleAlreadySet();

        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        _tokenRoles[tokenId][currentVersion][role][account] = false;

        emit TokenRoleRevoked(tokenId, role, account, msg.sender);
    }

    /**
     * @dev Clears all token roles for a certain tokenId and grants the owner role to a new address.
     * Should only be used for transferring tokens.
     */
    function _clearTokenRoles(uint256 tokenId, address newOwner) internal {
        _tokenRolesVersion[tokenId].increment();
        emit TokenRolesCleared(tokenId, msg.sender);
    }
}

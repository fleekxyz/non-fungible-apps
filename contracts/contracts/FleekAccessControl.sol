// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error MustHaveCollectionRole(uint8 role);
error MustHaveTokenRole(uint256 tokenId, uint8 role);
error MustHaveAtLeastOneOwner();
error RoleAlreadySet();

contract FleekAccessControl is Initializable {
    /**
     * @dev All available collection roles.
     */
    enum CollectionRoles {
        Owner,
        Verifier
    }

    /**
     * @dev All available token roles.
     */
    enum TokenRoles {
        Controller
    }

    /**
     * @dev Emitted when a token role is changed.
     */
    event TokenRoleChanged(
        uint256 indexed tokenId,
        TokenRoles indexed role,
        address indexed toAddress,
        bool status,
        address byAddress
    );

    /**
     * @dev Emitted when token roles version is increased and all token roles are cleared.
     */
    event TokenRolesCleared(uint256 indexed tokenId, address byAddress);

    /**
     * @dev Emitted when a collection role is changed.
     */
    event CollectionRoleChanged(
        CollectionRoles indexed role,
        address indexed toAddress,
        bool status,
        address byAddress
    );

    /**
     * @dev _collectionRolesCounter[role] is the number of addresses that have the role.
     * This is prevent Owner role to go to 0.
     */
    mapping(CollectionRoles => uint256) private _collectionRolesCounter;

    /**
     * @dev _collectionRoles[role][address] is the mapping of addresses that have the role.
     */
    mapping(CollectionRoles => mapping(address => bool)) private _collectionRoles;

    /**
     * @dev _tokenRolesVersion[tokenId] is the version of the token roles.
     * The version is incremented every time the token roles are cleared.
     * Should be incremented every token transfer.
     */
    mapping(uint256 => uint256) private _tokenRolesVersion;

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
    function _requireCollectionRole(CollectionRoles role) internal view {
        if (!hasCollectionRole(role, msg.sender)) revert MustHaveCollectionRole(uint8(role));
    }

    /**
     * @dev Checks if the `msg.sender` has the `Token` role for a certain `tokenId`.
     */
    function _requireTokenRole(uint256 tokenId, TokenRoles role) internal view {
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
        uint256 currentVersion = _tokenRolesVersion[tokenId];
        return _tokenRoles[tokenId][currentVersion][role][account];
    }

    /**
     * @dev Grants the collection role to an address.
     */
    function _grantCollectionRole(CollectionRoles role, address account) internal {
        if (hasCollectionRole(role, account)) revert RoleAlreadySet();

        _collectionRoles[role][account] = true;
        _collectionRolesCounter[role] += 1;

        emit CollectionRoleChanged(role, account, true, msg.sender);
    }

    /**
     * @dev Revokes the collection role of an address.
     */
    function _revokeCollectionRole(CollectionRoles role, address account) internal {
        if (!hasCollectionRole(role, account)) revert RoleAlreadySet();
        if (role == CollectionRoles.Owner && _collectionRolesCounter[role] == 1) revert MustHaveAtLeastOneOwner();

        _collectionRoles[role][account] = false;
        _collectionRolesCounter[role] -= 1;

        emit CollectionRoleChanged(role, account, false, msg.sender);
    }

    /**
     * @dev Grants the token role to an address.
     */
    function _grantTokenRole(uint256 tokenId, TokenRoles role, address account) internal {
        if (hasTokenRole(tokenId, role, account)) revert RoleAlreadySet();

        uint256 currentVersion = _tokenRolesVersion[tokenId];
        _tokenRoles[tokenId][currentVersion][role][account] = true;

        emit TokenRoleChanged(tokenId, role, account, true, msg.sender);
    }

    /**
     * @dev Revokes the token role of an address.
     */
    function _revokeTokenRole(uint256 tokenId, TokenRoles role, address account) internal {
        if (!hasTokenRole(tokenId, role, account)) revert RoleAlreadySet();

        uint256 currentVersion = _tokenRolesVersion[tokenId];
        _tokenRoles[tokenId][currentVersion][role][account] = false;

        emit TokenRoleChanged(tokenId, role, account, false, msg.sender);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    function _clearTokenRoles(uint256 tokenId) internal {
        _tokenRolesVersion[tokenId] += 1;
        emit TokenRolesCleared(tokenId, msg.sender);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

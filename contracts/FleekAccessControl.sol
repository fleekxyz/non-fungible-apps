// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract FleekAccessControl is Initializable {
    using Counters for Counters.Counter;

    enum Roles {
        Owner,
        Controller
    }

    event TokenRoleGranted(uint256 indexed tokenId, Roles indexed role, address indexed toAddress, address byAddress);
    event TokenRoleRevoked(uint256 indexed tokenId, Roles indexed role, address indexed toAddress, address byAddress);
    event CollectionRoleGranted(Roles indexed role, address indexed toAddress, address byAddress);
    event CollectionRoleRevoked(Roles indexed role, address indexed toAddress, address byAddress);

    struct Role {
        mapping(address => uint256) indexes;
        address[] members;
    }

    Counters.Counter private _collectionRolesVersion;
    // _collectionRoles[version][role]
    mapping(uint256 => mapping(Roles => Role)) private _collectionRoles;

    mapping(uint256 => Counters.Counter) private _tokenRolesVersion;
    // _tokenRoles[tokenId][version][role]
    mapping(uint256 => mapping(uint256 => mapping(Roles => Role))) private _tokenRoles;

    /**
     * @dev Initializes the contract by granting the `Owner` role to the deployer.
     */
    function __FleekAccessControl_init() internal {
        _grantCollectionRole(Roles.Owner, msg.sender);
    }

    /**
     * @dev Checks if the `msg.sender` has a certain role.
     */
    modifier requireCollectionRole(Roles role) {
        require(
            hasCollectionRole(role, msg.sender) || hasCollectionRole(Roles.Owner, msg.sender),
            "FleekAccessControl: must have collection role"
        );
        _;
    }

    /**
     * @dev Checks if the `msg.sender` has the `Token` role for a certain `tokenId`.
     */
    modifier requireTokenRole(uint256 tokenId, Roles role) {
        require(
            hasTokenRole(tokenId, role, msg.sender) || hasTokenRole(tokenId, Roles.Owner, msg.sender),
            "FleekAccessControl: must have token role"
        );
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
    function grantCollectionRole(Roles role, address account) public requireCollectionRole(Roles.Owner) {
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
        Roles role,
        address account
    ) public requireTokenRole(tokenId, Roles.Owner) {
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
    function revokeCollectionRole(Roles role, address account) public requireCollectionRole(Roles.Owner) {
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
        Roles role,
        address account
    ) public requireTokenRole(tokenId, Roles.Owner) {
        _revokeTokenRole(tokenId, role, account);
    }

    /**
     * @dev Returns `True` if a certain address has the collection role.
     */
    function hasCollectionRole(Roles role, address account) public view returns (bool) {
        uint256 currentVersion = _collectionRolesVersion.current();

        return _collectionRoles[currentVersion][role].indexes[account] != 0;
    }

    /**
     * @dev Returns `True` if a certain address has the token role.
     */
    function hasTokenRole(uint256 tokenId, Roles role, address account) public view returns (bool) {
        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        return _tokenRoles[tokenId][currentVersion][role].indexes[account] != 0;
    }

    /**
     * @dev Returns an array of addresses that all have the collection role.
     */
    function getCollectionRoleMembers(Roles role) public view returns (address[] memory) {
        uint256 currentVersion = _collectionRolesVersion.current();
        return _collectionRoles[currentVersion][role].members;
    }

    /**
     * @dev Returns an array of addresses that all have the same token role for a certain tokenId.
     */
    function getTokenRoleMembers(uint256 tokenId, Roles role) public view returns (address[] memory) {
        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        return _tokenRoles[tokenId][currentVersion][role].members;
    }

    /**
     * @dev Grants the collection role to an address.
     */
    function _grantCollectionRole(Roles role, address account) internal {
        uint256 currentVersion = _collectionRolesVersion.current();
        _grantRole(_collectionRoles[currentVersion][role], account);
        emit CollectionRoleGranted(role, account, msg.sender);
    }

    /**
     * @dev Revokes the collection role of an address.
     */
    function _revokeCollectionRole(Roles role, address account) internal {
        uint256 currentVersion = _collectionRolesVersion.current();
        _revokeRole(_collectionRoles[currentVersion][role], account);
        emit CollectionRoleRevoked(role, account, msg.sender);
    }

    /**
     * @dev Grants the token role to an address.
     */
    function _grantTokenRole(uint256 tokenId, Roles role, address account) internal {
        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        _grantRole(_tokenRoles[tokenId][currentVersion][role], account);
        emit TokenRoleGranted(tokenId, role, account, msg.sender);
    }

    /**
     * @dev Revokes the token role of an address.
     */
    function _revokeTokenRole(uint256 tokenId, Roles role, address account) internal {
        uint256 currentVersion = _tokenRolesVersion[tokenId].current();
        _revokeRole(_tokenRoles[tokenId][currentVersion][role], account);
        emit TokenRoleRevoked(tokenId, role, account, msg.sender);
    }

    /**
     * @dev Grants a certain role to a certain address.
     */
    function _grantRole(Role storage role, address account) internal {
        if (role.indexes[account] == 0) {
            role.members.push(account);
            role.indexes[account] = role.members.length;
        }
    }

    /**
     * @dev Revokes a certain role from a certain address.
     */
    function _revokeRole(Role storage role, address account) internal {
        if (role.indexes[account] != 0) {
            uint256 index = role.indexes[account] - 1;
            uint256 lastIndex = role.members.length - 1;
            address lastAccount = role.members[lastIndex];

            role.members[index] = lastAccount;
            role.indexes[lastAccount] = index + 1;

            role.members.pop();
            delete role.indexes[account];
        }
    }

    /**
     * @dev Clears all token roles for a certain tokenId.
     * Should only be used for burning tokens.
     */
    function _clearAllTokenRoles(uint256 tokenId) internal {
        _tokenRolesVersion[tokenId].increment();
    }

    /**
     * @dev Clears all token roles for a certain tokenId and grants the owner role to a new address.
     * Should only be used for transferring tokens.
     */
    function _clearAllTokenRoles(uint256 tokenId, address newOwner) internal {
        _clearAllTokenRoles(tokenId);
        _grantTokenRole(tokenId, Roles.Owner, newOwner);
    }
}

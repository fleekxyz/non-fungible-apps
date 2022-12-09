// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

abstract contract FleekAccessControl {
    enum Roles {
        Owner,
        Controller
    }

    struct Role {
        mapping(address => uint256) indexes;
        address[] members;
    }

    // _collectionRoles[role]
    mapping(Roles => Role) private _collectionRoles;

    // _tokenRoles[tokenId][role]
    mapping(uint256 => mapping(Roles => Role)) private _tokenRoles;

    constructor() {
        _grantCollectionRole(Roles.Owner, msg.sender);
    }

    modifier requireCollectionRole(Roles role) {
        require(
            hasCollectionRole(role, msg.sender) ||
                hasCollectionRole(Roles.Owner, msg.sender),
            "FleekAccessControl: must have collection role"
        );
        _;
    }

    modifier requireTokenRole(uint256 tokenId, Roles role) {
        require(
            hasTokenRole(tokenId, role, msg.sender) ||
                hasTokenRole(tokenId, Roles.Owner, msg.sender),
            "FleekAccessControl: must have token role"
        );
        _;
    }

    function grantCollectionRole(
        Roles role,
        address account
    ) public requireCollectionRole(Roles.Owner) {
        _grantCollectionRole(role, account);
    }

    function grantTokenRole(
        uint256 tokenId,
        Roles role,
        address account
    ) public requireCollectionRole(Roles.Owner) {
        _grantTokenRole(tokenId, role, account);
    }

    function revokeCollectionRole(
        Roles role,
        address account
    ) public requireCollectionRole(Roles.Owner) {
        _revokeCollectionRole(role, account);
    }

    function revokeTokenRole(
        uint256 tokenId,
        Roles role,
        address account
    ) public requireCollectionRole(Roles.Owner) {
        _revokeTokenRole(tokenId, role, account);
    }

    function hasCollectionRole(
        Roles role,
        address account
    ) public view returns (bool) {
        return _collectionRoles[role].indexes[account] != 0;
    }

    function hasTokenRole(
        uint256 tokenId,
        Roles role,
        address account
    ) public view returns (bool) {
        return _tokenRoles[tokenId][role].indexes[account] != 0;
    }

    function getCollectionRoleMembers(
        Roles role
    ) public view returns (address[] memory) {
        return _collectionRoles[role].members;
    }

    function getTokenRoleMembers(
        uint256 tokenId,
        Roles role
    ) public view returns (address[] memory) {
        return _tokenRoles[tokenId][role].members;
    }

    function _grantCollectionRole(Roles role, address account) internal {
        _grantRole(_collectionRoles[role], account);
    }

    function _revokeCollectionRole(Roles role, address account) internal {
        _revokeRole(_collectionRoles[role], account);
    }

    function _grantTokenRole(
        uint256 tokenId,
        Roles role,
        address account
    ) internal {
        _grantRole(_tokenRoles[tokenId][role], account);
    }

    function _revokeTokenRole(
        uint256 tokenId,
        Roles role,
        address account
    ) internal {
        _revokeRole(_tokenRoles[tokenId][role], account);
    }

    function _grantRole(Role storage role, address account) internal {
        if (role.indexes[account] == 0) {
            role.members.push(account);
            role.indexes[account] = role.members.length;
        }
    }

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

    function _clearTokenRole(uint256 tokenId, Roles role) internal {
        delete _tokenRoles[tokenId][role];
    }

    function _clearAllTokenRoles(uint256 tokenId) internal {
        delete _tokenRoles[tokenId][Roles.Owner];
        delete _tokenRoles[tokenId][Roles.Controller];
    }
}

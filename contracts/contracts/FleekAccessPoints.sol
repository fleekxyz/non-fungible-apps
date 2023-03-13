// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import {FleekStrings} from "./util/FleekStrings.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error AccessPointNotExistent();
error AccessPointAlreadyExists();
error AccessPointScoreCannotBeLower();
error MustBeAccessPointOwner();
error InvalidTokenIdForAccessPoint();
error AccessPointCreationStatusAlreadySet();

abstract contract FleekAccessPoints is Initializable {
    using FleekStrings for FleekAccessPoints.AccessPoint;

    event NewAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);
    event RemoveAccessPoint(string apName, uint256 indexed tokenId, address indexed owner);

    event ChangeAccessPointScore(string apName, uint256 indexed tokenId, uint256 score, address indexed triggeredBy);

    event ChangeAccessPointNameVerify(
        string apName,
        uint256 tokenId,
        bool indexed verified,
        address indexed triggeredBy
    );
    event ChangeAccessPointContentVerify(
        string apName,
        uint256 tokenId,
        bool indexed verified,
        address indexed triggeredBy
    );
    event ChangeAccessPointCreationStatus(
        string apName,
        uint256 tokenId,
        AccessPointCreationStatus status,
        address indexed triggeredBy
    );

    /**
     * Creation status enums for access points
     */
    enum AccessPointCreationStatus {
        DRAFT,
        APPROVED,
        REJECTED,
        REMOVED
    }

    /**
     * The stored data for each AccessPoint.
     */
    struct AccessPoint {
        uint256 tokenId;
        uint256 score;
        bool contentVerified;
        bool nameVerified;
        address owner;
        AccessPointCreationStatus status;
    }

    mapping(string => AccessPoint) private _accessPoints;

    mapping(uint256 => bool) private _autoApproval;

    /**
     * @dev Checks if the AccessPoint exists.
     */
    modifier requireAP(string memory apName) {
        if (_accessPoints[apName].owner == address(0)) revert AccessPointNotExistent();
        _;
    }

    /**
     * @dev A view function to gether information about an AccessPoint.
     * It returns a JSON string representing the AccessPoint information.
     */
    function getAccessPointJSON(string memory apName) public view requireAP(apName) returns (string memory) {
        AccessPoint storage _ap = _accessPoints[apName];
        return _ap.toString();
    }

    /**
     * @dev A view function to check if a AccessPoint is verified.
     */
    function isAccessPointNameVerified(string memory apName) public view requireAP(apName) returns (bool) {
        return _accessPoints[apName].nameVerified;
    }

    /**
     * @dev Increases the score of a AccessPoint registry.
     */
    function increaseAccessPointScore(string memory apName) public requireAP(apName) {
        _accessPoints[apName].score++;
        emit ChangeAccessPointScore(apName, _accessPoints[apName].tokenId, _accessPoints[apName].score, msg.sender);
    }

    /**
     * @dev Decreases the score of a AccessPoint registry if is greater than 0.
     */
    function decreaseAccessPointScore(string memory apName) public requireAP(apName) {
        if (_accessPoints[apName].score == 0) revert AccessPointScoreCannotBeLower();
        _accessPoints[apName].score--;
        emit ChangeAccessPointScore(apName, _accessPoints[apName].tokenId, _accessPoints[apName].score, msg.sender);
    }

    /**
     * @dev Add a new AccessPoint register for an app token.
     * The AP name should be a DNS or ENS url and it should be unique.
     */
    function _addAccessPoint(uint256 tokenId, string memory apName) internal {
        if (_accessPoints[apName].owner != address(0)) revert AccessPointAlreadyExists();

        emit NewAccessPoint(apName, tokenId, msg.sender);

        if (_autoApproval[tokenId]) {
            // Auto Approval is on.
            _accessPoints[apName] = AccessPoint(
                tokenId,
                0,
                false,
                false,
                msg.sender,
                AccessPointCreationStatus.APPROVED
            );

            emit ChangeAccessPointCreationStatus(apName, tokenId, AccessPointCreationStatus.APPROVED, msg.sender);
        } else {
            // Auto Approval is off. Should wait for approval.
            _accessPoints[apName] = AccessPoint(tokenId, 0, false, false, msg.sender, AccessPointCreationStatus.DRAFT);
            emit ChangeAccessPointCreationStatus(apName, tokenId, AccessPointCreationStatus.DRAFT, msg.sender);
        }
    }

    /**
     * @dev Remove an AccessPoint registry for an app token.
     * It will also remove the AP from the app token APs list.
     */
    function _removeAccessPoint(string memory apName) internal requireAP(apName) {
        if (msg.sender != _accessPoints[apName].owner) revert MustBeAccessPointOwner();
        _accessPoints[apName].status = AccessPointCreationStatus.REMOVED;
        uint256 tokenId = _accessPoints[apName].tokenId;
        emit ChangeAccessPointCreationStatus(apName, tokenId, AccessPointCreationStatus.REMOVED, msg.sender);
        emit RemoveAccessPoint(apName, tokenId, msg.sender);
    }

    /**
     * @dev Updates the `accessPointAutoApproval` settings on minted `tokenId`.
     */
    function _setAccessPointAutoApproval(uint256 tokenId, bool _apAutoApproval) internal {
        _autoApproval[tokenId] = _apAutoApproval;
    }

    /**
     * @dev Set approval settings for an access point.
     * It will add the access point to the token's AP list, if `approved` is true.
     */
    function _setApprovalForAccessPoint(uint256 tokenId, string memory apName, bool approved) internal {
        AccessPoint storage accessPoint = _accessPoints[apName];
        if (accessPoint.tokenId != tokenId) revert InvalidTokenIdForAccessPoint();
        if (accessPoint.status != AccessPointCreationStatus.DRAFT) revert AccessPointCreationStatusAlreadySet();

        if (approved) {
            // Approval
            accessPoint.status = AccessPointCreationStatus.APPROVED;
            emit ChangeAccessPointCreationStatus(apName, tokenId, AccessPointCreationStatus.APPROVED, msg.sender);
        } else {
            // Not Approved
            accessPoint.status = AccessPointCreationStatus.REJECTED;
            emit ChangeAccessPointCreationStatus(apName, tokenId, AccessPointCreationStatus.REJECTED, msg.sender);
        }
    }

    /**
     * @dev Set the content verification of a AccessPoint registry.
     */
    function _setAccessPointContentVerify(string memory apName, bool verified) internal requireAP(apName) {
        _accessPoints[apName].contentVerified = verified;
        emit ChangeAccessPointContentVerify(apName, _accessPoints[apName].tokenId, verified, msg.sender);
    }

    /**
     * @dev Set the name verification of a AccessPoint registry.
     */
    function _setAccessPointNameVerify(string memory apName, bool verified) internal requireAP(apName) {
        _accessPoints[apName].nameVerified = verified;
        emit ChangeAccessPointNameVerify(apName, _accessPoints[apName].tokenId, verified, msg.sender);
    }

    /**
     * @dev Get the AccessPoint token id.
     */
    function _getAccessPointTokenId(string memory apName) internal view requireAP(apName) returns (uint256) {
        return _accessPoints[apName].tokenId;
    }

    /**
     * @dev Get the Auto Approval setting for token id.
     */
    function _getAccessPointAutoApproval(uint256 tokenId) internal view returns (bool) {
        return _autoApproval[tokenId];
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

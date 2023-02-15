// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error ContractIsPaused();
error ContractIsNotPaused();
error ContractIsNotPausable();
error PausableIsSetTo(bool state);

abstract contract FleekPausable is Initializable {
    /**
     * @dev Emitted when the pause is triggered by `account` and set to `isPaused`.
     */
    event PauseStatusChange(bool indexed isPaused, address account);

    /**
     * @dev Emitted when the pausable is triggered by `account` and set to `isPausable`.
     */
    event PausableStatusChange(bool indexed isPausable, address account);

    bool private _paused;
    bool private _canPause; // TODO: how should we verify if the contract is pausable or not?

    /**
     * @dev Initializes the contract in paused state.
     */
    function __FleekPausable_init() internal onlyInitializing {
        _paused = true;
        _canPause = true;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function isPaused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Returns true if the contract is pausable, and false otherwise.
     */
    function isPausable() public view virtual returns (bool) {
        return _canPause;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        if (isPaused()) revert ContractIsPaused();
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        if (!isPaused()) revert ContractIsNotPaused();
    }

    /**
     * @dev Throws if the contract is not pausable.
     */
    function _requirePausable() internal view virtual {
        if (!isPausable()) revert ContractIsNotPausable();
    }

    /**
     * @dev Sets the contract to be pausable or not.
     * @param canPause true if the contract is pausable, and false otherwise.
     */
    function _setPausable(bool canPause) internal virtual {
        if (canPause == _canPause) revert PausableIsSetTo(canPause);
        _canPause = canPause;
        emit PausableStatusChange(canPause, msg.sender);
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _requirePausable();
        _paused = true;
        emit PauseStatusChange(false, msg.sender);
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit PauseStatusChange(false, msg.sender);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error RequiredPayment(uint requiredValue);

abstract contract FleekBilling is Initializable {
    /**
     * @dev Available billing values.
     */
    enum Billing {
        Mint,
        AddAccessPoint
    }

    /**
     * @dev Emitted when the billing value is changed.
     */
    event BillingChanged(Billing key, uint256 price);

    /**
     * @dev Emitted when contract is withdrawn.
     */
    event Withdrawn(uint256 value, address indexed byAddress);

    /**
     * @dev Mapping of billing values.
     */
    mapping(Billing => uint256) public _billings;

    /**
     * @dev Initializes the contract by setting default billing values.
     */
    function __FleekBilling_init(uint256[] memory initialBillings) internal onlyInitializing {
        for (uint256 i = 0; i < initialBillings.length; i++) {
            _setBilling(Billing(i), initialBillings[i]);
        }
    }

    /**
     * @dev Returns the billing value for a given key.
     */
    function getBilling(Billing key) public view returns (uint256) {
        return _billings[key];
    }

    /**
     * @dev Sets the billing value for a given key.
     */
    function _setBilling(Billing key, uint256 price) internal {
        _billings[key] = price;
        emit BillingChanged(key, price);
    }

    /**
     * @dev Internal function to require a payment value.
     */
    function _requirePayment(Billing key) internal {
        uint256 requiredValue = _billings[key];
        if (msg.value != _billings[key]) revert RequiredPayment(requiredValue);
    }

    /**
     * @dev Internal function to withdraw the contract balance.
     */
    function _withdraw() internal {
        address by = msg.sender;
        uint256 value = address(this).balance;

        payable(by).transfer(value);
        emit Withdrawn(value, by);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error RequiredBillingValue(uint value);

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
     * @dev Mapping of billing values.
     */
    mapping(Billing => uint256) public _billings;

    /**
     * @dev Initializes the contract by setting default billing values.
     */
    function __FleekBilling_init() internal onlyInitializing {
        _setBilling(Billing.Mint, 0);
        _setBilling(Billing.AddAccessPoint, 0);
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
     * @dev Internal function to require a billing value.
     */
    function _requireBilling(Billing key) internal {
        uint256 requiredValue = _billings[key];
        if (msg.value != _billings[key]) revert RequiredBillingValue(requiredValue);
    }

    /**
     * @dev Internal function to withdraw the contract balance.
     */
    function _withdraw() internal {
        payable(msg.sender).transfer(address(this).balance);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

abstract contract FleekAccessControl {
    // EVENTS
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // STORAGE
    address internal constant SENTINEL_ADDRESS = address(0x1);
    address private _owner;

    mapping(uint256 => TokenControllers) private _tokenControllers;

    struct TokenControllers {
        mapping(address => address) controllers;
        uint256 controllerCount;
    }

    constructor() {
        _transferOwnership(msg.sender);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
    * @dev Required the sender to be the controller of the token
    */
    modifier requireTokenControllers(uint256 tokenId) {
        require(
            isTokenController(msg.sender, tokenId),
            "FleekAccessControl: must have token role"
        );
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Returns whether an address is the controller of a token
     */
    function isTokenController(address controller, uint256 tokenId) public view returns (bool) {
        return  _tokenControllers[tokenId].controllers[controller] != address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /// @dev Returns array of owners.
    /// @return Array of token owners.
    function getTokenOwners(uint256 tokenId) public view returns (address[] memory) {
        uint256 length = _tokenControllers[tokenId].controllerCount;
        address[] memory array = new address[](length);
        if (length == 0){
            return array;
        }

        // populate return array
        uint256 index = 0;
        address currentOwner = _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS];
        while (currentOwner != SENTINEL_ADDRESS) {
            array[index] = currentOwner;
            currentOwner = _tokenControllers[tokenId].controllers[currentOwner];
            index++;
        }
        return array;
    }

    /**
     * @dev Adds the address as a controller of a token. No owner permissions are checked here should be called at top level and checked
     * address being valid and not already are a controller are checked here. 
     * @param tokenId The token to add the controller to
     * @param controller The address to add as a controller
     */
    function _grantTokenControllerRole(uint256 tokenId, address controller) internal virtual {
        require(controller != SENTINEL_ADDRESS, "FleekAccessControl: controller address is invalid");
        require(controller != address(0), "FleekAccessControl: controller is the zero address");
        require(_tokenControllers[tokenId].controllers[controller] == address(0), "FleekAccessControl: controller already has role");

        //If the sentinal address is not set it means there is no controllers yet, so start the link list by setting the sentinal address to the controller
        // and the controller back to the sentinal address
        if (_tokenControllers[tokenId].controllers[SENTINEL_ADDRESS] == address(0)) {
            _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS] = controller;
            _tokenControllers[tokenId].controllers[controller] = SENTINEL_ADDRESS;
            _tokenControllers[tokenId].controllerCount++;
        } else {
            _tokenControllers[tokenId].controllers[controller] = _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS];
            _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS] = controller;
            _tokenControllers[tokenId].controllerCount++;
        }
    }

    /**
     * @dev Removes the address as a controller of a token. No owner permissions are checked here should be called at top level and checked
     * address being valid and not already are a controller are checked here. 
     * @param tokenId The token to remove the controller from
     * @param controller The address to remove as a controller
     */
     function _revokeTokenControllerRole(uint256 tokenId, address controller) internal virtual {
        require(controller != SENTINEL_ADDRESS, "FleekAccessControl: controller address is invalid");
        require(_tokenControllers[tokenId].controllers[controller] != address(0), "FleekAccessControl: controller does not have role");

        //@notice We need to get the previous controller in the link list before we remove the controller
        // This function could be cheaper if we added that as a parameter and figured this out elsewhere
        address previousOwner = _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS];
        while (_tokenControllers[tokenId].controllers[previousOwner] != controller) {
            previousOwner = _tokenControllers[tokenId].controllers[previousOwner];
        }
        _tokenControllers[tokenId].controllers[previousOwner] = _tokenControllers[tokenId].controllers[controller];
        _tokenControllers[tokenId].controllers[controller] = address(0);
        _tokenControllers[tokenId].controllerCount--;
     }

    /**
     * @dev Removes all controllers of a token. 
     * @param tokenId The token to remove the controller from
     */
     function _clearAllTokenControllers(uint256 tokenId) internal virtual {
        address currentController = _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS];
        address nextController = _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS];
        while (currentController != SENTINEL_ADDRESS) {
            nextController = _tokenControllers[tokenId].controllers[currentController];
            _tokenControllers[tokenId].controllers[currentController] = address(0);
            currentController = nextController;
        }
        _tokenControllers[tokenId].controllers[SENTINEL_ADDRESS] = address(0);
        _tokenControllers[tokenId].controllerCount = 0;
     }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == msg.sender, "caller is not the owner");
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

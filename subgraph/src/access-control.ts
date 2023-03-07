import {
    Address,
    Bytes,
    log,
    store,
    ethereum,
    BigInt,
} from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
    TokenRoleChanged as TokenRoleChangedEvent,
    CollectionRoleChanged as CollectionRoleChangedEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    Owner,
    Token,
} from '../generated/schema';

enum CollectionRoles {
    Owner,
}

enum TokenRoles {
    Controller,
}

export function handleCollectionRoleChanged(
    event: CollectionRoleChangedEvent
): void {
    let toAddress = event.params.toAddress;
    let byAddress = event.params.byAddress;
    let role = event.params.role;
    let status = event.params.status;

    if (role === CollectionRoles.Owner) {
        // Owner role
        if (status) {
            // granted
            let owner = Owner.load(toAddress);
            if (!owner) {
                owner = new Owner(toAddress);
            }
            owner.collection = true;
            owner.save();
        } else {
            // revoked
            let owner = Owner.load(toAddress);
            if (!owner) {
                log.error(
                    'Owner entity not found. Role: {}, byAddress: {}, toAddress: {}',
                    [role.toString(), byAddress.toHexString(), toAddress.toHexString()]
                );
                return;
            }
            owner.collection = false;
            owner.save();
        }
    } else {
        log.error('Role not supported. Role: {}, byAddress: {}, toAddress: {}', [
            role.toString(),
            byAddress.toHexString(),
            toAddress.toHexString(),
        ]);
    }
}

export function handleTokenRoleChanged(event: TokenRoleChangedEvent): void {
    let tokenId = event.params.tokenId;
    let toAddress = event.params.toAddress;
    let byAddress = event.params.byAddress;
    let role = event.params.role;
    let status = event.params.status;

    // load token
    let token = Token.load(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));
    if (!token) {
        log.error('Token not found. TokenId: {}', [tokenId.toString()]);
        return;
    }

    if (role === TokenRoles.Controller) {
        // Controller role
        // get the list of controllers.
        let token_controllers = token.controllers;
        if (!token_controllers) {
            token_controllers = [];
        }
        if (status) {
            // granted
            token_controllers.push(toAddress);
        } else {
            // revoked
            // remove address from the controllers list
            const index = token_controllers.indexOf(event.params.toAddress, 0);
            if (index > -1) {
                token_controllers.splice(index, 1);
            }
        }
        token.controllers = token_controllers;
    } else {
        log.error('Role not supported. Role: {}, byAddress: {}, toAddress: {}', [
            role.toString(),
            byAddress.toHexString(),
            toAddress.toHexString(),
        ]);
    }
}
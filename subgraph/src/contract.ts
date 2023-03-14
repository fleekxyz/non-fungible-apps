import {
    log,
    ethereum,
} from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
    Initialized as InitializedEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    Owner,
} from '../generated/schema';
export function handleInitialized(event: InitializedEvent): void {
    // This is the contract creation transaction.
    log.warning('This is the contract creation transaction.', []);
    if (event.receipt) {
        let receipt = event.receipt as ethereum.TransactionReceipt;
        log.warning('Contract address is: {}', [
            receipt.contractAddress.toHexString(),
        ]);

        // add owner
        let owner = new Owner(event.transaction.from);
        owner.collection = true;
        owner.save();
    }
}
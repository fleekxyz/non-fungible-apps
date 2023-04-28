import { log, ethereum, BigInt } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import { Initialized as InitializedEvent } from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import { Collection, Owner, Verifier } from '../generated/schema';
export function handleInitialized(event: InitializedEvent): void {
  // This is the contract creation transaction.
  log.warning('This is the contract creation transaction.', []);
  if (event.receipt) {
    const receipt = event.receipt as ethereum.TransactionReceipt;
    log.warning('Contract address is: {}', [
      receipt.contractAddress.toHexString(),
    ]);

    // start collection entity
    const collection = new Collection(event.address.toHexString());
    collection.totalTokens = BigInt.fromU32(0);
    collection.save();

    // add owner
    const owner = new Owner(event.transaction.from);
    owner.collection = true;
    owner.save();

    // add verifier
    const verifier = new Verifier(event.transaction.from);
    verifier.save();
  }
}

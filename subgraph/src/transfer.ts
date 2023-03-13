import {
    Bytes,
    log,
} from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
    Transfer as TransferEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    Owner,
    Token,
    Transfer,
} from '../generated/schema';

export function handleTransfer(event: TransferEvent): void {
    let entity = new Transfer(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    entity.from = event.params.from;
    entity.to = event.params.to;
    entity.tokenId = event.params.tokenId;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    let token: Token | null;

    let owner_address = event.params.to;
    let owner = Owner.load(owner_address);

    if (!owner) {
        // Create a new owner entity
        owner = new Owner(owner_address);
    }

    if (parseInt(event.params.from.toHexString()) !== 0) {
        // Transfer

        // Load the Token by using its TokenId
        token = Token.load(
            Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
        );

        if (token) {
            // Entity exists
            token.owner = owner_address;

            // Save both entities
            owner.save();
            token.save();
        } else {
            // Entity does not exist
            log.error('Unknown token was transferred.', []);
        }
    }
}
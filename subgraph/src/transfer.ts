import {
    Bytes,
    log,
    store
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
    let transfer = new Transfer(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
    
    const TokenId = event.params.tokenId;
    
    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.tokenId = TokenId;
  
    transfer.blockNumber = event.block.number;
    transfer.blockTimestamp = event.block.timestamp;
    transfer.transactionHash = event.transaction.hash;
  
    transfer.save();
  
    let token: Token | null;
  
    let owner_address = event.params.to;
    let owner = Owner.load(owner_address);
  
    if (!owner) {
      // Create a new owner entity
      owner = new Owner(owner_address);
    }
  
    if (parseInt(event.params.from.toHexString()) !== 0) {
      if (parseInt(event.params.to.toHexString()) === 0) {
        // Burn
        // Remove the entity from storage
        // Its controllers and owner will be affected.
        store.remove('Token', TokenId.toString());
      } else {
        // Transfer
        // Load the Token by using its TokenId
        token = Token.load(
          Bytes.fromByteArray(Bytes.fromBigInt(TokenId))
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
  }
 

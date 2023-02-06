import { Address, log, store, ethereum } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  CollectionRoleGranted as CollectionRoleGrantedEvent,
  CollectionRoleRevoked as CollectionRoleRevokedEvent,
  FleekNFA,
  NewBuild as NewBuildEvent,
  NewTokenDescription as NewTokenDescriptionEvent,
  NewTokenENS as NewTokenENSEvent,
  NewTokenExternalURL as NewTokenExternalURLEvent,
  NewTokenImage as NewTokenImageEvent,
  NewTokenName as NewTokenNameEvent,
  TokenRoleGranted as TokenRoleGrantedEvent,
  TokenRoleRevoked as TokenRoleRevokedEvent,
  Transfer as TransferEvent,
} from '../generated/FleekNFA/FleekNFA';
import {
  Approval,
  ApprovalForAll,
  Collection,
  CollectionOwner,
  CollectionRoleGranted,
  CollectionRoleRevoked,
  Holder,
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenImage,
  NewTokenName,
  Token,
  TokenRoleGranted,
  TokenRoleRevoked,
  Transfer,
} from '../generated/schema';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectionRoleGranted(
  event: CollectionRoleGrantedEvent
): void {
  let entity = new CollectionRoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.toAddress = event.params.toAddress;
  entity.byAddress = event.params.byAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  if (event.params.role === 0) {
    // Role 0 => Owner [Probably going to change this after the ACL refactor.]
    // Should create a new CollectionOwner entity with the address from the parameters.
    // If it already is a collection owner, should log a warning.

    let collectionOwner = CollectionOwner.load(event.params.toAddress);

    if (collectionOwner) {
      // Collection Owner already exists.
      // Print warning log message.
      log.warning(
        'Although Address {} is already a collection owner, a CollectionRoleGranted event was emitted that indicated the address was granted the same role, again.',
        [event.params.toAddress.toHexString()]
      );
    } else {
      // Create a new collection owner entity and assign the values
      collectionOwner = new CollectionOwner(event.params.toAddress);
      collectionOwner.accessGrantedBy = event.params.byAddress;
      collectionOwner.transactionHash = event.transaction.hash;

      // Log the new CollectionOwner entity creation.
      log.info('Created a new collection owner entity with address {}.', [
        event.params.toAddress.toHexString(),
      ]);

      // Save the collection owner.
      collectionOwner.save();
    }

    if (event.params.byAddress === event.params.toAddress) {
      // This is the contract creation transaction.
      log.warning('This is the contract creation transaction.', []);
      if (event.receipt) {
        let receipt = event.receipt as ethereum.TransactionReceipt;
        log.warning('Contract address is: {}', [
          receipt.contractAddress.toHexString(),
        ]);
        let collection = new Collection(receipt.contractAddress);
        collection.deployer = event.params.byAddress;
        collection.transactionHash = event.transaction.hash;
        collection.owners = [event.params.toAddress];
        collection.save();
      }
    }
  }
}

export function handleCollectionRoleRevoked(
  event: CollectionRoleRevokedEvent
): void {
  let entity = new CollectionRoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.toAddress = event.params.toAddress;
  entity.byAddress = event.params.byAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  if (event.params.role === 0) {
    // Role 0 => Owner [Probably going to change this after the ACL refactor.]
    // Should remove the CollectionOwner entity.

    store.remove('CollectionOwner', event.params.toAddress.toHexString());
  }
}

export function handleNewBuild(event: NewBuildEvent): void {
  let entity = new NewBuild(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.commitHash = event.params.commitHash.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewTokenDescription(
  event: NewTokenDescriptionEvent
): void {
  let entity = new NewTokenDescription(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.description = event.params.description.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewTokenENS(event: NewTokenENSEvent): void {
  let entity = new NewTokenENS(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.ENS = event.params.ENS.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewTokenExternalURL(
  event: NewTokenExternalURLEvent
): void {
  let entity = new NewTokenExternalURL(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.externalURL = event.params.externalURL.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewTokenImage(event: NewTokenImageEvent): void {
  let entity = new NewTokenImage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.image = event.params.image.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewTokenName(event: NewTokenNameEvent): void {
  let entity = new NewTokenName(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.name = event.params.name.toString();
  entity.triggeredBy = event.params.triggeredBy;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenRoleGranted(event: TokenRoleGrantedEvent): void {
  let entity = new TokenRoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.role = event.params.role;
  entity.toAddress = event.params.toAddress;
  entity.byAddress = event.params.byAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenRoleRevoked(event: TokenRoleRevokedEvent): void {
  let entity = new TokenRoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.role = event.params.role;
  entity.toAddress = event.params.toAddress;
  entity.byAddress = event.params.byAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

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

  if (parseInt(event.params.from.toHexString()) === 0) {
    // This is a new mint

    let id = event.transaction.hash;
    let token = new Token(id);
    let owner = event.params.to;

    let holder = Holder.load(owner);

    if (!holder) {
      // Create a new holder entity
      holder = new Holder(owner);
    }

    token.owner = owner;
    token.mintedBy = event.transaction.from;
    token.tokenId = event.params.tokenId;

    holder.save();
    token.save();
  }
}

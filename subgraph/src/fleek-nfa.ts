import { Address, log } from '@graphprotocol/graph-ts';
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
  NewTokenImage as NewTokenLogoEvent,
  NewTokenName as NewTokenNameEvent,
  TokenRoleGranted as TokenRoleGrantedEvent,
  TokenRoleRevoked as TokenRoleRevokedEvent,
  Transfer as TransferEvent,
} from '../generated/FleekNFA/FleekNFA';
import {
  Approval,
  ApprovalForAll,
  CollectionRoleGranted,
  CollectionRoleRevoked,
  Holder,
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenLogo,
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

export function handleNewTokenLogo(event: NewTokenLogoEvent): void {
  let entity = new NewTokenLogo(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.token = event.params.token;
  entity.logo = event.params.image.toString();
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
    token.minted_by = event.transaction.from;
    token.tokenId = event.params.tokenId;

    holder.save();
    token.save();
  }
}

import { Address, Bytes, log } from '@graphprotocol/graph-ts';
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
  CollectionRoleGranted,
  CollectionRoleRevoked,
  Controller,
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

  if (event.params.role === 1) {
    // This is a new controller being added to a token.
    // First we add the controller to the token's list of controllers.
    // Then we create a new controller entity.

    let token = Token.load(
      Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
    );
    let controller = Controller.load(event.params.toAddress);

    if (!controller) {
      // Create a new controller entity
      log.debug('CONTROLLER IS GOING TO BE CREATED HERE.', []);
      controller = new Controller(event.params.toAddress);
    }

    if (token !== null) {
      let token_controllers = token.controllers;
      if (!token_controllers) {
        token_controllers = [];
      }
      token_controllers.push(event.params.toAddress);
      token.controllers = token_controllers;
    } else {
      log.error(
        'Controller access granted for tokenId {}. THE TOKEN DOES NOT EXIST. FAILED TO UPDATE THE TOKEN ENTITY.',
        [event.params.tokenId.toHexString()]
      );
      return;
    }

    controller.save();
    token.save();
  }
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

  if (event.params.role === 1) {
    // This is a controller being removed from a token.

    // Load the token with the tokenId.
    let token = Token.load(
      Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
    );

    // Check if the token entity exists.
    if (token !== null) {
      // get the list of controllers.
      let token_controllers = token.controllers;
      if (!token_controllers) {
        token_controllers = [];
      }

      // remove address from the controllers list
      const index = token_controllers.indexOf(event.params.toAddress, 0);
      if (index > -1) {
        token_controllers.splice(index, 1);
      }

      // assign the new controllers list
      token.controllers = token_controllers;
    } else {
      // the token does not exist
      log.error(
        'Controller access removed from tokenId {}. THE TOKEN DOES NOT EXIST. FAILED TO UPDATE THE TOKEN ENTITY.',
        [event.params.tokenId.toHexString()]
      );
      return;
    }

    // save the token data
    token.save();
  }
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

import { Address, Bytes, log, store } from '@graphprotocol/graph-ts';
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
  NewTokenLogo as NewTokenLogoEvent,
  NewTokenName as NewTokenNameEvent,
  TokenRoleGranted as TokenRoleGrantedEvent,
  TokenRoleRevoked as TokenRoleRevokedEvent,
  Transfer as TransferEvent,
} from '../generated/FleekNFA/FleekNFA';
import {
  Approval,
  ApprovalForAll,
  CollectionOwner,
  CollectionRoleGranted,
  CollectionRoleRevoked,
  Controller,
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenLogo,
  NewTokenName,
  Owner,
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
  entity.token = event.params.tokenId;
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
  entity.token = event.params.tokenId;
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
  entity.token = event.params.tokenId;
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
  entity.token = event.params.tokenId;
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
  entity.token = event.params.tokenId;
  entity.logo = event.params.logo.toString();
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
  entity.token = event.params.tokenId;
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
        'Handling controller access granted event for tokenId {}. THE TOKEN DOES NOT EXIST. FAILED TO UPDATE THE TOKEN ENTITY.',
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
        'Handling controller access revoked event for tokenId {}. THE TOKEN DOES NOT EXIST. FAILED TO UPDATE THE TOKEN ENTITY.',
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

  let token: Token | null;

  let owner_address = event.params.to;
  let owner = Owner.load(owner_address);

  if (!owner) {
    // Create a new owner entity
    owner = new Owner(owner_address);
  }

  if (parseInt(event.params.from.toHexString()) === 0) {
    // MINT

    // Create a new Token entity
    token = new Token(
      Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
    );

    // Populate Token with data from the event
    token.owner = owner_address;
    token.mint_transaction_hash = event.transaction.hash;
    token.minted_by = event.transaction.from;
    token.tokenId = event.params.tokenId;

    // Save both entities
    owner.save();
    token.save();
  } else {
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

import { Address, Bytes, log, store, ethereum } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  CollectionRoleGranted as CollectionRoleGrantedEvent,
  CollectionRoleRevoked as CollectionRoleRevokedEvent,
  MetadataUpdate as MetadataUpdateEvent,
  MetadataUpdate1 as MetadataUpdateEvent1,
  MetadataUpdate2 as MetadataUpdateEvent2,
  TokenRoleGranted as TokenRoleGrantedEvent,
  TokenRoleRevoked as TokenRoleRevokedEvent,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
} from '../generated/FleekNFA/FleekNFA';
import {
  Approval,
  ApprovalForAll,
  Collection,
  CollectionOwner,
  CollectionRoleGranted,
  CollectionRoleRevoked,
  Controller,
  GitRepository as GitRepositoryEntity,
  MetadataUpdate,
  NewMint,
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
export function handleNewMint(event: NewMintEvent): void {
  let newMintEntity = new NewMint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  let name = event.params.name;
  let description = event.params.description;
  let externalURL = event.params.externalURL;
  let ENS = event.params.ENS;
  let gitRepository = event.params.gitRepository;
  let commitHash = event.params.commitHash;
  let logo = event.params.logo;
  let color = event.params.color;
  let accessPointAutoApproval = event.params.accessPointAutoApproval;
  let tokenId = event.params.tokenId;
  let ownerAddress = event.params.owner;

  newMintEntity.tokenId = tokenId;
  newMintEntity.name = name;
  newMintEntity.description = description;
  newMintEntity.externalURL = externalURL;
  newMintEntity.ENS = ENS;
  newMintEntity.commitHash = commitHash;
  newMintEntity.gitRepository = gitRepository;
  newMintEntity.logo = logo;
  newMintEntity.color = color;
  newMintEntity.accessPointAutoApproval = accessPointAutoApproval;
  newMintEntity.triggeredBy = event.params.minter;
  newMintEntity.tokenOwner = ownerAddress;
  newMintEntity.blockNumber = event.block.number;
  newMintEntity.blockTimestamp = event.block.timestamp;
  newMintEntity.transactionHash = event.transaction.hash;
  newMintEntity.save();

  // Create Token, Owner, and Controller entities

  let owner = Owner.load(ownerAddress);
  let controller = Controller.load(ownerAddress);
  let gitRepositoryEntity = GitRepositoryEntity.load(gitRepository);
  let token = new Token(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));

  if (!owner) {
    // Create a new owner entity
    owner = new Owner(ownerAddress);
  }

  if (!controller) {
    // Create a new controller entity
    controller = new Controller(ownerAddress);
  }

  if (!gitRepositoryEntity) {
    // Create a new gitRepository entity
    gitRepositoryEntity = new GitRepositoryEntity(gitRepository);
  }

  // Populate Token with data from the event
  token.tokenId = tokenId;
  token.name = name;
  token.description = description;
  token.externalURL = externalURL;
  token.ENS = ENS;
  token.gitRepository = gitRepository;
  token.commitHash = commitHash;
  token.logo = logo;
  token.color = color;
  token.accessPointAutoApproval = accessPointAutoApproval;
  token.owner = ownerAddress;
  token.mintTransaction = event.transaction.hash.concatI32(
    event.logIndex.toI32()
  );
  token.mintedBy = event.params.minter;
  token.controllers = [ownerAddress];

  // Save entities
  owner.save();
  controller.save();
  gitRepositoryEntity.save();
  token.save();
}

export function handleMetadataUpdateWithStringValue(
  event: MetadataUpdateEvent
): void {
  /**
   * Metadata handled here:
   * setTokenExternalURL
   * setTokenENS
   * setTokenName
   * setTokenDescription
   * setTokenLogo
   * */
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.tokenId = event.params._tokenId;
  entity.key = event.params.key;
  entity.stringValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // UPDATE TOKEN
  let token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'externalURL') {
      token.externalURL = event.params.value;
    } else if (event.params.key == 'ENS') {
      token.ENS = event.params.value;
    } else if (event.params.key == 'name') {
      token.name = event.params.value;
    } else if (event.params.key == 'description') {
      token.description = event.params.value;
    } else {
      // logo
      token.logo = event.params.value;
    }
    token.save();
  }
}

export function handleMetadataUpdateWithDoubleStringValue(
  event: MetadataUpdateEvent2
): void {
  /**
   * setTokenBuild
   */
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.doubleStringValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // UPDATE TOKEN
  let token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'build') {
      let gitRepositoryEntity = GitRepositoryEntity.load(event.params.value[1]);
      if (!gitRepositoryEntity) {
        // Create a new gitRepository entity
        gitRepositoryEntity = new GitRepositoryEntity(event.params.value[1]);
      }
      token.commitHash = event.params.value[0];
      token.gitRepository = event.params.value[1];
      token.save();
      gitRepositoryEntity.save();
    }
  }
}

export function handleMetadataUpdateWithIntValue(
  event: MetadataUpdateEvent1
): void {
  /**
   * setTokenColor
   */
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.uint24Value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'color') {
      token.color = event.params.value;
    }
    token.save();
  }
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

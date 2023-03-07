import { Address, Bytes, log, store, ethereum, BigInt } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MetadataUpdate as MetadataUpdateEvent,
  MetadataUpdate1 as MetadataUpdateEvent1,
  MetadataUpdate2 as MetadataUpdateEvent2,
  TokenRoleChanged as TokenRoleChangedEvent,
  MetadataUpdate3 as MetadataUpdateEvent3,
  CollectionRoleChanged as CollectionRoleChangedEvent,
  Initialized as InitializedEvent,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
  ChangeAccessPointCreationStatus as ChangeAccessPointCreationStatusEvent,
  ChangeAccessPointScore as ChangeAccessPointCreationScoreEvent,
  NewAccessPoint as NewAccessPointEvent,
  ChangeAccessPointNameVerify as ChangeAccessPointNameVerifyEvent,
  ChangeAccessPointContentVerify as ChangeAccessPointContentVerifyEvent,
  TokenRolesCleared as TokenRolesClearedEvent
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
  AccessPoint,
  Approval,
  ApprovalForAll,
  Controller,
  Owner,
  GitRepository as GitRepositoryEntity,
  MetadataUpdate,
  NewMint,
  Token,
  Transfer,
} from '../generated/schema';

enum CollectionRoles {
  Owner,
};

enum TokenRoles {
  Controller,
};

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
  newMintEntity.owner = ownerAddress;
  newMintEntity.blockNumber = event.block.number;
  newMintEntity.blockTimestamp = event.block.timestamp;
  newMintEntity.transactionHash = event.transaction.hash;
  newMintEntity.save();
  log.error('{}', [tokenId.toString()]);

  // Create Token, Owner, and Controller entities

  let owner = Owner.load(ownerAddress);
  let gitRepositoryEntity = GitRepositoryEntity.load(gitRepository);
  let token = new Token(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));

  if (!owner) {
    // Create a new owner entity
    owner = new Owner(ownerAddress);
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

export function handleTokenRolesCleared(event: TokenRolesClearedEvent): void {
  let tokenId = event.params.tokenId;
  let byAddress = event.params.byAddress;

  // load token
  let token = Token.load(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));
  if (!token) {
    log.error('Token not found. TokenId: {}', [tokenId.toString()]);
    return;
  }

  // get the list of controllers.
  let token_controllers = token.controllers;
  token_controllers = [];
  token.controllers = token_controllers;
  token.save();
}

export function handleCollectionRoleChanged(event: CollectionRoleChangedEvent): void {
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
        log.error('Owner entity not found. Role: {}, byAddress: {}, toAddress: {}', [role.toString(), byAddress.toHexString(), toAddress.toHexString()]);
        return;
      }
      owner.collection = false;
      owner.save();
    }
  } else {
    log.error('Role not supported. Role: {}, byAddress: {}, toAddress: {}', [role.toString(), byAddress.toHexString(), toAddress.toHexString()]);
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
    token.save();
  } else {
    log.error('Role not supported. Role: {}, byAddress: {}, toAddress: {}', [role.toString(), byAddress.toHexString(), toAddress.toHexString()]);
  }
}

export function handleMetadataUpdateWithBooleanValue(event: MetadataUpdateEvent3): void {
  /**
   * accessPointAutoApproval
   */
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.booleanValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let token = Token.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId)));

  if (token) {
    if (event.params.key == 'accessPointAutoApproval') {
      token.accessPointAutoApproval = event.params.value;
    }
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

/**
   * This handler will create and load entities in the following order:
   * - AccessPoint [create]
   * - Owner [load / create]
   * Note to discuss later: Should a `NewAccessPoint` entity be also created and defined?
   */
 export function handleNewAccessPoint(event: NewAccessPointEvent): void {
  // Create an AccessPoint entity
  let accessPointEntity = new AccessPoint(event.params.apName);
  accessPointEntity.score = BigInt.fromU32(0);
  accessPointEntity.contentVerified = false;
  accessPointEntity.nameVerified = false;
  accessPointEntity.creationStatus = 'DRAFT'; // Since a `ChangeAccessPointCreationStatus` event is emitted instantly after `NewAccessPoint`, the status will be updated in that handler.
  accessPointEntity.owner = event.params.owner;
  accessPointEntity.token = Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId));

  // Load / Create an Owner entity
  let ownerEntity = Owner.load(event.params.owner);

  if (!ownerEntity) {
    // Create a new owner entity
    ownerEntity = new Owner(event.params.owner);
  }

  // Save entities.
  accessPointEntity.save();
  ownerEntity.save();
}

/**
 * This handler will update the status of an access point entity.
 */
export function handleChangeAccessPointCreationStatus(event: ChangeAccessPointCreationStatusEvent): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);
  let status = event.params.status;

  if (accessPointEntity) {
    switch (status) {
      case 0:
        accessPointEntity.creationStatus = 'DRAFT';
        break;
      case 1:
        accessPointEntity.creationStatus = 'APPROVED';
        break;
      case 2:
        accessPointEntity.creationStatus = 'REJECTED';
        break;
      case 3:
        accessPointEntity.creationStatus = 'REMOVED';
        break;
      default:
        // Unknown status
        log.error('Unable to handle ChangeAccessPointCreationStatus. Unknown status. Status: {}, AccessPoint: {}', [status.toString(), event.params.apName]);
    }

    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error('Unable to handle ChangeAccessPointCreationStatus. Unknown access point. Status: {}, AccessPoint: {}', [status.toString(), event.params.apName]);
  }
}

/**
 * This handler will update the score of an access point entity.
 */
 export function handleChangeAccessPointScore(event: ChangeAccessPointCreationScoreEvent): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.score = event.params.score;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error('Unable to handle ChangeAccessPointScore. Unknown access point. Score: {}, AccessPoint: {}', [event.params.score.toString(), event.params.apName]);
  }
}

/**
 * This handler will update the nameVerified field of an access point entity.
 */
 export function handleChangeAccessPointNameVerify(event: ChangeAccessPointNameVerifyEvent): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.nameVerified = event.params.verified;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error('Unable to handle ChangeAccessPointNameVerify. Unknown access point. Verified: {}, AccessPoint: {}', [event.params.verified.toString(), event.params.apName]);
  }
}

/**
 * This handler will update the contentVerified field of an access point entity.
 */
 export function handleChangeAccessPointContentVerify(event: ChangeAccessPointContentVerifyEvent): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.contentVerified = event.params.verified;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error('Unable to handle ChangeAccessPointContentVerify. Unknown access point. Verified: {}, AccessPoint: {}', [event.params.verified.toString(), event.params.apName]);
  }
}

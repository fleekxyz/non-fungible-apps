import { Address, Bytes, log, store, ethereum } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MetadataUpdate as MetadataUpdateEvent,
  MetadataUpdate1 as MetadataUpdateEvent1,
  MetadataUpdate2 as MetadataUpdateEvent2,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
  TokenRoleChanged as TokenRoleChangedEvent,
  CollectionRoleChanged as CollectionRoleChangedEvent,
  Initialized as InitializedEvent
} from '../generated/FleekNFA/FleekNFA';
import {
  Approval,
  ApprovalForAll,
  Collection,
  GitRepository as GitRepositoryEntity,
  MetadataUpdate,
  NewMint,
  TokenOwner,
  Token,
  Transfer,
  CollectionOwner,
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

  let owner = TokenOwner.load(ownerAddress);
  let controller = Controller.load(ownerAddress);
  let gitRepositoryEntity = GitRepositoryEntity.load(gitRepository);
  let token = new Token(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));

  if (!owner) {
    // Create a new owner entity
    owner = new TokenOwner(ownerAddress);
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
  token.tokenOwner = ownerAddress;
  token.mintTransaction = event.transaction.hash.concatI32(
    event.logIndex.toI32()
  );
  token.mintedBy = event.params.minter;
  token.tokenControllers = [ownerAddress];

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

export function handleInitialized(event: InitializedEvent): void {
    // This is the contract creation transaction.
    log.warning('This is the contract creation transaction.', []);
    if (event.receipt) {
      let receipt = event.receipt as ethereum.TransactionReceipt;
      log.warning('Contract address is: {}', [
        receipt.contractAddress.toHexString(),
      ]);
      let collection = new Collection(receipt.contractAddress);
      collection.deployer = event.transaction.from;
      collection.save();

      // add owner
      let owner = new CollectionOwner(event.transaction.from);
      owner.accessGrantedBy = event.transaction.from;
      owner.save();
    }
}

export function handleCollectionRoleChanged(event: CollectionRoleChangedEvent): void {
  let toAddress = event.params.toAddress;
  let byAddress = event.params.byAddress;
  let role = event.params.role;
  let status = event.params.status;
  
  if (role == 0) {
    // Owner role
    if (status) {
      // granted
      let owner = new CollectionOwner(toAddress);
      owner.accessGrantedBy = byAddress;
      owner.save();
    } else {
      // revoked
      store.remove('CollectionOwner', toAddress.toHexString());
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

  if (role == 0) {
    // Controller role
    // get the list of controllers.
    let token_controllers = token.tokenControllers;
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
    token.tokenControllers = token_controllers;
  } else {
    log.error('Role not supported. Role: {}, byAddress: {}, toAddress: {}', [role.toString(), byAddress.toHexString(), toAddress.toHexString()]);
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
  let owner = TokenOwner.load(owner_address);

  if (!owner) {
    // Create a new owner entity
    owner = new TokenOwner(owner_address);
  }

  if (parseInt(event.params.from.toHexString()) !== 0) {
    // Transfer

    // Load the Token by using its TokenId
    token = Token.load(
      Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
    );

    if (token) {
      // Entity exists
      token.tokenOwner = owner_address;

      // Save both entities
      owner.save();
      token.save();
    } else {
      // Entity does not exist
      log.error('Unknown token was transferred.', []);
    }
  }
}

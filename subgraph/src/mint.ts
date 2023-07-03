import { BigInt, Bytes, log } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import { NewMint as NewMintEvent } from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
  Owner,
  NewMint,
  Token,
  GitRepository,
  Collection,
  Verifier,
  Build,
} from '../generated/schema';

export function handleNewMint(event: NewMintEvent): void {
  const newMintEntity = new NewMint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  const name = event.params.name;
  const description = event.params.description;
  const externalURL = event.params.externalURL;
  const ENS = event.params.ENS;
  const gitRepository = event.params.gitRepository;
  const ipfsHash = event.params.ipfsHash;
  const commitHash = event.params.commitHash;
  const logo = event.params.logo;
  const color = event.params.color;
  const accessPointAutoApproval = event.params.accessPointAutoApproval;
  const tokenId = event.params.tokenId;
  const ownerAddress = event.params.owner;
  const verifierAddress = event.params.verifier;

  newMintEntity.tokenId = tokenId;
  newMintEntity.name = name;
  newMintEntity.description = description;
  newMintEntity.externalURL = externalURL;
  newMintEntity.ENS = ENS;
  newMintEntity.commitHash = commitHash;
  newMintEntity.gitRepository = gitRepository;
  newMintEntity.ipfsHash = ipfsHash;
  newMintEntity.logo = logo;
  newMintEntity.color = color;
  newMintEntity.accessPointAutoApproval = accessPointAutoApproval;
  newMintEntity.triggeredBy = event.params.minter;
  newMintEntity.owner = ownerAddress;
  newMintEntity.verifier = verifierAddress;
  newMintEntity.blockNumber = event.block.number;
  newMintEntity.blockTimestamp = event.block.timestamp;
  newMintEntity.transactionHash = event.transaction.hash;
  newMintEntity.save();
  log.error('{}', [tokenId.toString()]);

  // Create Token, Owner, and Controller entities

  let owner = Owner.load(ownerAddress);
  const token = new Token(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));

  if (!owner) {
    // Create a new owner entity
    owner = new Owner(ownerAddress);
    // Since no CollectionRoleChanged event was emitted before for this address, we can set `collection` to false.
    owner.collection = false;
  }

  // Populate Token with data from the event
  token.tokenId = tokenId;
  token.name = name;
  token.description = description;
  token.externalURL = externalURL;
  token.ENS = ENS;
  token.logo = logo;
  token.color = color;
  token.accessPointAutoApproval = accessPointAutoApproval;
  token.owner = ownerAddress;
  token.verified = false;
  token.mintTransaction = event.transaction.hash.concatI32(
    event.logIndex.toI32()
  );
  token.mintedBy = event.params.minter;
  token.controllers = [ownerAddress];
  token.createdAt = event.block.timestamp;

  if (Verifier.load(verifierAddress)) {
    token.verifier = verifierAddress;
  }

  // Populate GitRepository entity
  let repository = GitRepository.load(gitRepository);
  if (!repository) {
    repository = new GitRepository(gitRepository);
  }

  // Populate GitRepository entity
  let build = new Build(Bytes.fromByteArray(Bytes.fromI32(0)));
  build.number = 0;
  build.commitHash = commitHash;
  build.ipfsHash = ipfsHash;
  build.domain = externalURL;
  build.gitRepository = gitRepository;
  build.token = Bytes.fromByteArray(Bytes.fromBigInt(tokenId));
  build.save();

  // Increase total tokens counter
  const collection = Collection.load(event.address);
  if (collection) {
    collection.totalTokens = collection.totalTokens.plus(BigInt.fromU32(1));
    collection.save();
  }

  // Save entities
  owner.save();
  token.save();
  repository.save();
}

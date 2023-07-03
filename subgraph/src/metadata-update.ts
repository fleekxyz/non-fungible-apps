import { Bytes } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
  MetadataUpdate1 as MetadataUpdateEvent1,
  MetadataUpdate2 as MetadataUpdateEvent2,
  MetadataUpdate3 as MetadataUpdateEvent3,
  MetadataUpdate4 as MetadataUpdateEvent4,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
  GitRepository as GitRepositoryEntity,
  MetadataUpdate,
  Token,
  Build,
} from '../generated/schema';

export function handleMetadataUpdateWithStringValue(
  event: MetadataUpdateEvent1
): void {
  /**
   * Metadata handled here:
   * setTokenExternalURL
   * setTokenENS
   * setTokenName
   * setTokenDescription
   * setTokenLogo
   * */
  const entity = new MetadataUpdate(
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
  const token = Token.load(
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

export function handleMetadataUpdateWithMultipleStringValues(
  event: MetadataUpdateEvent3
): void {
  /**
   * setTokenBuild
   */
  const entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.multipleStringValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // LOAD THE BUILD LIST
  let token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );
  if (!token) {
    return;
  }
  // CREATE BUILD
  const build = new Build(
    Bytes.fromByteArray(Bytes.fromI32(token.builds.length))
  );
  if (event.params.key == 'build') {
    let gitRepositoryEntity = GitRepositoryEntity.load(event.params.value[1]);
    if (!gitRepositoryEntity) {
      // Create a new gitRepository entity
      gitRepositoryEntity = new GitRepositoryEntity(event.params.value[1]);
    }
    build.number = token.builds.length;
    build.commitHash = event.params.value[0];
    build.gitRepository = event.params.value[1];
    build.ipfsHash = event.params.value[2];
    build.domain = event.params.value[3];
    build.token = Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId));
    build.save();
    gitRepositoryEntity.save();
  }
}

export function handleMetadataUpdateWithIntValue(
  event: MetadataUpdateEvent2
): void {
  /**
   * setTokenColor
   */
  const entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.uint24Value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'color') {
      token.color = event.params.value;
    }
    token.save();
  }
}

export function handleMetadataUpdateWithBooleanValue(
  event: MetadataUpdateEvent4
): void {
  /**
   * accessPointAutoApproval
   */
  const entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.key = event.params.key;
  entity.tokenId = event.params._tokenId;
  entity.booleanValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'accessPointAutoApproval') {
      token.accessPointAutoApproval = event.params.value;
    }
    if (event.params.key == 'verified') {
      token.verified = event.params.value;
    }
    token.save();
  }
}

import { Bytes, log } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
  MetadataUpdate1 as MetadataUpdateEvent1,
  MetadataUpdate2 as MetadataUpdateEvent2,
  MetadataUpdate3 as MetadataUpdateEvent3,
  MetadataUpdate4 as MetadataUpdateEvent4,
  MetadataUpdate5 as MetadataUpdateEvent5,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
  GitRepository as GitRepositoryEntity,
  MetadataUpdate,
  Token,
  Build,
} from '../generated/schema';
import { Categories } from './constants';

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

export function handleMetadataUpdateWithEnumValue(
  event: MetadataUpdateEvent5
): void {
  /**
   * Metadata handled here:
   * Category
   * */
  const entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.tokenId = event.params._tokenId;
  entity.key = event.params.key;
  entity.enumValue = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // UPDATE TOKEN
  const token = Token.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
  );

  if (token) {
    if (event.params.key == 'category') {
      switch (event.params.value) {
        case Categories.DeFi:
          token.category = 'DeFi';
          break;

        case Categories.Gaming:
          token.category = 'Gaming';
          break;

        case Categories.Analytics:
          token.category = 'Analytics';
          break;

        case Categories.NFT:
          token.category = 'NFT';
          break;

        case Categories.Infrastructure:
          token.category = 'Infrastructure';
          break;
      }
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

  if (token == null) {
    log.error('Received new build for non-existent token id: {}', [
      event.params._tokenId.toString(),
    ]);
    return;
  }

  let buildId = token.builds.length;
  const build = new Build(Bytes.fromByteArray(Bytes.fromI32(buildId)));
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

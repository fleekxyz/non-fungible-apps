import {
    Bytes,
    log,
} from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
    NewMint as NewMintEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    Owner,
    GitRepository as GitRepositoryEntity,
    NewMint,
    Token,
} from '../generated/schema';

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
    let verifierAddress = event.params.verifier;

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
    newMintEntity.verifier = verifierAddress;
    newMintEntity.blockNumber = event.block.number;
    newMintEntity.blockTimestamp = event.block.timestamp;
    newMintEntity.transactionHash = event.transaction.hash;
    newMintEntity.save();
    log.error('{}', [tokenId.toString()]);

    // Create Token
    let token = new Token(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)));

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
    token.verifier = verifierAddress;
    token.mintTransaction = event.transaction.hash.concatI32(
        event.logIndex.toI32()
    );
    token.mintedBy = event.params.minter;
    token.controllers = [ownerAddress];

    // Save entity
    token.save();
}
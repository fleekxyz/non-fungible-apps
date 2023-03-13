// Event Imports [based on the yaml config]
import {
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    Approval,
    ApprovalForAll,
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
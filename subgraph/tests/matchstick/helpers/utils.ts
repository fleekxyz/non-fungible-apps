import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
} from '../../../generated/FleekNFA/FleekNFA';
import {
  handleApproval,
  handleApprovalForAll,
  handleNewMint,
  handleTransfer,
} from '../../../src/fleek-nfa';

export function createApprovalEvent(
  event_count: i32,
  owner: Address,
  approved: Address,
  tokenId: BigInt
): ApprovalEvent {
  let approvalEvent = changetype<ApprovalEvent>(newMockEvent());

  approvalEvent.parameters = new Array();

  approvalEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromAddress(approved))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  approvalEvent.transaction.hash = Bytes.fromI32(event_count);
  approvalEvent.logIndex = new BigInt(event_count);

  return approvalEvent;
}

export function createApprovalForAllEvent(
  event_count: i32,
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAllEvent {
  let approvalForAllEvent = changetype<ApprovalForAllEvent>(newMockEvent());

  approvalForAllEvent.parameters = new Array();

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved))
  );

  approvalForAllEvent.transaction.hash = Bytes.fromI32(event_count);
  approvalForAllEvent.logIndex = new BigInt(event_count);

  return approvalForAllEvent;
}

export function createTransferEvent(
  event_count: i32,
  from: Address,
  to: Address,
  tokenId: BigInt
): TransferEvent {
  let transferEvent = changetype<TransferEvent>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  transferEvent.transaction.hash = Bytes.fromI32(event_count);
  transferEvent.logIndex = new BigInt(event_count);

  return transferEvent;
}

export function createNewMintEvent(
  event_count: i32,
  to: Address,
  tokenId: BigInt
): NewMintEvent {
  let newMintEvent = changetype<NewMintEvent>(newMockEvent());

  newMintEvent.parameters = new Array();

  newMintEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('name', ethereum.Value.fromString('name'))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam(
      'description',
      ethereum.Value.fromString('description')
    )
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam(
      'externalURL',
      ethereum.Value.fromString('externalurl')
    )
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('ENS', ethereum.Value.fromString('ens'))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('commitHash', ethereum.Value.fromString('hash'))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('gitRepository', ethereum.Value.fromString('repo'))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('logo', ethereum.Value.fromString('logo'))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('color', ethereum.Value.fromI32(1234))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam(
      'accessPointAutoApproval',
      ethereum.Value.fromBoolean(true)
    )
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('minter', ethereum.Value.fromAddress(to))
  );
  newMintEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(to))
  );

  newMintEvent.transaction.hash = Bytes.fromI32(event_count);
  newMintEvent.logIndex = new BigInt(event_count);

  return newMintEvent;
}

export const CONTRACT: Address = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);
export const CONTRACT_OWNER: Address = Address.fromString(
  '0x1000000000000000000000000000000000000001'
);
export const TOKEN_OWNER_ONE: Address = Address.fromString(
  '0x2000000000000000000000000000000000000002'
);
export const TOKEN_OWNER_TWO: Address = Address.fromString(
  '0x3000000000000000000000000000000000000003'
);

export function handleTransfers(events: TransferEvent[]): void {
  events.forEach((event) => {
    handleTransfer(event);
  });
}

export function handleApprovals(events: ApprovalEvent[]): void {
  events.forEach((event) => {
    handleApproval(event);
  });
}

export function handleNewMints(events: NewMintEvent[]): void {
  events.forEach((event) => {
    handleNewMint(event);
  });
}

export function handleApprovalForAlls(events: ApprovalForAllEvent[]): void {
  events.forEach((event) => {
    handleApprovalForAll(event);
  });
}

export function makeEventId(id: i32): string {
  return Bytes.fromI32(id).toHexString() + '00000000';
}

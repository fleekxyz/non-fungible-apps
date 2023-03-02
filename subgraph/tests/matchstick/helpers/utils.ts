import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
  NewAccessPoint,
  ChangeAccessPointCreationStatus,
  ChangeAccessPointNameVerify
} from '../../../generated/FleekNFA/FleekNFA';
import {
  handleApproval,
  handleApprovalForAll,
  handleChangeAccessPointCreationStatus,
  handleChangeAccessPointNameVerify,
  handleNewAccessPoint,
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

export function createNewAccessPointEvent(
  event_count: i32,
  apName: string,
  tokenId: BigInt,
  owner: Address
): NewAccessPoint {
  let newAccessPoint = changetype<NewAccessPoint>(newMockEvent());

  newAccessPoint.parameters = new Array();

  newAccessPoint.parameters.push(
    new ethereum.EventParam(
      'apName',
      ethereum.Value.fromString(apName.toString())
    )
  );

  newAccessPoint.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  newAccessPoint.parameters.push(
    new ethereum.EventParam(
      'owner',
      ethereum.Value.fromAddress(owner)
    )
  );

  newAccessPoint.transaction.hash = Bytes.fromI32(event_count);
  newAccessPoint.logIndex = new BigInt(event_count);

  return newAccessPoint;
}

export function createNewChangeAccessPointCreationStatus(
  event_count: i32,
  apName: string,
  tokenId: BigInt,
  status: i32,
  triggeredBy: Address
): ChangeAccessPointCreationStatus {
  let changeAccessPointCreationStatus = changetype<ChangeAccessPointCreationStatus>(newMockEvent());

  changeAccessPointCreationStatus.parameters = new Array();

  changeAccessPointCreationStatus.parameters.push(
    new ethereum.EventParam(
      'apName',
      ethereum.Value.fromString(apName.toString())
    )
  );

  changeAccessPointCreationStatus.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  
  changeAccessPointCreationStatus.parameters.push(
    new ethereum.EventParam(
      'creationStatus',
      ethereum.Value.fromI32(status)
    )
  );

  changeAccessPointCreationStatus.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  changeAccessPointCreationStatus.transaction.hash = Bytes.fromI32(event_count);
  changeAccessPointCreationStatus.logIndex = new BigInt(event_count);

  return changeAccessPointCreationStatus;
}

export function createNewChangeAccessPointNameVerify(
  event_count: i32,
  apName: string,
  tokenId: BigInt,
  verified: boolean,
  triggeredBy: Address
): ChangeAccessPointNameVerify {
  let changeAccessPointNameVerify = changetype<ChangeAccessPointNameVerify>(newMockEvent());

  changeAccessPointNameVerify.parameters = new Array();

  changeAccessPointNameVerify.parameters.push(
    new ethereum.EventParam(
      'apName',
      ethereum.Value.fromString(apName.toString())
    )
  );

  changeAccessPointNameVerify.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  
  changeAccessPointNameVerify.parameters.push(
    new ethereum.EventParam(
      'verified',
      ethereum.Value.fromBoolean(verified)
    )
  );

  changeAccessPointNameVerify.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  changeAccessPointNameVerify.transaction.hash = Bytes.fromI32(event_count);
  changeAccessPointNameVerify.logIndex = new BigInt(event_count);

  return changeAccessPointNameVerify;
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

export function handleNewAccessPoints(events: NewAccessPoint[]): void {
  events.forEach((event) => {
    handleNewAccessPoint(event);
  });
}

export function handleChangeAccessPointCreationStatusList(events: ChangeAccessPointCreationStatus[]): void {
  events.forEach((event) => {
    handleChangeAccessPointCreationStatus(event);
  });
}

export function handleChangeAccessPointNameVerifies(events: ChangeAccessPointNameVerify[]): void {
  events.forEach((event) => {
    handleChangeAccessPointNameVerify(event);
  });
}

export function makeEventId(id: i32): string {
  return Bytes.fromI32(id).toHexString() + '00000000';
}

import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent,
  NewMint as NewMintEvent,
  NewAccessPoint,
  ChangeAccessPointCreationStatus,
  ChangeAccessPointNameVerify,
  TokenRoleChanged,
  CollectionRoleChanged,
} from '../../../generated/FleekNFA/FleekNFA';
import {
  handleApproval,
  handleApprovalForAll,
  handleChangeAccessPointCreationStatus,
  handleChangeAccessPointNameVerify,
  handleNewAccessPoint,
  handleNewMint,
  handleTransfer,
  handleTokenRoleChanged,
  handleCollectionRoleChanged,
} from '../../../src/fleek-nfa';

export function createApprovalEvent(
  event_count: i32,
  owner: Address,
  approved: Address,
  tokenId: bigint
): ApprovalEvent {
  const approvalEvent = changetype<ApprovalEvent>(newMockEvent());

  approvalEvent.parameters = [];

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
  const approvalForAllEvent = changetype<ApprovalForAllEvent>(newMockEvent());

  approvalForAllEvent.parameters = [];

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
  tokenId: bigint
): TransferEvent {
  const transferEvent = changetype<TransferEvent>(newMockEvent());

  transferEvent.parameters = [];

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
  tokenId: bigint
): NewMintEvent {
  const newMintEvent = changetype<NewMintEvent>(newMockEvent());

  newMintEvent.parameters = [];

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
  newMintEvent.parameters.push(
    new ethereum.EventParam('verifier', ethereum.Value.fromAddress(to))
  );

  newMintEvent.transaction.hash = Bytes.fromI32(event_count);
  newMintEvent.logIndex = new BigInt(event_count);

  return newMintEvent;
}

export function createNewAccessPointEvent(
  event_count: i32,
  apName: string,
  tokenId: bigint,
  owner: Address
): NewAccessPoint {
  const newAccessPoint = changetype<NewAccessPoint>(newMockEvent());

  newAccessPoint.parameters = [];

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
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );

  newAccessPoint.transaction.hash = Bytes.fromI32(event_count);
  newAccessPoint.logIndex = new BigInt(event_count);

  return newAccessPoint;
}

export function createNewChangeAccessPointCreationStatus(
  event_count: i32,
  apName: string,
  tokenId: bigint,
  status: i32,
  triggeredBy: Address
): ChangeAccessPointCreationStatus {
  const changeAccessPointCreationStatus =
    changetype<ChangeAccessPointCreationStatus>(newMockEvent());

  changeAccessPointCreationStatus.parameters = [];

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
    new ethereum.EventParam('creationStatus', ethereum.Value.fromI32(status))
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
  tokenId: bigint,
  verified: boolean,
  triggeredBy: Address
): ChangeAccessPointNameVerify {
  const changeAccessPointNameVerify = changetype<ChangeAccessPointNameVerify>(
    newMockEvent()
  );

  changeAccessPointNameVerify.parameters = [];

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
    new ethereum.EventParam('verified', ethereum.Value.fromBoolean(verified))
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

export function createNewTokenRoleChanged(
  event_count: i32,
  tokenId: bigint,
  role: i32,
  toAddress: Address,
  status: boolean,
  byAddress: Address
): TokenRoleChanged {
  const tokenRoleChanged = changetype<TokenRoleChanged>(newMockEvent());

  tokenRoleChanged.parameters = [];

  tokenRoleChanged.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  tokenRoleChanged.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromI32(role))
  );

  tokenRoleChanged.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );

  tokenRoleChanged.parameters.push(
    new ethereum.EventParam('status', ethereum.Value.fromBoolean(status))
  );

  tokenRoleChanged.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  tokenRoleChanged.transaction.hash = Bytes.fromI32(event_count);
  tokenRoleChanged.logIndex = new BigInt(event_count);

  return tokenRoleChanged;
}

export function createNewCollectionRoleChanged(
  event_count: i32,
  role: i32,
  toAddress: Address,
  status: boolean,
  byAddress: Address
): CollectionRoleChanged {
  const collectionRoleChanged = changetype<CollectionRoleChanged>(
    newMockEvent()
  );

  collectionRoleChanged.parameters = [];

  collectionRoleChanged.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromI32(role))
  );

  collectionRoleChanged.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );

  collectionRoleChanged.parameters.push(
    new ethereum.EventParam('status', ethereum.Value.fromBoolean(status))
  );

  collectionRoleChanged.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  collectionRoleChanged.transaction.hash = Bytes.fromI32(event_count);
  collectionRoleChanged.logIndex = new BigInt(event_count);

  return collectionRoleChanged;
}

export const CONTRACT: Address = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);
export const CONTRACT_OWNER: Address = Address.fromString(
  '0x1000000000000000000000000000000000000001'
);
export const USER_ONE: Address = Address.fromString(
  '0x2000000000000000000000000000000000000002'
);
export const USER_TWO: Address = Address.fromString(
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

export function handleChangeAccessPointCreationStatusList(
  events: ChangeAccessPointCreationStatus[]
): void {
  events.forEach((event) => {
    handleChangeAccessPointCreationStatus(event);
  });
}

export function handleChangeAccessPointNameVerifies(
  events: ChangeAccessPointNameVerify[]
): void {
  events.forEach((event) => {
    handleChangeAccessPointNameVerify(event);
  });
}

export function handleTokenRoleChangedList(events: TokenRoleChanged[]): void {
  events.forEach((event) => {
    handleTokenRoleChanged(event);
  });
}

export function handleCollectionRoleChangedList(
  events: CollectionRoleChanged[]
): void {
  events.forEach((event) => {
    handleCollectionRoleChanged(event);
  });
}

export function makeEventId(id: i32): string {
  return Bytes.fromI32(id).toHexString() + '00000000';
}

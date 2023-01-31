import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  Approval,
  Approval as ApprovalEvent,
  ApprovalForAll,
  ApprovalForAll as ApprovalForAllEvent,
  CollectionRoleGranted,
  CollectionRoleGranted as CollectionRoleGrantedEvent,
  CollectionRoleRevoked,
  CollectionRoleRevoked as CollectionRoleRevokedEvent,
  NewBuild,
  NewBuild as NewBuildEvent,
  NewTokenDescription as NewTokenDescriptionEvent,
  NewTokenENS,
  NewTokenENS as NewTokenENSEvent,
  NewTokenExternalURL,
  NewTokenExternalURL as NewTokenExternalURLEvent,
  NewTokenImage,
  NewTokenImage as NewTokenImageEvent,
  NewTokenName as NewTokenNameEvent,
  TokenRoleGranted,
  TokenRoleGranted as TokenRoleGrantedEvent,
  TokenRoleRevoked,
  TokenRoleRevoked as TokenRoleRevokedEvent,
  Transfer as TransferEvent,
} from '../generated/FleekNFA/FleekNFA';
import {
  handleApproval,
  handleApprovalForAll,
  handleCollectionRoleGranted,
  handleCollectionRoleRevoked,
  handleNewBuild,
  handleNewTokenENS,
  handleNewTokenExternalURL,
  handleNewTokenImage,
  handleNewTokenName,
  handleTokenRoleGranted,
  handleTokenRoleRevoked,
  handleTransfer,
} from '../src/fleek-nfa';

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

  return approvalForAllEvent;
}

export function createCollectionRoleGrantedEvent(
  event_count: i32,
  role: i32,
  toAddress: Address,
  byAddress: Address
): CollectionRoleGrantedEvent {
  let collectionRoleGrantedEvent = changetype<CollectionRoleGrantedEvent>(
    newMockEvent()
  );

  collectionRoleGrantedEvent.parameters = new Array();

  collectionRoleGrantedEvent.parameters.push(
    new ethereum.EventParam(
      'role',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  );
  collectionRoleGrantedEvent.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );
  collectionRoleGrantedEvent.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  collectionRoleGrantedEvent.transaction.hash = Bytes.fromI32(event_count);

  return collectionRoleGrantedEvent;
}

export function createCollectionRoleRevokedEvent(
  event_count: i32,
  role: i32,
  toAddress: Address,
  byAddress: Address
): CollectionRoleRevokedEvent {
  let collectionRoleRevokedEvent = changetype<CollectionRoleRevokedEvent>(
    newMockEvent()
  );

  collectionRoleRevokedEvent.parameters = new Array();

  collectionRoleRevokedEvent.parameters.push(
    new ethereum.EventParam(
      'role',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  );
  collectionRoleRevokedEvent.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );
  collectionRoleRevokedEvent.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  collectionRoleRevokedEvent.transaction.hash = Bytes.fromI32(event_count);

  return collectionRoleRevokedEvent;
}

export function createNewBuildEvent(
  event_count: i32,
  token: BigInt,
  commitHash: string,
  triggeredBy: Address
): NewBuildEvent {
  let newBuildEvent = changetype<NewBuildEvent>(newMockEvent());

  newBuildEvent.parameters = new Array();

  newBuildEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newBuildEvent.parameters.push(
    new ethereum.EventParam('commitHash', ethereum.Value.fromString(commitHash))
  );
  newBuildEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newBuildEvent.transaction.hash = Bytes.fromI32(event_count);

  return newBuildEvent;
}

export function createNewTokenDescriptionEvent(
  event_count: i32,
  token: BigInt,
  description: string,
  triggeredBy: Address
): NewTokenDescriptionEvent {
  let newTokenDescriptionEvent = changetype<NewTokenDescriptionEvent>(
    newMockEvent()
  );

  newTokenDescriptionEvent.parameters = new Array();

  newTokenDescriptionEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newTokenDescriptionEvent.parameters.push(
    new ethereum.EventParam(
      'description',
      ethereum.Value.fromString(description)
    )
  );
  newTokenDescriptionEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newTokenDescriptionEvent.transaction.hash = Bytes.fromI32(event_count);

  return newTokenDescriptionEvent;
}

export function createNewTokenENSEvent(
  event_count: i32,
  token: BigInt,
  ENS: string,
  triggeredBy: Address
): NewTokenENSEvent {
  let newTokenEnsEvent = changetype<NewTokenENSEvent>(newMockEvent());

  newTokenEnsEvent.parameters = new Array();

  newTokenEnsEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newTokenEnsEvent.parameters.push(
    new ethereum.EventParam('ENS', ethereum.Value.fromString(ENS))
  );
  newTokenEnsEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newTokenEnsEvent.transaction.hash = Bytes.fromI32(event_count);

  return newTokenEnsEvent;
}

export function createNewTokenExternalURLEvent(
  event_count: i32,
  token: BigInt,
  externalURL: string,
  triggeredBy: Address
): NewTokenExternalURLEvent {
  let newTokenExternalUrlEvent = changetype<NewTokenExternalURLEvent>(
    newMockEvent()
  );

  newTokenExternalUrlEvent.parameters = new Array();

  newTokenExternalUrlEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newTokenExternalUrlEvent.parameters.push(
    new ethereum.EventParam(
      'externalURL',
      ethereum.Value.fromString(externalURL)
    )
  );
  newTokenExternalUrlEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newTokenExternalUrlEvent.transaction.hash = Bytes.fromI32(event_count);

  return newTokenExternalUrlEvent;
}

export function createNewTokenImageEvent(
  event_count: i32,
  token: BigInt,
  image: string,
  triggeredBy: Address
): NewTokenImageEvent {
  let newTokenImageEvent = changetype<NewTokenImageEvent>(newMockEvent());

  newTokenImageEvent.parameters = new Array();

  newTokenImageEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newTokenImageEvent.parameters.push(
    new ethereum.EventParam('image', ethereum.Value.fromString(image))
  );
  newTokenImageEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newTokenImageEvent.transaction.hash = Bytes.fromI32(event_count);

  return newTokenImageEvent;
}

export function createNewTokenNameEvent(
  event_count: i32,
  token: BigInt,
  name: string,
  triggeredBy: Address
): NewTokenNameEvent {
  let newTokenNameEvent = changetype<NewTokenNameEvent>(newMockEvent());

  newTokenNameEvent.parameters = new Array();

  newTokenNameEvent.parameters.push(
    new ethereum.EventParam('token', ethereum.Value.fromUnsignedBigInt(token))
  );
  newTokenNameEvent.parameters.push(
    new ethereum.EventParam('name', ethereum.Value.fromString(name))
  );
  newTokenNameEvent.parameters.push(
    new ethereum.EventParam(
      'triggeredBy',
      ethereum.Value.fromAddress(triggeredBy)
    )
  );

  newTokenNameEvent.transaction.hash = Bytes.fromI32(event_count);

  return newTokenNameEvent;
}

export function createTokenRoleGrantedEvent(
  event_count: i32,
  tokenId: BigInt,
  role: i32,
  toAddress: Address,
  byAddress: Address
): TokenRoleGrantedEvent {
  let tokenRoleGrantedEvent = changetype<TokenRoleGrantedEvent>(newMockEvent());

  tokenRoleGrantedEvent.parameters = new Array();

  tokenRoleGrantedEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  tokenRoleGrantedEvent.parameters.push(
    new ethereum.EventParam(
      'role',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  );
  tokenRoleGrantedEvent.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );
  tokenRoleGrantedEvent.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  tokenRoleGrantedEvent.transaction.hash = Bytes.fromI32(event_count);

  return tokenRoleGrantedEvent;
}

export function createTokenRoleRevokedEvent(
  event_count: i32,
  tokenId: BigInt,
  role: i32,
  toAddress: Address,
  byAddress: Address
): TokenRoleRevokedEvent {
  let tokenRoleRevokedEvent = changetype<TokenRoleRevokedEvent>(newMockEvent());

  tokenRoleRevokedEvent.parameters = new Array();

  tokenRoleRevokedEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  tokenRoleRevokedEvent.parameters.push(
    new ethereum.EventParam(
      'role',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  );
  tokenRoleRevokedEvent.parameters.push(
    new ethereum.EventParam('toAddress', ethereum.Value.fromAddress(toAddress))
  );
  tokenRoleRevokedEvent.parameters.push(
    new ethereum.EventParam('byAddress', ethereum.Value.fromAddress(byAddress))
  );

  tokenRoleRevokedEvent.transaction.hash = Bytes.fromI32(event_count);

  return tokenRoleRevokedEvent;
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

  return transferEvent;
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

export function handleNewTokenNames(events: NewTokenNameEvent[]): void {
  events.forEach((event) => {
    handleNewTokenName(event);
  });
}

export function handleNewTokenENSAddresses(events: NewTokenENS[]): void {
  events.forEach((event) => {
    handleNewTokenENS(event);
  });
}

export function handleNewTokenExternalURLs(
  events: NewTokenExternalURL[]
): void {
  events.forEach((event) => {
    handleNewTokenExternalURL(event);
  });
}

export function handleNewBuilds(events: NewBuild[]): void {
  events.forEach((event) => {
    handleNewBuild(event);
  });
}

export function handleNewTokenImages(events: NewTokenImage[]): void {
  events.forEach((event) => {
    handleNewTokenImage(event);
  });
}

export function handleApprovals(events: Approval[]): void {
  events.forEach((event) => {
    handleApproval(event);
  });
}

export function handleApprovalForAlls(events: ApprovalForAll[]): void {
  events.forEach((event) => {
    handleApprovalForAll(event);
  });
}

export function handleCollectionRoleGranteds(
  events: CollectionRoleGranted[]
): void {
  events.forEach((event) => {
    handleCollectionRoleGranted(event);
  });
}

export function handleCollectionRoleRevokeds(
  events: CollectionRoleRevoked[]
): void {
  events.forEach((event) => {
    handleCollectionRoleRevoked(event);
  });
}

export function handleTokenRoleGranteds(events: TokenRoleGranted[]): void {
  events.forEach((event) => {
    handleTokenRoleGranted(event);
  });
}

export function handleTokenRoleRevokeds(events: TokenRoleRevoked[]): void {
  events.forEach((event) => {
    handleTokenRoleRevoked(event);
  });
}

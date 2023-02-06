import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  Approval,
  ApprovalForAll,
  CollectionRoleGranted,
  CollectionRoleRevoked,
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenImage,
  NewTokenName,
  TokenRoleGranted,
  TokenRoleRevoked,
  Transfer,
} from '../generated/FleekNFA/FleekNFA';

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent());

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

  return approvalEvent;
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent());

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

  return approvalForAllEvent;
}

export function createCollectionRoleGrantedEvent(
  role: i32,
  toAddress: Address,
  byAddress: Address
): CollectionRoleGranted {
  let collectionRoleGrantedEvent = changetype<CollectionRoleGranted>(
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

  return collectionRoleGrantedEvent;
}

export function createCollectionRoleRevokedEvent(
  role: i32,
  toAddress: Address,
  byAddress: Address
): CollectionRoleRevoked {
  let collectionRoleRevokedEvent = changetype<CollectionRoleRevoked>(
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

  return collectionRoleRevokedEvent;
}

export function createNewBuildEvent(
  token: BigInt,
  commitHash: string,
  triggeredBy: Address
): NewBuild {
  let newBuildEvent = changetype<NewBuild>(newMockEvent());

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

  return newBuildEvent;
}

export function createNewTokenDescriptionEvent(
  token: BigInt,
  description: string,
  triggeredBy: Address
): NewTokenDescription {
  let newTokenDescriptionEvent = changetype<NewTokenDescription>(
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

  return newTokenDescriptionEvent;
}

export function createNewTokenENSEvent(
  token: BigInt,
  ENS: string,
  triggeredBy: Address
): NewTokenENS {
  let newTokenEnsEvent = changetype<NewTokenENS>(newMockEvent());

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

  return newTokenEnsEvent;
}

export function createNewTokenExternalURLEvent(
  token: BigInt,
  externalURL: string,
  triggeredBy: Address
): NewTokenExternalURL {
  let newTokenExternalUrlEvent = changetype<NewTokenExternalURL>(
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

  return newTokenExternalUrlEvent;
}

export function createNewTokenImageEvent(
  token: BigInt,
  image: string,
  triggeredBy: Address
): NewTokenImage {
  let newTokenImageEvent = changetype<NewTokenImage>(newMockEvent());

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

  return newTokenImageEvent;
}

export function createNewTokenNameEvent(
  token: BigInt,
  name: string,
  triggeredBy: Address
): NewTokenName {
  let newTokenNameEvent = changetype<NewTokenName>(newMockEvent());

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

  return newTokenNameEvent;
}

export function createTokenRoleGrantedEvent(
  tokenId: BigInt,
  role: i32,
  toAddress: Address,
  byAddress: Address
): TokenRoleGranted {
  let tokenRoleGrantedEvent = changetype<TokenRoleGranted>(newMockEvent());

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

  return tokenRoleGrantedEvent;
}

export function createTokenRoleRevokedEvent(
  tokenId: BigInt,
  role: i32,
  toAddress: Address,
  byAddress: Address
): TokenRoleRevoked {
  let tokenRoleRevokedEvent = changetype<TokenRoleRevoked>(newMockEvent());

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

  return tokenRoleRevokedEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

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

  return transferEvent;
}

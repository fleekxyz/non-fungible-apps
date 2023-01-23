import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import '../generated/schema';
import '../generated/FleekNFA/FleekNFA';
import '../src/fleek-nfa';
import './fleek-nfa-utils';
import { handleTransfer } from '../src/fleek-nfa';
import { createTransferEvent } from './fleek-nfa-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let contract = Address.fromString(
      '0x0000000000000000000000000000000000000000'
    );
    let contractOwner = Address.fromString(
      '0x1000000000000000000000000000000000000001'
    );
    let tokenOwnerOne = Address.fromString(
      '0x2000000000000000000000000000000000000002'
    );
    let tokenOwnerTwo = Address.fromString(
      '0x3000000000000000000000000000000000000003'
    );

    handleTransfer(
      createTransferEvent(contract, tokenOwnerOne, BigInt.fromI32(0))
    );
    handleTransfer(
      createTransferEvent(contract, tokenOwnerTwo, BigInt.fromI32(1))
    );
    handleTransfer(
      createTransferEvent(contract, tokenOwnerOne, BigInt.fromI32(2))
    );
    handleTransfer(
      createTransferEvent(contract, tokenOwnerOne, BigInt.fromI32(3))
    );
    handleTransfer(
      createTransferEvent(tokenOwnerTwo, tokenOwnerOne, BigInt.fromI32(1))
    );
    handleTransfer(
      createTransferEvent(contract, tokenOwnerTwo, BigInt.fromI32(4))
    );
    handleTransfer(
      createTransferEvent(tokenOwnerOne, tokenOwnerTwo, BigInt.fromI32(0))
    );
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('Mints & Transfers', () => {
    assert.entityCount('Transfer', 7);

    assert.fieldEquals(
      'Approval',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'owner',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'Approval',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'approved',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'Approval',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'tokenId',
      '234'
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});

import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import '../generated/schema';
import '../generated/FleekNFA/FleekNFA';
import '../src/fleek-nfa';
import './utils';
import { Transfer } from '../generated/FleekNFA/FleekNFA';
import {
  CONTRACT,
  createTransferEvent,
  handleTransfers,
  TOKEN_OWNER_ONE,
  TOKEN_OWNER_TWO,
} from './utils';

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let transfers: Transfer[] = [];
    transfers.push(
      createTransferEvent(CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(0))
    ); // MINT
    transfers.push(
      createTransferEvent(CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(1))
    ); // MINT
    transfers.push(
      createTransferEvent(CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(2))
    ); // MINT
    transfers.push(
      createTransferEvent(CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(3))
    ); // MINT
    ///transfers.push(createTransferEvent(TOKEN_OWNER_TWO, TOKEN_OWNER_ONE, BigInt.fromI32(1)));
    transfers.push(
      createTransferEvent(CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(4))
    ); // MINT
    ///transfers.push(createTransferEvent(TOKEN_OWNER_ONE, TOKEN_OWNER_TWO, BigInt.fromI32(0)));
    handleTransfers(transfers);
    logStore();
  });
  afterAll(() => {
    clearStore();
  });
  describe('Mints', () => {
    test('Check the number of mints to be valid', () => {
      assert.entityCount('Transfer', 7);
    });
    test('Check the owners of each token at the time of mint', () => {
      assert.fieldEquals(
        'Transfer',
        '0',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '1',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        '2',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '3',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '3',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
    });
  });

  describe('Transfers', () => {
    test('Check the number of transfers to be valid', () => {
      assert.entityCount('Transfer', 7);
    });
    test('Check the number of transfers that are not mint to be valid', () => {
      assert.entityCount('Transfer', 7);
    });
    test('Check the `from` and `to` fields of each transfer to be equal to expected values', () => {
      assert.fieldEquals(
        'Transfer',
        '0',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '1',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        '2',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '3',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '3',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
    });
  });

  describe('New Token Name Events', () => {
    test('Check the number of newTokenName to be valid', () => {
      assert.entityCount('newTokenName', 7);
    });
    test('Check the number of newTokenNames on token 0', () => {
      assert.entityCount('newTokenName', 7);
    });
    test('Check the number of newTokenNames from address [0x20..02]', () => {
      assert.entityCount('newTokenName', 7);
    });
    test('Check the `from` and `to` fields of each transfer to be equal to expected values', () => {
      assert.fieldEquals(
        'newTokenName',
        '0',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'newTokenName',
        '1',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'newTokenName',
        '2',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'newTokenName',
        '3',
        'owner',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'newTokenName',
        '3',
        'owner',
        '0x3000000000000000000000000000000000000003'
      );
    });
  });
});

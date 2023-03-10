import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
  log,
} from 'matchstick-as/assembly/index';
import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  CONTRACT,
  createTransferEvent,
  handleTransfers,
  makeEventId,
  USER_ONE,
  USER_TWO,
} from './helpers/utils';
import { Transfer } from '../../generated/FleekNFA/FleekNFA';

describe('Transfer tests', () => {
  beforeAll(() => {
    // TRANSFERS
    let transfers: Transfer[] = [];
    transfers.push(
      createTransferEvent(0, CONTRACT, USER_ONE, BigInt.fromI32(0))
    );
    transfers.push(
      createTransferEvent(1, CONTRACT, USER_TWO, BigInt.fromI32(1))
    );
    transfers.push(
      createTransferEvent(2, CONTRACT, USER_ONE, BigInt.fromI32(2))
    );
    transfers.push(
      createTransferEvent(3, CONTRACT, USER_ONE, BigInt.fromI32(3))
    );
    transfers.push(
      createTransferEvent(4, USER_TWO, USER_ONE, BigInt.fromI32(1))
    );
    transfers.push(
      createTransferEvent(5, CONTRACT, USER_TWO, BigInt.fromI32(4))
    );
    transfers.push(
      createTransferEvent(6, USER_ONE, USER_TWO, BigInt.fromI32(0))
    );
    handleTransfers(transfers);
    // logStore();
  });

  afterAll(() => {
    clearStore();
  });

  describe('Transfers', () => {
    test('Check the number of transfers to be valid', () => {
      assert.entityCount('Transfer', 7);
    });
    test('Check the `from` and `to` fields of each transfer to be equal to expected values', () => {
      assert.fieldEquals(
        'Transfer',
        makeEventId(0),
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(1),
        'to',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(2),
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(3),
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(4),
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(5),
        'to',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        makeEventId(6),
        'to',
        '0x3000000000000000000000000000000000000003'
      );
    });
  });
});

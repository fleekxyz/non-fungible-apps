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
import { BigInt } from '@graphprotocol/graph-ts';
import {
  CONTRACT,
  createNewMintEvent,
  createTransferEvent,
  handleNewMints,
  handleTransfers,
  makeEventId,
  TOKEN_OWNER_ONE,
  TOKEN_OWNER_TWO,
} from './helpers/utils';
import { NewMint, Transfer } from '../../generated/FleekNFA/FleekNFA';

describe('Owner tests', () => {
  beforeAll(() => {
    // NEW MINTS
    let newMints: NewMint[] = [];
    newMints.push(createNewMintEvent(0, TOKEN_OWNER_ONE, BigInt.fromI32(0)));
    newMints.push(createNewMintEvent(1, TOKEN_OWNER_TWO, BigInt.fromI32(1)));
    newMints.push(createNewMintEvent(2, TOKEN_OWNER_ONE, BigInt.fromI32(2)));
    newMints.push(createNewMintEvent(3, TOKEN_OWNER_ONE, BigInt.fromI32(3)));
    newMints.push(createNewMintEvent(4, TOKEN_OWNER_TWO, BigInt.fromI32(4)));
    handleNewMints(newMints);
    // TRANSFERS
    let transfers: Transfer[] = [];
    transfers.push(
      createTransferEvent(0, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(0))
    );
    transfers.push(
      createTransferEvent(1, CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(1))
    );
    transfers.push(
      createTransferEvent(2, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(2))
    );
    transfers.push(
      createTransferEvent(3, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(3))
    );
    transfers.push(
      createTransferEvent(
        4,
        TOKEN_OWNER_TWO,
        TOKEN_OWNER_ONE,
        BigInt.fromI32(1)
      )
    );
    transfers.push(
      createTransferEvent(5, CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(4))
    );
    transfers.push(
      createTransferEvent(
        6,
        TOKEN_OWNER_ONE,
        TOKEN_OWNER_TWO,
        BigInt.fromI32(0)
      )
    );
    handleTransfers(transfers);
    //logStore();
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

  describe('Owner Assertions', () => {
    test('Check the number of owners to be valid', () => {
      assert.entityCount('Owner', 2);
    });
    test('Check the existence of owners in store', () => {
      assert.fieldEquals(
        'Owner',
        TOKEN_OWNER_ONE.toHexString(),
        'id',
        TOKEN_OWNER_ONE.toHexString()
      );
      assert.fieldEquals(
        'Owner',
        TOKEN_OWNER_TWO.toHexString(),
        'id',
        TOKEN_OWNER_TWO.toHexString()
      );
    });
  });
});

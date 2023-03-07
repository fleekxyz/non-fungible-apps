import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { createNewTokenRoleChanged, handleTokenRoleChangedList, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from '../helpers/utils';
import { TokenRoleChanged } from '../../../generated/FleekNFA/FleekNFA';

describe('Token Role Changed tests', () => {
  beforeAll(() => {
    // Token Role Changed
    let tokenRoleChangedList: TokenRoleChanged[] = [];

    tokenRoleChangedList.push(
      createNewTokenRoleChanged(0, BigInt.fromI32(0), 0, TOKEN_OWNER_ONE, true, TOKEN_OWNER_TWO) // Token Owner Two gives Token Owner One controller access to TokenId 0
    );

    tokenRoleChangedList.push(
      createNewTokenRoleChanged(1, BigInt.fromI32(1), 0, TOKEN_OWNER_TWO, true, TOKEN_OWNER_ONE) // Token Owner One gives Token Owner Two controller access to TokenId 1
    );

    tokenRoleChangedList.push(
      createNewTokenRoleChanged(2, BigInt.fromI32(0), 0, TOKEN_OWNER_ONE, false, TOKEN_OWNER_TWO) // Token Owner Two revokes the controller access of Token Owner One to tokenId 0
    );


    handleTokenRoleChangedList(tokenRoleChangedList);
  });

  afterAll(() => {
    clearStore();
  });

  describe('Assertions', () => {
    test('Check the `tokenId` field of each TokenRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
        'tokenId',
        '0'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(1),
        'tokenId',
        '1'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(2),
        'tokenId',
        '0'
      );
    });
    test('Check the `role` field of each TokenRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
        'role',
        '0'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(1),
        'role',
        '0'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(2),
        'role',
        '0'
      );
    });

    test('Check the `toAddress` field of each TokenRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
        'toAddress',
        TOKEN_OWNER_ONE.toString()
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(1),
        'toAddress',
        TOKEN_OWNER_TWO.toString()
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(2),
        'toAddress',
        TOKEN_OWNER_ONE.toString()
      );
    });

    test('Check the `byAddress` field of each TokenRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
        'byAddress',
        TOKEN_OWNER_TWO.toString()
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(1),
        'byAddress',
        TOKEN_OWNER_ONE.toString()
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(2),
        'byAddress',
        TOKEN_OWNER_TWO.toString()
      );
    });

    test('Check the `status` field of each TokenRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
        'status',
        'true'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(1),
        'status',
        'true'
      );
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(2),
        'status',
        'false'
      );
    });
  });
});
import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { createNewCollectionRoleChanged, handleCollectionRoleChangedList, makeEventId, USER_ONE, USER_TWO } from '../helpers/utils';
import { CollectionRoleChanged } from '../../../generated/FleekNFA/FleekNFA';

describe('Collection Role Changed tests', () => {
  beforeAll(() => {
    // Collection Role Changed
    let collectionRoleChangedList: CollectionRoleChanged[] = [];

    collectionRoleChangedList.push(
      createNewCollectionRoleChanged(0, 0, USER_ONE, true, USER_TWO) // User Two grants collection owner access to User One 
    );

    collectionRoleChangedList.push(
      createNewCollectionRoleChanged(2, 0, USER_ONE, false, USER_TWO) // User Two revokes the owner access of User One to the collection
    );


    handleCollectionRoleChangedList(collectionRoleChangedList);
  });

  afterAll(() => {
    clearStore();
  });

  describe('Assertions', () => {
    test('Check the `role` field of each CollectionRoleChanged event entity', () => {
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(0),
        'role',
        '0'
      );
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(2),
        'role',
        '0'
      );
    });

    test('Check the `toAddress` field of each CollectionRoleChanged event entity', () => {
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(0),
        'toAddress',
        USER_ONE.toString()
      );
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(2),
        'toAddress',
        USER_ONE.toString()
      );
    });

    test('Check the `byAddress` field of each CollectionRoleChanged event entity', () => {
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(0),
        'byAddress',
        USER_TWO.toString()
      );
      assert.fieldEquals(
        'CollectionRoleChanged',
        makeEventId(2),
        'byAddress',
        USER_TWO.toString()
      );
    });

    test('Check the `status` field of each CollectionRoleChanged event entity', () => {
      assert.fieldEquals(
        'TokenRoleChanged',
        makeEventId(0),
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
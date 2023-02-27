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
import { createNewTokenENSEvent, handleNewTokenENSAddresses, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewTokenENS } from '../../generated/FleekNFA/FleekNFA';

describe('New Token ENS tests', () => {
    beforeAll(() => {
    // New Token ENS Addresses
    let newENSAddresses: NewTokenENS[] = [];
    newENSAddresses.push(
      createNewTokenENSEvent(
        0,
        BigInt.fromI32(0),
        'New_Token_Zero_ENS',
        TOKEN_OWNER_ONE
      )
    );
    newENSAddresses.push(
      createNewTokenENSEvent(
        1,
        BigInt.fromI32(1),
        'New_Token_One_ENS',
        TOKEN_OWNER_TWO
      )
    );
    newENSAddresses.push(
      createNewTokenENSEvent(
        2,
        BigInt.fromI32(2),
        'New_Token_Two_ENS',
        TOKEN_OWNER_ONE
      )
    );
    newENSAddresses.push(
      createNewTokenENSEvent(
        3,
        BigInt.fromI32(3),
        'New_Token_Three_ENS',
        TOKEN_OWNER_ONE
      )
    );
    newENSAddresses.push(
      createNewTokenENSEvent(
        4,
        BigInt.fromI32(4),
        'New_Token_Four_ENS',
        TOKEN_OWNER_TWO
      )
    );
    newENSAddresses.push(
      createNewTokenENSEvent(
        5,
        BigInt.fromI32(5),
        'New_Token_Five_ENS',
        TOKEN_OWNER_TWO
      )
    );
    handleNewTokenENSAddresses(newENSAddresses);
    });
  
    afterAll(() => {
      clearStore();
    });
  
    describe('New Token ENS Assertions', () => {
        test('Check the number of NewTokenENS events to be valid', () => {
          assert.entityCount('NewTokenENS', 6);
        });
        test('Check the `description` and `triggeredBy` fields of each new token ens event to be equal to expected values', () => {
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(0),
            'ENS',
            'New_Token_Zero_ENS'
          );
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(1),
            'ENS',
            'New_Token_One_ENS'
          );
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(2),
            'ENS',
            'New_Token_Two_ENS'
          );
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(3),
            'ENS',
            'New_Token_Three_ENS'
          );
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(4),
            'ENS',
            'New_Token_Four_ENS'
          );
          assert.fieldEquals(
            'NewTokenENS',
            makeEventId(5),
            'ENS',
            'New_Token_Five_ENS'
          );
        });
      });    
});
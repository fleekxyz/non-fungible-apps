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
import { createNewTokenNameEvent, handleNewTokenNames, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewTokenName } from '../../generated/FleekNFA/FleekNFA';

describe('New Token Name tests', () => {
    beforeAll(() => {
      // NEW TOKEN NAME EVENTS
      let newTokenNames: NewTokenName[] = [];
      newTokenNames.push(
      createNewTokenNameEvent(
                  0,
                  BigInt.fromI32(0),
                  'Token Zero New Name',
                  TOKEN_OWNER_ONE
                )
              );
              newTokenNames.push(
                createNewTokenNameEvent(
                  1,
                  BigInt.fromI32(1),
                  'Token One New Name',
                  TOKEN_OWNER_TWO
                )
              );
              newTokenNames.push(
                createNewTokenNameEvent(
                  2,
                  BigInt.fromI32(2),
                  'Token Two New Name',
                  TOKEN_OWNER_ONE
                )
              );
              newTokenNames.push(
                createNewTokenNameEvent(
                  3,
                  BigInt.fromI32(3),
                  'Token Three New Name',
                  TOKEN_OWNER_ONE
                )
              );
              newTokenNames.push(
                createNewTokenNameEvent(
                  4,
                  BigInt.fromI32(4),
                  'Token Four New Name',
                  TOKEN_OWNER_TWO
                )
              );
              newTokenNames.push(
                createNewTokenNameEvent(
                  5,
                  BigInt.fromI32(0),
                  'Token Zero New Name By New Owner',
                  TOKEN_OWNER_TWO
                )
              );
              handleNewTokenNames(newTokenNames);          
    });
  
    afterAll(() => {
      clearStore();
    });
  
    describe('New Token Name Events', () => {
      test('Check the number of NewTokenName to be valid', () => {
        assert.entityCount('NewTokenName', 6);
      });
      test('Check the `name` and `triggeredBy` fields of each new token name event to be equal to expected values', () => {
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(0),
          'name',
          'Token Zero New Name'
        );
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(1),
          'name',
          'Token One New Name'
        );
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(2),
          'name',
          'Token Two New Name'
        );
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(3),
          'name',
          'Token Three New Name'
        );
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(4),
          'name',
          'Token Four New Name'
        );
        assert.fieldEquals(
          'NewTokenName',
          makeEventId(5),
          'name',
          'Token Zero New Name By New Owner'
        );
      });
    });  
});
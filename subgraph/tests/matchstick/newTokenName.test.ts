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
import { CONTRACT, createNewTokenNameEvent, createTransferEvent, handleNewTokenNames, handleTransfers, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewTokenName, Transfer } from '../../generated/FleekNFA/FleekNFA';

describe('Describe entity assertions', () => {
    beforeAll(() => {
        describe('Describe entity assertions', () => {
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
    })});
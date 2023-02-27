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
import { CONTRACT, createNewTokenDescriptionEvent, handleNewTokenDescriptions, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewTokenDescription } from '../../generated/FleekNFA/FleekNFA';

describe('New Token Description Tests', () => {
    beforeAll(() => {
        // New Token Descriptions
        let newTokenDescriptions: NewTokenDescription[] = [];
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            0,
            BigInt.fromI32(0),
            'New Token Zero Description',
            TOKEN_OWNER_ONE
          )
        );
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            1,
            BigInt.fromI32(1),
            'New Token One Description',
            TOKEN_OWNER_TWO
          )
        );
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            2,
            BigInt.fromI32(2),
            'New Token Two Description',
            TOKEN_OWNER_ONE
          )
        );
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            3,
            BigInt.fromI32(3),
            'New Token Three Description',
            TOKEN_OWNER_ONE
          )
        );
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            4,
            BigInt.fromI32(4),
            'New Token Four Description',
            TOKEN_OWNER_TWO
          )
        );
        newTokenDescriptions.push(
          createNewTokenDescriptionEvent(
            5,
            BigInt.fromI32(5),
            'New Token Five Description By New Owner',
            TOKEN_OWNER_TWO
          )
        );
        handleNewTokenDescriptions(newTokenDescriptions);    
    });
  
    afterAll(() => {
      clearStore();
    });
  
    describe('New Token Description Events', () => {
        test('Check the number of NewTokenDescription events to be valid', () => {
          assert.entityCount('NewTokenDescription', 6);
        });
        test('Check the `description` and `triggeredBy` fields of each new token name event to be equal to expected values', () => {
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(0),
            'description',
            'New Token Zero Description'
          );
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(1),
            'description',
            'New Token One Description'
          );
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(2),
            'description',
            'New Token Two Description'
          );
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(3),
            'description',
            'New Token Three Description'
          );
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(4),
            'description',
            'New Token Four Description'
          );
          assert.fieldEquals(
            'NewTokenDescription',
            makeEventId(5),
            'description',
            'New Token Five Description By New Owner'
          );
        });
      });    
});
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
import { CONTRACT, createNewTokenExternalURLEvent, handleNewTokenExternalURLs, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewTokenExternalURL } from '../../generated/FleekNFA/FleekNFA';

describe('New Token External URLs tests', () => {
    beforeAll(() => {
    // New Token External URLs
    let newTokenExternalURLs: NewTokenExternalURL[] = [];
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        0,
        BigInt.fromI32(0),
        'https://0_external.url',
        TOKEN_OWNER_ONE
      )
    );
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        1,
        BigInt.fromI32(1),
        'https://1_external.url',
        TOKEN_OWNER_TWO
      )
    );
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        2,
        BigInt.fromI32(2),
        'https://2_external.url',
        TOKEN_OWNER_ONE
      )
    );
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        3,
        BigInt.fromI32(3),
        'https://3_external.url',
        TOKEN_OWNER_ONE
      )
    );
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        4,
        BigInt.fromI32(4),
        'https://4_external.url',
        TOKEN_OWNER_TWO
      )
    );
    newTokenExternalURLs.push(
      createNewTokenExternalURLEvent(
        5,
        BigInt.fromI32(5),
        'https://5_external.url',
        TOKEN_OWNER_TWO
      )
    );
    handleNewTokenExternalURLs(newTokenExternalURLs);

    });
  
    afterAll(() => {
      clearStore();
    });
  
    describe('New Token External URL Events', () => {
        test('Check the number of newTokenExternalURl events to be valid', () => {
          assert.entityCount('NewTokenExternalURL', 6);
        });
        test('Check the `description` and `triggeredBy` fields of each new token name event to be equal to expected values', () => {
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(0),
            'externalURL',
            'https://0_external.url'
          );
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(1),
            'externalURL',
            'https://1_external.url'
          );
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(2),
            'externalURL',
            'https://2_external.url'
          );
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(3),
            'externalURL',
            'https://3_external.url'
          );
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(4),
            'externalURL',
            'https://4_external.url'
          );
          assert.fieldEquals(
            'NewTokenExternalURL',
            makeEventId(5),
            'externalURL',
            'https://5_external.url'
          );
        });
      });    
});
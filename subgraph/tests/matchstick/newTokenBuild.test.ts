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
import { createNewBuildEvent, handleNewBuilds, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from './helpers/utils';
import { NewBuild } from '../../generated/FleekNFA/FleekNFA';

describe('New Token Build tests', () => {
    beforeAll(() => {
    // New Token ENS Build
    let newBuilds: NewBuild[] = [];
    newBuilds.push(
      createNewBuildEvent(0, BigInt.fromI32(0), 'hash0_0', TOKEN_OWNER_ONE)
    );
    newBuilds.push(
      createNewBuildEvent(1, BigInt.fromI32(1), 'hash1_0', TOKEN_OWNER_TWO)
    );
    newBuilds.push(
      createNewBuildEvent(2, BigInt.fromI32(2), 'hash2_0', TOKEN_OWNER_ONE)
    );
    newBuilds.push(
      createNewBuildEvent(3, BigInt.fromI32(3), 'hash3_0', TOKEN_OWNER_ONE)
    );
    newBuilds.push(
      createNewBuildEvent(4, BigInt.fromI32(4), 'hash4_0', TOKEN_OWNER_TWO)
    );
    newBuilds.push(
      createNewBuildEvent(5, BigInt.fromI32(5), 'hash5_0', TOKEN_OWNER_TWO)
    );
    handleNewBuilds(newBuilds);
});
  
    afterAll(() => {
      clearStore();
    });
  
    describe('Assert New Build Events', () => {
        test('Check the number of NewTokenBuild events to be valid', () => {
          assert.entityCount('NewTokenBuild', 6);
        });
        test('Check the `commitHash` and `triggeredBy` fields of each new token build event to be equal to expected values', () => {
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(0),
            'commitHash',
            'hash0_0'
          );
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(1),
            'commitHash',
            'hash1_0'
          );
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(2),
            'commitHash',
            'hash2_0'
          );
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(3),
            'commitHash',
            'hash3_0'
          );
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(4),
            'commitHash',
            'hash4_0'
          );
          assert.fieldEquals(
            'NewTokenBuild',
            makeEventId(5),
            'commitHash',
            'hash5_0'
          );
        });
      });    
});
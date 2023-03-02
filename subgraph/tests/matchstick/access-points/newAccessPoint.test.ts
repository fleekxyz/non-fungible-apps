import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from 'matchstick-as/assembly/index';
  import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { createNewAccessPointEvent, handleNewAccessPoints, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from '../helpers/utils';
import { NewAccessPoint } from '../../../generated/FleekNFA/FleekNFA';

describe('New Access Point tests', () => {
    beforeAll(() => {
      // New Access Points
      let newAccessPoints: NewAccessPoint[] = [];

      // Token Owner One has two access points: one for tokenId 0 and one for tokenId 1
      newAccessPoints.push(
        createNewAccessPointEvent(0, 'firstAP', BigInt.fromI32(0), TOKEN_OWNER_ONE)
      );
      newAccessPoints.push(
        createNewAccessPointEvent(1, 'secondAP', BigInt.fromI32(1), TOKEN_OWNER_ONE)
      );

      // Token Owner Two has one access point for tokenId 0
      newAccessPoints.push(
        createNewAccessPointEvent(2, 'thirdAP', BigInt.fromI32(0), TOKEN_OWNER_TWO)
      );
      handleNewAccessPoints(newAccessPoints);
    });
  
    afterAll(() => {
      clearStore();
    });
  
    describe('Assertions', () => {
        test('Check the number of `NewAccessPoint` events to be valid', () => {
            assert.entityCount('NewAccessPoint', 3);
        });

        test('Check the `apName` field of each event', () => {
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(0),
                'apName',
                'firstAP'.toString()
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(1),
                'apName',
                'secondAP'.toString()
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(2),
                'apName',
                'thirdAP'.toString()
            );
        });

        test('Check the `tokenId` field of each event', () => {
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(0),
                'tokenId',
                '0'
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(1),
                'tokenId',
                '1'
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(2),
                'tokenId',
                '0'
            );
        });

        test('Check the `owner` field of each event', () => {
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(0),
                'owner',
                TOKEN_OWNER_ONE.toString()
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(1),
                'owner',
                TOKEN_OWNER_ONE.toString()
            );
            assert.fieldEquals(
                'NewAccessPoint',
                makeEventId(2),
                'owner',
                TOKEN_OWNER_TWO.toString()
            );
        });

        test('check the existence of a nonexistent event in the database', () => {
            assert.notInStore('NewAccessPoint', makeEventId(3));
        });
    });
});
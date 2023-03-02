import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from 'matchstick-as/assembly/index';
  import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { createNewAccessPointEvent, createNewChangeAccessPointCreationStatus, handleChangeAccessPointCreationStatusList, handleNewAccessPoints, makeEventId, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from '../helpers/utils';
import { ChangeAccessPointCreationStatus, NewAccessPoint } from '../../../generated/FleekNFA/FleekNFA';

describe('Change Access Point Creation Status tests', () => {
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
        test('Check the `creationStatus` field of each access point entity', () => {
            assert.fieldEquals(
                'AccessPoint',
                'firstAP',
                'creationStatus',
                'DRAFT'
            );
            assert.fieldEquals(
                'AccessPoint',
                'secondAP',
                'creationStatus',
                'DRAFT'
            );
            assert.fieldEquals(
                'AccessPoint',
                'thirdAP',
                'creationStatus',
                'DRAFT'
            );
        });

        test('Check the `creationStatus` field of each access point entity after changing it', () => {
          // New Access Points
          let changeAccessPointCreationStatusList: ChangeAccessPointCreationStatus[] = [];
          
          // Token Owner One has two access points: one for tokenId 0 and one for tokenId 1
          changeAccessPointCreationStatusList.push(
              createNewChangeAccessPointCreationStatus(0, 'firstAP', BigInt.fromI32(0), 1, TOKEN_OWNER_ONE)
          );
          changeAccessPointCreationStatusList.push(
            createNewChangeAccessPointCreationStatus(0, 'secondAP', BigInt.fromI32(1), 1, TOKEN_OWNER_ONE)
          );

            // Token Owner Two has one access point for tokenId 0
            changeAccessPointCreationStatusList.push(
                createNewChangeAccessPointCreationStatus(0, 'thirdAP', BigInt.fromI32(0), 1, TOKEN_OWNER_TWO)
            );
            
            handleChangeAccessPointCreationStatusList(changeAccessPointCreationStatusList);

            assert.fieldEquals(
                'AccessPoint',
                'firstAP',
                'creationStatus',
                'APPROVED'
            );
            assert.fieldEquals(
                'AccessPoint',
                'secondAP',
                'creationStatus',
                'APPROVED'
            );
            assert.fieldEquals(
                'AccessPoint',
                'thirdAP',
                'creationStatus',
                'APPROVED'
            );
        });
    });
});
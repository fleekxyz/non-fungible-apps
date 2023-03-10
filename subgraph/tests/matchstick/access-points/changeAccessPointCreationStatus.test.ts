import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from 'matchstick-as/assembly/index';
  import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { createNewAccessPointEvent, createNewChangeAccessPointCreationStatus, handleChangeAccessPointCreationStatusList, handleNewAccessPoints, makeEventId, USER_ONE, USER_TWO } from '../helpers/utils';
import { ChangeAccessPointCreationStatus, NewAccessPoint } from '../../../generated/FleekNFA/FleekNFA';

describe('Change Access Point Creation Status tests', () => {
    beforeAll(() => {
      // New Access Points
      let newAccessPoints: NewAccessPoint[] = [];

      // User One has two access points: one for tokenId 0 and one for tokenId 1
      newAccessPoints.push(
        createNewAccessPointEvent(0, 'firstAP', BigInt.fromI32(0), USER_ONE)
      );
      newAccessPoints.push(
        createNewAccessPointEvent(1, 'secondAP', BigInt.fromI32(1), USER_ONE)
      );

      // User Two has one access point for tokenId 0
      newAccessPoints.push(
        createNewAccessPointEvent(2, 'thirdAP', BigInt.fromI32(0), USER_TWO)
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
          
          // User One has two access points: one for tokenId 0 and one for tokenId 1
          changeAccessPointCreationStatusList.push(
              createNewChangeAccessPointCreationStatus(0, 'firstAP', BigInt.fromI32(0), 1, USER_ONE)
          );
          changeAccessPointCreationStatusList.push(
            createNewChangeAccessPointCreationStatus(0, 'secondAP', BigInt.fromI32(1), 1, USER_ONE)
          );

            // User Two has one access point for tokenId 0
            changeAccessPointCreationStatusList.push(
                createNewChangeAccessPointCreationStatus(0, 'thirdAP', BigInt.fromI32(0), 1, USER_TWO)
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
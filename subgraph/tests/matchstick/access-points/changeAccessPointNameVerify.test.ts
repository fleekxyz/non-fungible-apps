import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
  } from 'matchstick-as/assembly/index';
  import { BigInt } from '@graphprotocol/graph-ts';
import { createNewAccessPointEvent, createNewChangeAccessPointNameVerify, handleChangeAccessPointNameVerifies, handleNewAccessPoints, TOKEN_OWNER_ONE, TOKEN_OWNER_TWO } from '../helpers/utils';
import { ChangeAccessPointNameVerify, NewAccessPoint } from '../../../generated/FleekNFA/FleekNFA';

describe('Change Access Point Name Verify tests', () => {
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
        test('Check the `nameVerified` field of each access point entity', () => {
            assert.fieldEquals(
                'AccessPoint',
                'firstAP',
                'nameVerified',
                'false'
            );
            assert.fieldEquals(
                'AccessPoint',
                'secondAP',
                'nameVerified',
                'false'
            );
            assert.fieldEquals(
                'AccessPoint',
                'thirdAP',
                'nameVerified',
                'false'
            );
        });

        test('Check the `nameVerified` field of each access point entity after changing it', () => {
          // New Access Point Name Verified fields
          let changeAccessPointNameVerifies: ChangeAccessPointNameVerify[] = [];
          
          changeAccessPointNameVerifies.push(
              createNewChangeAccessPointNameVerify(0, 'firstAP', BigInt.fromI32(0), true, TOKEN_OWNER_ONE)
          );
          changeAccessPointNameVerifies.push(
            createNewChangeAccessPointNameVerify(0, 'secondAP', BigInt.fromI32(1), true, TOKEN_OWNER_ONE)
          );

          changeAccessPointNameVerifies.push(
            createNewChangeAccessPointNameVerify(0, 'thirdAP', BigInt.fromI32(0), true, TOKEN_OWNER_TWO)
          );
            
          handleChangeAccessPointNameVerifies(changeAccessPointNameVerifies);

            assert.fieldEquals(
                'AccessPoint',
                'firstAP',
                'nameVerified',
                'true'
            );
            assert.fieldEquals(
                'AccessPoint',
                'secondAP',
                'nameVerified',
                'true'
            );
            assert.fieldEquals(
                'AccessPoint',
                'thirdAP',
                'nameVerified',
                'true'
            );
        });
    });
});
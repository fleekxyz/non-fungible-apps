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
import '../../generated/schema';
import '../../generated/FleekNFA/FleekNFA';
import '../../src/fleek-nfa';
import {
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenName,
  Transfer,
} from '../../generated/FleekNFA/FleekNFA';
import {
  CONTRACT,
  createNewBuildEvent,
  createNewTokenDescriptionEvent,
  createNewTokenENSEvent,
  createNewTokenExternalURLEvent,
  createNewTokenNameEvent,
  createTransferEvent,
  handleNewBuilds,
  handleNewTokenDescriptions,
  handleNewTokenENSAddresses,
  handleNewTokenExternalURLs,
  handleNewTokenNames,
  handleTransfers,
  makeEventId,
  TOKEN_OWNER_ONE,
  TOKEN_OWNER_TWO,
} from './helpers/utils';

describe('Describe entity assertions', () => {
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

    // New Token External URLs
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

    logStore();
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

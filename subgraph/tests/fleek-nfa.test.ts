import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from 'matchstick-as/assembly/index';
import { BigInt } from '@graphprotocol/graph-ts';
import '../generated/schema';
import '../generated/FleekNFA/FleekNFA';
import '../src/fleek-nfa';
import './utils';
import {
  NewBuild,
  NewTokenDescription,
  NewTokenENS,
  NewTokenExternalURL,
  NewTokenName,
  Transfer,
} from '../generated/FleekNFA/FleekNFA';
import {
  CONTRACT,
  createNewBuildEvent,
  createNewTokenDescriptionEvent,
  createNewTokenENSEvent,
  createNewTokenExternalURLEvent,
  createNewTokenNameEvent,
  createTransferEvent,
  handleNewBuilds,
  handleNewTokenENSAddresses,
  handleNewTokenExternalURLs,
  handleNewTokenNames,
  handleTransfers,
  TOKEN_OWNER_ONE,
  TOKEN_OWNER_TWO,
} from './utils';

describe('Describe entity assertions', () => {
  beforeAll(() => {
    // TRANSFERS
    let transfers: Transfer[] = [];
    transfers.push(
      createTransferEvent(0, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(0))
    );
    transfers.push(
      createTransferEvent(1, CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(1))
    );
    transfers.push(
      createTransferEvent(2, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(2))
    );
    transfers.push(
      createTransferEvent(3, CONTRACT, TOKEN_OWNER_ONE, BigInt.fromI32(3))
    );
    transfers.push(
      createTransferEvent(
        4,
        TOKEN_OWNER_TWO,
        TOKEN_OWNER_ONE,
        BigInt.fromI32(1)
      )
    );
    transfers.push(
      createTransferEvent(5, CONTRACT, TOKEN_OWNER_TWO, BigInt.fromI32(4))
    );
    transfers.push(
      createTransferEvent(
        6,
        TOKEN_OWNER_ONE,
        TOKEN_OWNER_TWO,
        BigInt.fromI32(0)
      )
    );
    handleTransfers(transfers);

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
    handleNewTokenENSAddresses(newENSAddresses);

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

  describe('Transfers', () => {
    test('Check the number of transfers to be valid', () => {
      assert.entityCount('Transfer', 7);
    });
    test('Check the `from` and `to` fields of each transfer to be equal to expected values', () => {
      assert.fieldEquals(
        'Transfer',
        '0',
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '1',
        'to',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        '2',
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '3',
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '4',
        'to',
        '0x2000000000000000000000000000000000000002'
      );
      assert.fieldEquals(
        'Transfer',
        '5',
        'to',
        '0x3000000000000000000000000000000000000003'
      );
      assert.fieldEquals(
        'Transfer',
        '6',
        'to',
        '0x3000000000000000000000000000000000000003'
      );
    });
  });

  describe('New Token Name Events', () => {
    test('Check the number of newTokenName to be valid', () => {
      assert.entityCount('newTokenName', 6);
    });
    test('Check the `name` and `triggeredBy` fields of each new token name event to be equal to expected values', () => {
      assert.fieldEquals('newTokenName', '0', 'name', 'Token Zero New Name');
      assert.fieldEquals('newTokenName', '1', 'name', 'Token One New Name');
      assert.fieldEquals('newTokenName', '2', 'name', 'Token Two New Name');
      assert.fieldEquals('newTokenName', '3', 'name', 'Token Three New Name');
      assert.fieldEquals('newTokenName', '4', 'name', 'Token Four New Name');
      assert.fieldEquals(
        'newTokenName',
        '5',
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
        '0',
        'externalURL',
        'https://0_external.url'
      );
      assert.fieldEquals(
        'NewTokenExternalURL',
        '1',
        'externalURL',
        'https://1_external.url'
      );
      assert.fieldEquals(
        'NewTokenExternalURL',
        '2',
        'externalURL',
        'https://2_external.url'
      );
      assert.fieldEquals(
        'NewTokenExternalURL',
        '3',
        'externalURL',
        'https://3_external.url'
      );
      assert.fieldEquals(
        'NewTokenExternalURL',
        '4',
        'externalURL',
        'https://4_external.url'
      );
      assert.fieldEquals(
        'NewTokenExternalURL',
        '5',
        'externalURL',
        "https://5'_external.url"
      );
    });
  });

  describe('New Token Description Events', () => {
    test('Check the number of newTokenDescription events to be valid', () => {
      assert.entityCount('newTokenDescription', 6);
    });
    test('Check the `description` and `triggeredBy` fields of each new token name event to be equal to expected values', () => {
      assert.fieldEquals(
        'newTokenDescription',
        '0',
        'description',
        'New Token Zero Description'
      );
      assert.fieldEquals(
        'newTokenDescription',
        '1',
        'description',
        'New Token One Description'
      );
      assert.fieldEquals(
        'newTokenDescription',
        '2',
        'description',
        'New Token Two Description'
      );
      assert.fieldEquals(
        'newTokenDescription',
        '3',
        'description',
        'New Token Three Description'
      );
      assert.fieldEquals(
        'newTokenDescription',
        '4',
        'description',
        'New Token Four Description'
      );
      assert.fieldEquals(
        'newTokenDescription',
        '5',
        'description',
        'New Token Five Description By New Owner'
      );
    });
  });
});

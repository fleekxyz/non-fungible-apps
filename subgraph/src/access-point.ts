import {
  Address,
  Bytes,
  log,
  store,
  ethereum,
  BigInt,
} from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
  ChangeAccessPointCreationStatus as ChangeAccessPointCreationStatusEvent,
  ChangeAccessPointScore as ChangeAccessPointCreationScoreEvent,
  NewAccessPoint as NewAccessPointEvent,
  ChangeAccessPointNameVerify as ChangeAccessPointNameVerifyEvent,
  ChangeAccessPointContentVerify as ChangeAccessPointContentVerifyEvent,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import { AccessPoint, Owner } from '../generated/schema';

/**
 * This handler will create and load entities in the following order:
 * - AccessPoint [create]
 * - Owner [load / create]
 * Note to discuss later: Should a `NewAccessPoint` entity be also created and defined?
 */
export function handleNewAccessPoint(event: NewAccessPointEvent): void {
  // Create an AccessPoint entity
  let accessPointEntity = new AccessPoint(event.params.apName);
  accessPointEntity.score = BigInt.fromU32(0);
  accessPointEntity.contentVerified = false;
  accessPointEntity.nameVerified = false;
  accessPointEntity.creationStatus = 'DRAFT'; // Since a `ChangeAccessPointCreationStatus` event is emitted instantly after `NewAccessPoint`, the status will be updated in that handler.
  accessPointEntity.owner = event.params.owner;
  accessPointEntity.token = Bytes.fromByteArray(
    Bytes.fromBigInt(event.params.tokenId)
  );

  // Load / Create an Owner entity
  let ownerEntity = Owner.load(event.params.owner);

  if (!ownerEntity) {
    // Create a new owner entity
    ownerEntity = new Owner(event.params.owner);
    // Since no CollectionRoleChanged event was emitted before for this address, we can set `collection` to false.
    ownerEntity.collection = false;
  }

  // Save entities.
  accessPointEntity.save();
  ownerEntity.save();
}

/**
 * This handler will update the status of an access point entity.
 */
export function handleChangeAccessPointCreationStatus(
  event: ChangeAccessPointCreationStatusEvent
): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);
  let status = event.params.status;

  if (accessPointEntity) {
    switch (status) {
      case 0:
        accessPointEntity.creationStatus = 'DRAFT';
        break;
      case 1:
        accessPointEntity.creationStatus = 'APPROVED';
        break;
      case 2:
        accessPointEntity.creationStatus = 'REJECTED';
        break;
      case 3:
        accessPointEntity.creationStatus = 'REMOVED';
        break;
      default:
        // Unknown status
        log.error(
          'Unable to handle ChangeAccessPointCreationStatus. Unknown status. Status: {}, AccessPoint: {}',
          [status.toString(), event.params.apName]
        );
    }

    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error(
      'Unable to handle ChangeAccessPointCreationStatus. Unknown access point. Status: {}, AccessPoint: {}',
      [status.toString(), event.params.apName]
    );
  }
}

/**
 * This handler will update the score of an access point entity.
 */
export function handleChangeAccessPointScore(
  event: ChangeAccessPointCreationScoreEvent
): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.score = event.params.score;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error(
      'Unable to handle ChangeAccessPointScore. Unknown access point. Score: {}, AccessPoint: {}',
      [event.params.score.toString(), event.params.apName]
    );
  }
}

/**
 * This handler will update the nameVerified field of an access point entity.
 */
export function handleChangeAccessPointNameVerify(
  event: ChangeAccessPointNameVerifyEvent
): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.nameVerified = event.params.verified;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error(
      'Unable to handle ChangeAccessPointNameVerify. Unknown access point. Verified: {}, AccessPoint: {}',
      [event.params.verified.toString(), event.params.apName]
    );
  }
}

/**
 * This handler will update the contentVerified field of an access point entity.
 */
export function handleChangeAccessPointContentVerify(
  event: ChangeAccessPointContentVerifyEvent
): void {
  // Load the AccessPoint entity
  let accessPointEntity = AccessPoint.load(event.params.apName);

  if (accessPointEntity) {
    accessPointEntity.contentVerified = event.params.verified;
    accessPointEntity.save();
  } else {
    // Unknown access point
    log.error(
      'Unable to handle ChangeAccessPointContentVerify. Unknown access point. Verified: {}, AccessPoint: {}',
      [event.params.verified.toString(), event.params.apName]
    );
  }
}

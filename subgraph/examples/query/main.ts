import { ExecutionResult } from 'graphql';
import {
  allNameChangesOfTokenZeroDocument,
  allNameChangesOfTokenZeroQuery,
  allNameChangesOfTokenZeroTriggeredByUserDocument,
  allNameChangesOfTokenZeroTriggeredByUserQuery,
  allNameChangesOfTokenZeroTriggeredByUserQueryVariables,
  execute,
  firstFiveMintsByUserDocument,
  firstFiveMintsByUserQuery,
  lastFiveMintsDocument,
  lastFiveMintsQuery,
  theSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument,
  theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery,
  theThreeNewestBuildsThatWereNotTriggeredByUserDocument,
  theThreeNewestBuildsThatWereNotTriggeredByUserQuery,
} from './.graphclient';

function main() {
  execute(firstFiveMintsByUserDocument, {}).then(
    (result: ExecutionResult<firstFiveMintsByUserQuery>) => {
      console.log('\nFirst five mints by the user:');
      console.log(result.data?.transfers);
    }
  );

  execute(lastFiveMintsDocument, {}).then(
    (result: ExecutionResult<lastFiveMintsQuery>) => {
      console.log('\nThe last five mints:');
      console.log(result.data?.transfers);
    }
  );

  execute(allNameChangesOfTokenZeroDocument, {}).then(
    (result: ExecutionResult<allNameChangesOfTokenZeroQuery>) => {
      console.log('\nAll name changes of token 0:');
      console.log(result.data?.newTokenNames);
    }
  );

  execute(allNameChangesOfTokenZeroTriggeredByUserDocument, {}).then(
    (
      result: ExecutionResult<allNameChangesOfTokenZeroTriggeredByUserQuery>
    ) => {
      console.log(
        '\nAll name changes of token 0 which were triggered by the user:'
      );
      console.log(result.data?.newTokenNames);
    }
  );

  execute(
    theSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument,
    {}
  ).then(
    (
      result: ExecutionResult<theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery>
    ) => {
      console.log(
        '\nThe second and third collection role granted events which were triggered by the user:'
      );
      console.log(result.data?.collectionRoleGranteds);
    }
  );

  execute(theThreeNewestBuildsThatWereNotTriggeredByUserDocument, {}).then(
    (
      result: ExecutionResult<theThreeNewestBuildsThatWereNotTriggeredByUserQuery>
    ) => {
      console.log(
        '\nThe three newest builds which were not triggered by user:'
      );
      console.log(result.data?.newBuilds);
    }
  );
}

main();

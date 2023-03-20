import { useEffect } from 'react';
import { Flex, Form, Spinner } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';
import { BranchField, CommitHashField } from './fields';

export const RepoBranchCommitFields = () => {
  const { queryLoading } = useGithubStore();
  const dispatch = useAppDispatch();
  const {
    form: { gitBranch, gitCommit },
  } = useMintFormContext();

  const { repositoryName, repositoryOwner } = Mint.useContext();

  useEffect(() => {
    if (queryLoading === 'idle') {
      dispatch(
        githubActions.fetchBranchesThunk({
          owner: repositoryOwner,
          repository: repositoryName.name,
        })
      );
    }
  }, [queryLoading, dispatch]);

  if (queryLoading === 'loading') {
    return (
      <Flex
        css={{
          height: '9.75rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Form.Field context={gitBranch}>
        <BranchField />
      </Form.Field>
      <Form.Field context={gitCommit}>
        <CommitHashField />
      </Form.Field>
    </>
  );
};

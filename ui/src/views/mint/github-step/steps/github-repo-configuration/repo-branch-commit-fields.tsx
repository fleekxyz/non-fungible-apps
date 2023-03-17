import { useEffect } from 'react';
import { Flex, Form, Spinner } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';

export const RepoBranchCommitFields = () => {
  const { queryLoading, branches } = useGithubStore();
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

  useEffect(() => {
    if (queryLoading === 'success' && branches.length > 0) {
      const defaultBranch = branches.find(
        (branch) =>
          branch.label.toLowerCase() ===
          repositoryName.defaultBranch.toLowerCase()
      );
      if (defaultBranch) {
        // setBranchName(defaultBranch);
        // setCommitHash(defaultBranch.value);
      }
    }
  }, [queryLoading, branches]);

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
        <Form.Label>Git Branch</Form.Label>
        <Form.Combobox leftIcon="branch" items={branches} />
      </Form.Field>
      <Form.Field context={gitCommit}>
        <Form.Label>Git Commit</Form.Label>
        <Form.Input placeholder="Select branch to get last commit" />
        <Form.Overline />
      </Form.Field>
    </>
  );
};

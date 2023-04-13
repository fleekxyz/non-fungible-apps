import { useEffect } from 'react';

import { Flex, Form, Spinner } from '@/components';
import {
  githubActions,
  GithubClient,
  useAppDispatch,
  useGithubStore,
} from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';

export const RepoBranchCommitFields: React.FC = () => {
  const { queryLoading, branches } = useGithubStore();
  const dispatch = useAppDispatch();
  const {
    form: { gitBranch: gitBranchContext, gitCommit: gitCommitContext },
  } = useMintFormContext();

  const {
    value: [gitBranch, setGitBranch],
  } = gitBranchContext;

  const {
    value: [, setGitCommit],
  } = gitCommitContext;

  const { repositoryName, selectedUserOrg } = Mint.useContext();

  useEffect(() => {
    if (queryLoading === 'idle') {
      dispatch(
        githubActions.fetchBranchesThunk({
          owner: selectedUserOrg.label,
          repository: repositoryName.name,
        })
      );
    }
  }, [queryLoading, dispatch, selectedUserOrg.label, repositoryName.name]);

  useEffect(() => {
    try {
      if (
        queryLoading === 'success' &&
        branches.length > 0 &&
        repositoryName.defaultBranch !== undefined &&
        gitBranch === '' //we only set the default branch the first time
      ) {
        const defaultBranch = branches.find(
          (branch) =>
            branch.name.toLowerCase() ===
            repositoryName.defaultBranch.toLowerCase()
        );
        if (defaultBranch) {
          setGitBranch(defaultBranch.name);
          setGitCommit(defaultBranch.commit);
        }
      }
    } catch (error) {
      AppLog.errorToast('We had a problem. Try again');
    }
  }, [
    queryLoading,
    branches,
    repositoryName.defaultBranch,
    gitBranch,
    setGitBranch,
    setGitCommit,
  ]);

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

  const handleBranchChange = (branch: GithubClient.Branch): void => {
    setGitBranch(branch.name);
    setGitCommit(branch.commit);
  };

  const branchQueryFilter = (
    query: string,
    item: GithubClient.Branch
  ): boolean => item.name.includes(query);

  const branchHandleValue = (item: GithubClient.Branch): string => item.name;

  return (
    <>
      <Form.Field context={gitBranchContext}>
        <Form.Label>Git Branch</Form.Label>
        <Form.Combobox
          items={branches}
          onChange={handleBranchChange}
          queryFilter={branchQueryFilter}
          handleValue={branchHandleValue}
        >
          {({ Field, Options }) => (
            <>
              <Field>{(selected) => selected?.name || 'Select a branch'}</Field>

              <Options>{(item) => item.name}</Options>
            </>
          )}
        </Form.Combobox>
      </Form.Field>
      <Form.Field context={gitCommitContext}>
        <Form.Label>Git Commit</Form.Label>
        <Form.Input placeholder="Select branch to get last commit" />
        <Form.Overline />
      </Form.Field>
    </>
  );
};

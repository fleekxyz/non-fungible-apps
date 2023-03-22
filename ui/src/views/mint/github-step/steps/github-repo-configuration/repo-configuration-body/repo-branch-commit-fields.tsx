import { useEffect } from 'react';
import { ComboboxItem, Flex, Form, Spinner } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';
import { AppLog } from '@/utils';

export const RepoBranchCommitFields = () => {
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
  }, [queryLoading, dispatch]);

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
            branch.label.toLowerCase() ===
            repositoryName.defaultBranch.toLowerCase()
        );
        if (defaultBranch) {
          setGitBranch(defaultBranch.label);
          setGitCommit(defaultBranch.value);
        }
      }
    } catch (error) {
      AppLog.errorToast('We had a problem. Try again');
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

  const handleBranchChange = (branch: ComboboxItem) => {
    setGitBranch(branch.label);
    setGitCommit(branch.value);
  };

  return (
    <>
      <Form.Field context={gitBranchContext}>
        <Form.Label>Git Branch</Form.Label>
        <Form.Combobox
          leftIcon="branch"
          items={branches}
          onChange={handleBranchChange}
        />
      </Form.Field>
      <Form.Field context={gitCommitContext}>
        <Form.Label>Git Commit</Form.Label>
        <Form.Input placeholder="Select branch to get last commit" />
        <Form.Overline />
      </Form.Field>
    </>
  );
};

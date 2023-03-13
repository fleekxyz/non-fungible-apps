import { useEffect } from 'react';

import { Dropdown, DropdownItem, Flex, Form, Spinner } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

export const RepoBranchCommitFields = () => {
  const { queryLoading, branches } = useGithubStore();
  const dispatch = useAppDispatch();

  const {
    repositoryName,
    selectedUserOrg,
    branchName,
    commitHash,
    setBranchName,
    setCommitHash,
  } = Mint.useContext();

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

  const handleBranchChange = (dropdownOption: DropdownItem) => {
    setBranchName(dropdownOption);
    setCommitHash(dropdownOption.value);
  };

  const handleCommitHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitHash(e.target.value);
  };

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
      <Form.Field>
        <Form.Label>Git Branch</Form.Label>
        <Dropdown
          items={branches}
          selectedValue={branchName}
          onChange={handleBranchChange}
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Git Commit</Form.Label>
        <Form.Input
          placeholder="Select branch to get last commit"
          value={commitHash}
          onChange={handleCommitHashChange}
        />
      </Form.Field>
    </>
  );
};

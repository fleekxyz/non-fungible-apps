import { useEffect } from 'react';

import { Flex, Form, Icon, Spinner } from '@/components';
import {
  githubActions,
  GithubClient,
  useAppDispatch,
  useGithubStore,
} from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';
import { TextStyles } from './repo-branch-commit-fields.styles';

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
    if (!(queryLoading === 'idle' && selectedUserOrg && repositoryName)) return;
    dispatch(
      githubActions.fetchBranchesThunk({
        owner: selectedUserOrg?.label,
        repository: repositoryName.name,
      })
    );
  }, [queryLoading, dispatch, selectedUserOrg, repositoryName]);

  useEffect(() => {
    try {
      if (
        queryLoading !== 'success' ||
        branches.length === 0 ||
        !repositoryName ||
        gitBranch !== ''
      )
        return;

      const defaultBranch = branches.find(
        (branch) =>
          branch.name.toLowerCase() ===
          repositoryName.defaultBranch.toLowerCase()
      );

      if (defaultBranch) {
        setGitBranch(defaultBranch.name);
        setGitCommit(defaultBranch.commit);
      }
    } catch (error) {
      AppLog.errorToast('We had a problem. Try again');
    }
  }, [
    queryLoading,
    branches,
    repositoryName,
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

  return (
    <>
      <Form.Field context={gitBranchContext}>
        <Form.Label>Git Branch</Form.Label>
        <Form.Combobox
          items={branches}
          onChange={handleBranchChange}
          queryKey="name"
          handleValue={(item) => item.name}
        >
          {({ Field, Options }) => (
            <>
              <Field>
                {(selected) => (
                  <>
                    <Icon name="branch" />
                    <TextStyles ellipsis>
                      {selected?.name || 'Select a branch'}
                    </TextStyles>
                  </>
                )}
              </Field>

              <Options>
                {(item) => <TextStyles ellipsis>{item.name}</TextStyles>}
              </Options>
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

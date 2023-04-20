import { useEffect } from 'react';

import { Avatar, Combobox, Icon } from '@/components';
import {
  githubActions,
  GithubClient,
  useAppDispatch,
  useGithubStore,
} from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';

const renderSelected = (selected?: GithubClient.UserData): JSX.Element => (
  <>
    {selected ? (
      <Avatar
        src={selected.avatar}
        alt={selected.label}
        css={{ fontSize: '$2xl' }}
      />
    ) : (
      <Icon name="github" css={{ fontSize: '$2xl' }} />
    )}
    {selected?.label || 'Select'}
  </>
);

const renderItem = (item: GithubClient.UserData): JSX.Element => (
  <>
    <Avatar src={item.avatar} alt={item.label} />
    {item.label}
  </>
);

export const UserOrgsCombobox: React.FC = () => {
  const { queryUserAndOrganizations, userAndOrganizations } = useGithubStore();
  const dispatch = useAppDispatch();

  const { selectedUserOrg, setSelectedUserOrg } = Mint.useContext();

  useEffect(() => {
    if (queryUserAndOrganizations === 'idle') {
      dispatch(githubActions.fetchUserAndOrgsThunk());
    }
  }, [dispatch, queryUserAndOrganizations]);

  const handleUserOrgChange = (
    item: GithubClient.UserData | undefined
  ): void => {
    if (item) {
      dispatch(githubActions.fetchRepositoriesThunk(item.value));
      setSelectedUserOrg(item);
    } else {
      AppLog.errorToast('Error selecting user/org. Try again');
    }
  };

  useEffect(() => {
    if (
      queryUserAndOrganizations === 'success' &&
      selectedUserOrg?.value === undefined &&
      userAndOrganizations.length > 0
    ) {
      // sets the first user
      setSelectedUserOrg(userAndOrganizations[0]);
    }
  }, [
    queryUserAndOrganizations,
    selectedUserOrg,
    setSelectedUserOrg,
    userAndOrganizations,
  ]);

  return (
    <Combobox
      items={userAndOrganizations}
      unattached
      css={{ flex: 1, minWidth: '$44' }}
      selected={[selectedUserOrg, handleUserOrgChange]}
      queryKey="label"
    >
      {({ Field, Options }) => (
        <>
          <Field>{renderSelected}</Field>
          <Options>{renderItem}</Options>
        </>
      )}
    </Combobox>
  );
};

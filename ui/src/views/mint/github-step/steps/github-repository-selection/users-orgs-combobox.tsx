import { useEffect } from 'react';

import { Avatar, Combobox, ComboboxItem } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';

export const UserOrgsCombobox: React.FC = () => {
  const { queryUserAndOrganizations, userAndOrganizations } = useGithubStore();
  const dispatch = useAppDispatch();

  const { selectedUserOrg, setSelectedUserOrg } = Mint.useContext();

  useEffect(() => {
    if (queryUserAndOrganizations === 'idle') {
      dispatch(githubActions.fetchUserAndOrgsThunk());
    }
  }, [dispatch, queryUserAndOrganizations]);

  const handleUserOrgChange = (item: ComboboxItem): void => {
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
      selectedUserOrg.value === undefined &&
      userAndOrganizations.length > 0
    ) {
      //SET first user
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
      items={userAndOrganizations.map(
        (item) =>
          ({
            label: item.label,
            value: item.value,
            icon: <Avatar src={item.avatar} />,
          } as ComboboxItem)
      )}
      selectedValue={selectedUserOrg}
      onChange={handleUserOrgChange}
      leftIcon="github"
      css="flex-1"
    />
  );
};

import { Avatar, Combobox, ComboboxItem } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useEffect } from 'react';

export const UserOrgsCombobox = () => {
  const { queryUserAndOrganizations, userAndOrganizations } = useGithubStore();
  const dispatch = useAppDispatch();

  const { selectedUserOrg, setSelectedUserOrg } = Mint.useContext();

  useEffect(() => {
    if (queryUserAndOrganizations === 'idle') {
      dispatch(githubActions.fetchUserAndOrgsThunk());
    }
  }, [dispatch, queryUserAndOrganizations]);

  const handleUserOrgChange = (item: ComboboxItem) => {
    dispatch(githubActions.fetchRepositoriesThunk(item.value));
    setSelectedUserOrg(item);
  };

  if (
    queryUserAndOrganizations === 'success' &&
    selectedUserOrg.value === undefined &&
    userAndOrganizations.length > 0
  ) {
    //SET first user
    setSelectedUserOrg(userAndOrganizations[0]);
  }

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
    />
  );
};

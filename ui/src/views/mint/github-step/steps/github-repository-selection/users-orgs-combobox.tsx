import { Avatar, Combobox, ComboboxItem } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';
import { useEffect } from 'react';

export const UserOrgsCombobox = () => {
  const { queryUserAndOrganizations, userAndOrganizations } = useGithubStore();
  const dispatch = useAppDispatch();

  const { selectedUserOrg, setSelectedUserOrg, setRepositoryOwner } =
    Mint.useContext();

  useEffect(() => {
    if (queryUserAndOrganizations === 'idle') {
      dispatch(githubActions.fetchUserAndOrgsThunk());
    }
  }, [dispatch, queryUserAndOrganizations]);

  const handleUserOrgChange = (item: string) => {
    const ownerRepository = userAndOrganizations.find(
      (org) => org.value === item
    )?.label;
    if (ownerRepository) {
      setRepositoryOwner(ownerRepository);
      dispatch(githubActions.fetchRepositoriesThunk(item));
      setSelectedUserOrg(item);
    } else {
      AppLog.errorToast('Error selecting user/org. Try again');
    }
  };

  useEffect(() => {
    if (
      queryUserAndOrganizations === 'success' &&
      selectedUserOrg === '' &&
      userAndOrganizations.length > 0
    ) {
      //SET first user
      setSelectedUserOrg(userAndOrganizations[0].value);
      setRepositoryOwner(userAndOrganizations[0].label);
    }
  }, [queryUserAndOrganizations, selectedUserOrg, userAndOrganizations]);

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
    />
  );
};

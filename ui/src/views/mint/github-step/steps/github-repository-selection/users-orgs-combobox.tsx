import { Avatar, Combobox, ComboboxItem } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import { useGithub } from '../use-github';

export const UserOrgsCombobox = () => {
  const { queryLoading, userAndOrganizations } = useGithubStore();
  const dispatch = useAppDispatch();
  // const [itemsCombobox, setItemsCombobox] = useState<ComboboxItem[]>([]);
  const { selectedUserOrg, setSelectedUserOrg } = Mint.useContext();

  // const [
  //   { data: dataUser, status: statusUser },
  //   { data: dataOrgs, status: statusOrgs },
  // ] = useQueries([
  //   { queryKey: ['fetchUser'], queryFn: fetchUser },
  //   { queryKey: ['fetchOrgs'], queryFn: fetchOrgs },
  // ]);

  // if (statusUser === 'error' && statusOrgs === 'error') {
  //   //TODO add error toast
  //   alert('Error fetching user and orgs');
  // }

  // useEffect(() => {
  //   if (dataUser && dataOrgs) {
  //     let comboboxItems: ComboboxItem[] = [];

  //     const userItem: ComboboxItem = {
  //       value: dataUser.repos_url,
  //       label: dataUser.login,
  //       icon: <Avatar src={dataUser.avatar_url} />,
  //     };
  //     comboboxItems = [...comboboxItems, userItem];

  //     const orgsItems: ComboboxItem[] = dataOrgs.map((org) => ({
  //       value: org?.repos_url,
  //       label: org?.login,
  //       icon: <Avatar src={org?.avatar_url} />,
  //     }));
  //     comboboxItems = [...comboboxItems, ...orgsItems];

  //     selectedUserOrg.value === undefined &&
  //       setSelectedUserOrg(comboboxItems[0]);
  //     setItemsCombobox(comboboxItems);

  //     // if (statusUser === 'success' || statusOrgs === 'success')
  //     //   setLoading(false);
  //   }
  // }, [dataUser, dataOrgs]);

  if (queryLoading === 'idle') {
    dispatch(githubActions.fetchUserAndOrgsThunk());
  }

  const handleUserOrgChange = (item: ComboboxItem) => {
    // debugger;
    dispatch(githubActions.fetchRepositoriesThunk(item.value));
    setSelectedUserOrg(item);
  };

  return (
    <Combobox
      items={userAndOrganizations}
      selectedValue={selectedUserOrg}
      onChange={handleUserOrgChange}
    />
  );
};

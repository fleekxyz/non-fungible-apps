import { Card, Flex, Grid, Spinner } from '@/components';
import { Input } from '@/components/core/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useGithubStore } from '@/store';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';
import React, { useState } from 'react';
import { RepositoriesList } from './repositories-list';
import { UserOrgsCombobox } from './users-orgs-combobox';

export const Loading = () => (
  <Flex
    css={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '$60',
    }}
  >
    <Spinner />
  </Flex>
);

export const GithubRepositoryConnection: React.FC = () => {
  const { queryLoading, queryUserAndOrganizations } = useGithubStore();
  const [searchValue, setSearchValue] = useState('');

  const { setGithubStep, setSelectedUserOrg } = Mint.useContext();

  const setSearchValueDebounced = useDebounce(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    500
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSearchValueDebounced(event);
  };

  const handlePrevStepClick = () => {
    setGithubStep(1);
    setSelectedUserOrg('');
  };

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pr: '$3h' }}>
      <MintCardHeader
        title="Select Repository"
        onClickBack={handlePrevStepClick}
      />
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4', pr: '$3h' }}>
            <UserOrgsCombobox />
            <Input
              leftIcon="search"
              placeholder="Search repo"
              onChange={handleSearchChange}
            />
          </Flex>
          {queryLoading === 'loading' ||
          queryUserAndOrganizations === 'loading' ? (
            <Loading />
          ) : (
            <RepositoriesList searchValue={searchValue} />
          )}
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};

import { Card, ComboboxItem, Flex, Grid, Icon, Spinner } from '@/components';
import { Input } from '@/components/core/input';
import { useGithubStore } from '@/store';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';
import React, { forwardRef, useRef, useState } from 'react';
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

  const timeOutRef = useRef<NodeJS.Timeout>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 500);
  };

  const handlePrevStepClick = () => {
    setGithubStep(1);
    setSelectedUserOrg({} as ComboboxItem);
  };

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pb: '$0h' }}>
      <MintCardHeader
        title="Select Repository"
        onClickBack={handlePrevStepClick}
      />
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4' }}>
            <UserOrgsCombobox />
            <Input
              leftIcon="search"
              placeholder="Search"
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

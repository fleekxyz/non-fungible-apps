import React, { useState } from 'react';

import { Card, Flex, Grid, Icon, IconButton, Spinner } from '@/components';
import { Input } from '@/components/core/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

import { RepositoriesList } from './repositories-list';
import { UserOrgsCombobox } from './users-orgs-combobox';

export const Loading: React.FC = () => (
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

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.stopPropagation();
    setSearchValueDebounced(event);
  };

  const handlePrevStepClick = (): void => {
    setGithubStep(1);
    setSelectedUserOrg(undefined);
  };

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pr: '$3h' }}>
      <Card.Heading
        title="Select Repository"
        css={{ pr: '$3h' }}
        leftIcon={
          <IconButton
            aria-label="back"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            css={{ mr: '$2' }}
            onClick={handlePrevStepClick}
          />
        }
        rightIcon={
          <IconButton
            aria-label="info"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4', pr: '$3h', position: 'relative' }}>
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

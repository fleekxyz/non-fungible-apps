import { Card, ComboboxItem, Flex, Grid, Icon, Spinner } from '@/components';
import { Input } from '@/components/core/input';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';
import React, { forwardRef, useRef, useState } from 'react';
import { RepositoriesList } from './repositories-list';
import { UserOrgsCombobox } from './users-orgs-combobox';

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
} & React.ComponentProps<typeof Flex>;

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

export const RepoRow = forwardRef<HTMLDivElement, RepoRowProps>(
  ({ repo, button, ...props }, ref) => (
    <Flex
      {...props}
      ref={ref}
      css={{ justifyContent: 'space-between', my: '$4', ...props.css }}
    >
      <Flex css={{ alignItems: 'center' }}>
        <Icon name="github" css={{ fontSize: '$2xl', mr: '$2' }} />
        <span>{repo}</span>
      </Flex>
      {button}
    </Flex>
  )
);

export const GithubRepositoryConnection: React.FC = () => {
  const [isLoadingUserOrgs, setIsLoadingUserOrgs] = useState(true);
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
            <UserOrgsCombobox setLoading={setIsLoadingUserOrgs} />
            <Input
              leftIcon="search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </Flex>
          {isLoadingUserOrgs ? (
            <Loading />
          ) : (
            <RepositoriesList
              searchValue={searchValue}
              setLoading={setIsLoadingUserOrgs}
              isLoading={isLoadingUserOrgs}
            />
          )}
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};

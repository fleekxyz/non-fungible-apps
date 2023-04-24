import React, { useState } from 'react';

import {
  Card,
  Flex,
  Icon,
  IconButton,
  InputGroup,
  Spinner,
} from '@/components';
import { useDebounce } from '@/hooks/use-debounce';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

import { GithubRepositorySelectionStyles as S } from './github-repository-selection.styles';
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
    <S.Card.Wrapper>
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
      <S.Card.Body>
        <S.Container>
          <S.Row>
            <UserOrgsCombobox />
            <InputGroup css={{ flex: 1 }}>
              <S.Input.LeftAddon name="search" />
              <S.Input.Input
                placeholder="Search repo"
                onChange={handleSearchChange}
              />
            </InputGroup>
          </S.Row>
          {queryLoading === 'loading' ||
          queryUserAndOrganizations === 'loading' ? (
            <Loading />
          ) : (
            <RepositoriesList searchValue={searchValue} />
          )}
        </S.Container>
      </S.Card.Body>
    </S.Card.Wrapper>
  );
};

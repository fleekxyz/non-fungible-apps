import React, { useState } from 'react';

import { Flex, InputGroup, InputGroupText, Spinner } from '@/components';
import { useDebounce } from '@/hooks/use-debounce';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

import { GithubRepositorySelectionStyles as S } from './github-repository-selection.styles';
import { RepositoriesListFragment } from './repositories-list';
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
      <S.Card.Header
        title="Select Repository"
        onClickBack={handlePrevStepClick}
      />
      <S.Card.Body>
        <S.Container>
          <S.Row>
            <UserOrgsCombobox />
            <InputGroup>
              <S.Group.Icon name="search" />
              <InputGroupText
                css={{ overflow: 'hidden' }}
                placeholder="Search repo"
                onChange={handleSearchChange}
              />
            </InputGroup>
          </S.Row>
          {queryLoading === 'loading' ||
          queryUserAndOrganizations === 'loading' ? (
            <Loading />
          ) : (
            <RepositoriesListFragment searchValue={searchValue} />
          )}
        </S.Container>
      </S.Card.Body>
    </S.Card.Wrapper>
  );
};

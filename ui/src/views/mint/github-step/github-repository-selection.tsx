import { Button, Card, Flex, Grid, Icon, IconButton } from '@/components';
import { Input } from '@/components/core/input';
import { Separator } from '@/components/core/separator.styles';
import React, { useRef, useState } from 'react';

const repos = [
  'DyDx',
  'Testing',
  'Hello World',
  'Portofolio',
  'NFA',
  'NFT',
  'NFTs',
];

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
};

export const RepoRow = ({ repo, button }: RepoRowProps) => (
  <Flex css={{ justifyContent: 'space-between', my: '$4' }}>
    <Flex css={{ alignItems: 'center' }}>
      <Icon name="github" css={{ fontSize: '$2xl', mr: '$2' }} />
      <span>{repo}</span>
    </Flex>
    {button}
  </Flex>
);

type GithubRepositoryConnectionProps = {
  prevStep: () => void;
  setRepo: (repo: string) => void;
};

export const GithubRepositoryConnection: React.FC<
  GithubRepositoryConnectionProps
> = ({ prevStep, setRepo }) => {
  const [searchValue, setSearchValue] = useState('');

  const timeOutRef = useRef<NodeJS.Timeout>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 500);
  };

  return (
    <Card.Container css={{ maxWidth: '$107h', height: '$95h', pb: '$0h' }}>
      <Card.Heading
        title="Select Repository"
        leftIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            css={{ mr: '$2' }}
            onClick={prevStep}
          />
        }
        rightIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body css={{ height: '90%', overflow: 'hidden', pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4' }}>
            <Input />
            {/*TODO replace for dropdown once it's merged*/}
            <Input
              leftIcon="search"
              placeholder="Search"
              onChange={(e) => handleSearchChange(e)}
            />
          </Flex>
          <Flex
            css={{
              overflowY: 'scroll',
              flexDirection: 'column',
            }}
          >
            {repos
              .filter(
                (item) =>
                  item.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
              )
              .map((repo, index, { length }) => (
                <React.Fragment key={repo}>
                  <RepoRow
                    repo={repo}
                    button={
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        css={{ py: '$1', height: '$5', borderRadius: '$md' }}
                        onClick={() => setRepo(repo)}
                      >
                        Use for NFA
                      </Button>
                    }
                  />
                  {index < length - 1 && <Separator />}
                </React.Fragment>
              ))}
          </Flex>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};

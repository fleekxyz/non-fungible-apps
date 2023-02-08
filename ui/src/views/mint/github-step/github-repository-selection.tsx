import {
  Button,
  Card,
  Combobox,
  ComboboxItem,
  Flex,
  Grid,
  Icon,
  IconButton,
} from '@/components';
import { Input } from '@/components/core/input';
import { Separator } from '@/components/core/separator.styles';
import React, { useRef, useState } from 'react';
import { Mint } from '../mint.context';

//TODO remove once it's integrated with GH login
const repos = [
  'DyDx',
  'Testing',
  'Hello World',
  'Portofolio',
  'NFA',
  'NFT',
  'NFTs',
];

//TODO remove once it's integrated with GH login
const users: ComboboxItem[] = [
  { label: 'DyDx', value: 'DyDx', icon: 'github' },
  { label: 'Testing', value: 'Testing', icon: 'github' },
  { label: 'Hello World', value: 'Hello World', icon: 'github' },
  { label: 'Portofolio', value: 'Portofolio', icon: 'github' },
  { label: 'NFA', value: 'NFA', icon: 'github' },
  { label: 'NFT', value: 'NFT', icon: 'github' },
  { label: 'NFTs', value: 'NFTs', icon: 'github' },
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

export const GithubRepositoryConnection: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<ComboboxItem | undefined>();
  const { setGithubStep, setRepositoryName } = Mint.useContext();

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
  };

  const handleSelectRepo = (repo: string) => {
    setRepositoryName(repo);
    setGithubStep(3);
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
            onClick={handlePrevStepClick}
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
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4' }}>
            <Combobox
              items={users}
              selectedValue={selectedUser}
              onChange={setSelectedUser}
            />
            <Input
              leftIcon="search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </Flex>
          <Flex
            css={{
              height: '55%',
              overflowX: 'hidden',
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
                        onClick={() => handleSelectRepo(repo)}
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

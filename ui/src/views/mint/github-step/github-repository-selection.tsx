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
import React, { forwardRef, useRef, useState } from 'react';
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

const NoResults = () => (
  <div className="relative text-center cursor-default select-none pt-2 px-3.5 pb-4 text-slate11">
    Nothing found.
  </div>
);

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
} & React.ComponentProps<typeof Flex>;

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
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<ComboboxItem | undefined>();
  const { setGithubStep, setRepositoryName, setRepositoryConfig } =
    Mint.useContext();

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
    setRepositoryConfig('', '');
  };

  const filteredRepositories =
    searchValue === ''
      ? repos
      : repos.filter(
          (item) => item.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
        );

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pb: '$0h' }}>
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
              minHeight: '$40',
              maxHeight: '$60',
              overflowX: 'hidden',
              overflowY: 'scroll',
              flexDirection: 'column',
            }}
          >
            {filteredRepositories.length > 0 ? (
              filteredRepositories.map((repo, index, { length }) => (
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
              ))
            ) : (
              <NoResults />
            )}
          </Flex>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};

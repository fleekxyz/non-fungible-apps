import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Form,
  Grid,
  Stepper,
} from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useState } from 'react';
import { RepoRow } from '../github-repository-selection';

//TODO remove once it's integrated with GH login
const branches: DropdownItem[] = [
  {
    label: 'master',
    value: 'master',
  },
  {
    label: 'develop',
    value: 'develop',
  },
  {
    label: 'feature/branch',
    value: 'feature/branch',
  },
];

export const RepoConfigurationBody = () => {
  const { repositoryName, branchName, commitHash, setRepositoryConfig } =
    Mint.useContext();

  const { nextStep } = Stepper.useContext();
  const [branchSelected, setBranchSelected] = useState(branchName);
  const [commitHashSelected, setCommitHashSelected] = useState(commitHash);
  console.log(branchSelected);
  const handleBranchChange = (dorpdownOption: DropdownItem) => {
    //TODO we'll have to check the data that GH API returns
    console.log(dorpdownOption);
    setBranchSelected(dorpdownOption);
  };

  const handleCommitHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitHashSelected(e.target.value);
  };

  const handleContinueClick = () => {
    setRepositoryConfig(branchSelected, commitHashSelected);
    nextStep();
  };

  return (
    <Card.Body css={{ pt: '$2' }}>
      <Grid css={{ rowGap: '$6' }}>
        <RepoRow
          repo={repositoryName}
          css={{ mb: '0' }}
          button={
            <Button
              colorScheme="gray"
              disabled
              variant="outline"
              css={{ py: '$1', height: '$5', borderRadius: '$md' }}
            >
              Use for NFA
            </Button>
          }
        />
        <Form.Field>
          <Form.Label>Git Branch</Form.Label>
          <Dropdown
            items={branches}
            selectedValue={branchSelected}
            onChange={handleBranchChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Git Commit</Form.Label>
          <Form.Input
            placeholder="693f89763dbb7a6c9ce0711cc34591a4c8c77198"
            value={commitHashSelected}
            onChange={handleCommitHashChange}
          />
        </Form.Field>
        <Button
          disabled={!branchSelected || !commitHashSelected}
          colorScheme="blue"
          variant="solid"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </Grid>
    </Card.Body>
  );
};

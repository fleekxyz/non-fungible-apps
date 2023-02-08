import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  IconButton,
  Stepper,
} from '@/components';
import React, { useState } from 'react';
import { Mint } from '../mint.context';
import { RepoRow } from './github-repository-selection';

export const GithubRepoConfiguration: React.FC = () => {
  const {
    repositoryName,
    branchName,
    commitHash,
    setGithubStep,
    setRepositoryConfig,
  } = Mint.useContext();
  const { nextStep } = Stepper.useContext();
  const [branchSelected, setBranchSelected] = useState(branchName);
  const [commitHashSelected, setCommitHashSelected] = useState(commitHash);

  const handlePrevStepClick = () => {
    setGithubStep(2);
    setRepositoryConfig('', '');
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchSelected(e.target.value);
  };

  const handleCommitHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitHashSelected(e.target.value);
  };

  const handleContinueClick = () => {
    setRepositoryConfig(branchSelected, commitHashSelected);
    nextStep();
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Configure Repository"
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
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
          <RepoRow
            repo={repositoryName}
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
            <Form.Input
              placeholder="main"
              value={branchSelected}
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
    </Card.Container>
  );
};

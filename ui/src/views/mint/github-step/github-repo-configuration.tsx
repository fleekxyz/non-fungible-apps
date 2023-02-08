import { Button, Card, Form, Grid, Icon, IconButton } from '@/components';
import React from 'react';
import { RepoRow } from './github-repository-selection';

type GithubRepoConfigurationProps = {
  prevStep: () => void;
  nextStep: () => void;
  repoSelected: string;
};

export const GithubRepoConfiguration: React.FC<
  GithubRepoConfigurationProps
> = ({ nextStep, prevStep, repoSelected }) => {
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
      <Card.Body>
        <Grid css={{ rowGap: '$6' }}>
          <RepoRow
            repo={repoSelected}
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
            <Form.Input placeholder="main" />
          </Form.Field>
          <Form.Field>
            <Form.Label>Git Commit</Form.Label>
            <Form.Input placeholder="693f89763dbb7a6c9ce0711cc34591a4c8c77198" />
          </Form.Field>
          <Button colorScheme="blue" variant="solid" onClick={nextStep}>
            Continue
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};

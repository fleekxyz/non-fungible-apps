import {
  Button,
  Card,
  CardTag,
  Flex,
  Icon,
  RowData,
  Stepper,
} from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';

import { RepoBranchCommitFields } from './repo-branch-commit-fields';

export const RepoConfigurationBody: React.FC = () => {
  const {
    form: {
      isValid: [isValid],
    },
  } = useMintFormContext();

  const { repositoryName } = Mint.useContext();

  const { nextStep } = Stepper.useContext();

  const handleContinueClick = (): void => {
    nextStep();
  };

  return (
    <Card.Body css={{ pt: '$4' }}>
      <Flex css={{ rowGap: '$6', flexDirection: 'column' }}>
        <RowData
          leftIcon={<Icon name="github" css={{ fontSize: '$2xl' }} />}
          label={repositoryName?.name || ''}
          css={{ cursor: 'default' }}
          rightComponent={<CardTag>Use for NFA</CardTag>}
        />
        <RepoBranchCommitFields />
        <Button
          disabled={!isValid}
          colorScheme="blue"
          variant="solid"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </Flex>
    </Card.Body>
  );
};

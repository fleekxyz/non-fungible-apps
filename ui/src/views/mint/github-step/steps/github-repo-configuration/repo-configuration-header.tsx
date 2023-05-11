import { CustomCardHeader } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';

export const RepoConfigurationHeader: React.FC = () => {
  const { setGithubStep } = Mint.useContext();
  const {
    form: {
      gitBranch: {
        value: [, setBranchName],
      },
      gitCommit: {
        value: [, setCommitHash],
      },
    },
  } = useMintFormContext();

  const handlePrevStepClick = (): void => {
    setGithubStep(2);
    setBranchName('');
    setCommitHash('');
  };

  return (
    <CustomCardHeader.Default
      title="Configure Repository"
      onClickBack={handlePrevStepClick}
    />
  );
};

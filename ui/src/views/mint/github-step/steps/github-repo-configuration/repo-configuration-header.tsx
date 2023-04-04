import { Mint } from '@/views/mint/mint.context';
import { MintCardHeader } from '@/views/mint/mint-card';
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
    <MintCardHeader
      title="Configure Repository"
      onClickBack={handlePrevStepClick}
    />
  );
};

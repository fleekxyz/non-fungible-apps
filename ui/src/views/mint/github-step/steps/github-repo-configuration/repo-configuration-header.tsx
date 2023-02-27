import { DropdownItem } from '@/components';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';

export const RepoConfigurationHeader = () => {
  const { setGithubStep, setBranchName, setCommitHash } = Mint.useContext();

  const handlePrevStepClick = () => {
    setGithubStep(2);
    setBranchName({} as DropdownItem);
    setCommitHash('');
  };

  return (
    <MintCardHeader
      title="Configure Repository"
      onClickBack={handlePrevStepClick}
    />
  );
};

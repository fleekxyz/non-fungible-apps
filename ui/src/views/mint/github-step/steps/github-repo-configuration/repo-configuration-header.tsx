import { DropdownItem } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { MintCardHeader } from '@/views/mint/mint-card';

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

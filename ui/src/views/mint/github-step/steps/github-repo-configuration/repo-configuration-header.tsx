import { DropdownItem } from '@/components';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';

export const RepoConfigurationHeader = () => {
  const { setGithubStep, setRepositoryConfig } = Mint.useContext();

  const handlePrevStepClick = () => {
    setGithubStep(2);
    setRepositoryConfig({} as DropdownItem, '');
  };

  return (
    <MintCardHeader
      title="Configure Repository"
      onClickBack={handlePrevStepClick}
    />
  );
};

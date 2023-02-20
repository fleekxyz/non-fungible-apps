import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Form,
  Spinner,
  Stepper,
} from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { RepoRow } from '../github-repository-selection';
import { useGithub } from '../use-github';

export const RepoConfigurationBody = () => {
  const {
    repositoryName,
    selectedUserOrg,
    branchName,
    commitHash,
    setRepositoryConfig,
  } = Mint.useContext();
  const { fetchBranches } = useGithub({
    onError: () => {
      //TODO show toast
      alert('Error fetching branches');
    },
  });

  const { nextStep } = Stepper.useContext();
  const [branches, setBranches] = useState<DropdownItem[]>([]);
  const [branchSelected, setBranchSelected] = useState(branchName);
  const [commitHashSelected, setCommitHashSelected] = useState(commitHash);

  const { data: dataBrances, status } = useQuery(
    `fetchBranches${selectedUserOrg.label}${repositoryName.name}`,
    async () => fetchBranches(selectedUserOrg.label, repositoryName.name)
  );

  useEffect(() => {
    dataBrances &&
      setBranches(
        dataBrances.map(
          (branch: any) =>
            ({ label: branch.name, value: branch.commit } as DropdownItem)
        )
      );
  }, [dataBrances]);

  const handleBranchChange = (dorpdownOption: DropdownItem) => {
    //TODO we'll have to check the data that GH API returns
    setCommitHashSelected(dorpdownOption.value);
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
      <Flex css={{ rowGap: '$6', flexDirection: 'column' }}>
        <RepoRow
          repo={repositoryName.name}
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
        {status === 'loading' ? (
          <Flex
            css={{
              height: '9.75rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner />
          </Flex>
        ) : (
          <>
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
                placeholder="Select branch to get last commit"
                value={commitHashSelected}
                onChange={handleCommitHashChange}
              />
            </Form.Field>
          </>
        )}
        <Button
          disabled={!branchSelected || !commitHashSelected}
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

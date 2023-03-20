import { Form } from '@/components';
import { useFormFieldContext } from '@/components/form/form-field.context';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useEffect } from 'react';

export const BranchField = () => {
  const { queryLoading, branches } = useGithubStore();
  const { repositoryName } = Mint.useContext();
  const {
    value: [, setValue],
  } = useFormFieldContext();

  useEffect(() => {
    if (queryLoading === 'success' && branches.length > 0) {
      const defaultBranch = branches.find(
        (branch) =>
          branch.label.toLowerCase() ===
          repositoryName.defaultBranch.toLowerCase()
      );
      if (defaultBranch) {
        setValue(defaultBranch.value);
        // setBranchName(defaultBranch);
        // setCommitHash(defaultBranch.value);
      }
    }
  }, [queryLoading, branches]);

  return (
    <>
      <Form.Label>Git Branch</Form.Label>
      <Form.Combobox leftIcon="branch" items={branches} />
    </>
  );
};

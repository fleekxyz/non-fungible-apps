import { Form } from '@/components';
import { useFormFieldContext } from '@/components/form/form-field.context';
import { useGithubStore } from '@/store';
import { AppLog } from '@/utils';
import { Mint } from '@/views/mint/mint.context';
import { useEffect } from 'react';

export const BranchField = () => {
  const { queryLoading, branches } = useGithubStore();
  const { repositoryName } = Mint.useContext();
  const {
    value: [value, setValue],
  } = useFormFieldContext();

  useEffect(() => {
    try {
      if (
        queryLoading === 'success' &&
        branches.length > 0 && //&&
        // repositoryName.defaultBranch !== undefined
        value === '' //we only set the default branch the first time
      ) {
        const defaultBranch = branches.find(
          (branch) => branch.label.toLowerCase() === 'main'.toLowerCase()
          // repositoryName.defaultBranch.toLowerCase()
        );
        if (defaultBranch) {
          setValue(defaultBranch.value);
        }
      }
    } catch (error) {
      AppLog.errorToast('We had a problem. Try again');
    }
  }, [queryLoading, branches]);

  return (
    <>
      <Form.Label>Git Branch</Form.Label>
      <Form.Combobox leftIcon="branch" items={branches} />
    </>
  );
};

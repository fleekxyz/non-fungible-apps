import { Form } from '@/components';
import { useFormFieldContext } from '@/components/form/form-field.context';
import { useMintFormContext } from '@/views/mint/nfa-step/form-step';
import { useEffect } from 'react';

export const CommitHashField = () => {
  const {
    value: [, setValue],
  } = useFormFieldContext();

  const {
    form: {
      gitBranch: {
        value: [gitBranch],
      },
    },
  } = useMintFormContext();

  //TODO find way to not set default commit when is coming back from a step
  // const validateBranchCommit = () => {
  //   //if it enter here means the combobox change
  //   //how do I know that it's not cause it's coming from another step
  //   debugger;
  //   if (value === '') {
  //     //set last commit branch
  //   } else if (gitCommit !== gitBranch) {
  //     //compare if the selected branch I want the last commit or not
  //     //get branch label from branch list
  //     const branchName = branches.find((branch) => branch.value === gitCommit);
  //     //if null means it's a different hash the user wants to use
  //     if (branchName) {
  //       //once we find the branch with all the info, compare the labels
  //       setValue(gitBranch);
  //     } else {
  //       setValue(gitCommit);
  //     }
  //   }
  // };

  useEffect(() => {
    if (gitBranch) {
      setValue(gitBranch);
    }
  }, [gitBranch]);

  return (
    <>
      <Form.Label>Git Commit</Form.Label>
      <Form.Input placeholder="Select branch to get last commit" />
      <Form.Overline />
    </>
  );
};

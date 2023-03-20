import { Form } from '@/components';

export const CommitHashField = () => {
  return (
    <>
      <Form.Label>Git Commit</Form.Label>
      <Form.Input placeholder="Select branch to get last commit" />
      <Form.Overline />
    </>
  );
};

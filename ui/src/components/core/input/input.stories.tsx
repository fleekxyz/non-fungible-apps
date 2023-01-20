import { Input } from './';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Variants = () => {
  return (
    <>
      <Input label="Label" size="sm" placeholder="Small" />
      <Input label="Label" size="md" placeholder="Medium" required />
      <Input
        label="Label"
        size="md"
        placeholder="Medium Invaild"
        aria-invalid
        errorMessage="This is an error message"
      />
      <Input label="Label" size="lg" placeholder="Large" />
      <Input label="Label" size="sm" placeholder="Small" disabled />
      <Input label="Label" size="md" placeholder="Medium" disabled />
      <Input label="Label" size="lg" placeholder="Large" disabled />
      <Input label="Logo" size="md" type="file" />
    </>
  );
};

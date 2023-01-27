import { Input } from './';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Variants = () => {
  return (
    <>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" required />
      <Input size="md" placeholder="Medium Invaild" aria-invalid />
      <Input size="lg" placeholder="Large" />
      <Input size="sm" placeholder="Small" disabled />
      <Input size="md" placeholder="Medium" disabled />
      <Input size="lg" placeholder="Large" disabled />
    </>
  );
};

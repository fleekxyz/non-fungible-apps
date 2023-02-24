import { Form } from '@/components';
import { Mint } from '@/views/mint/mint.context';

export const EnsField = () => {
  const { ens, ensError, setEns } = Mint.useContext();

  const handleEnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEns(event.target.value);
  };

  return (
    <Form.Field css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Form.Input
        value={ens}
        onChange={handleEnsChange}
        aria-invalid={!!ensError}
      />
      {ensError && <Form.Error>{ensError}</Form.Error>}
    </Form.Field>
  );
};

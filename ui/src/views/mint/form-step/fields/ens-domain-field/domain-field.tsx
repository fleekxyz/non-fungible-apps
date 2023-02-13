import { Form } from '@/components';
import { Mint } from '@/views/mint/mint.context';

export const DomainField = () => {
  const { domain, setDomain } = Mint.useContext();

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };
  return (
    <Form.Field css={{ flex: 1 }}>
      <Form.Label>Domain</Form.Label>
      <Form.Input
        placeholder="mydomain.com"
        value={domain}
        onChange={handleDomainChange}
      />
    </Form.Field>
  );
};

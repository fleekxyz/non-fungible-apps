import { Dropdown, DropdownItem, Form } from '@/components';
import { Mint } from '@/views/mint/mint.context';

// TODO remove after integration with wallet
const ensList: DropdownItem[] = [
  {
    value: 'fleek.eth',
    label: 'fleek.eth',
  },
  {
    value: 'ens.eth',
    label: 'ens.eth',
  },
  {
    value: 'cami.eth',
    label: 'cami.eth',
  },
];

export const EnsField = () => {
  const { ens, setEns } = Mint.useContext();

  const handleEnsChange = (item: DropdownItem) => {
    setEns(item);
  };

  return (
    <Form.Field css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Dropdown
        items={ensList}
        selectedValue={ens}
        onChange={handleEnsChange}
      />
    </Form.Field>
  );
};

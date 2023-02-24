import { Combobox, Dropdown, DropdownItem, Form } from '@/components';
import { useAppDispatch } from '@/store';
import { ensActions, useEnsStore } from '@/store/features/ens/ens-slice';
import { Mint } from '@/views/mint/mint.context';
import { useAccount } from 'wagmi';

export const EnsField = () => {
  const { ens, setEns } = Mint.useContext();
  const { state, ensNames } = useEnsStore();
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  if (state === 'idle' && address) {
    dispatch(ensActions.fetchEnsNamesThunk(address));
  }

  const handleEnsChange = (item: DropdownItem) => {
    setEns(item);
  };

  return (
    <Form.Field css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Combobox
        items={ensNames.map((ens) => ({
          label: ens,
          value: ens,
        }))}
        selectedValue={ens}
        onChange={handleEnsChange}
      />
    </Form.Field>
  );
};

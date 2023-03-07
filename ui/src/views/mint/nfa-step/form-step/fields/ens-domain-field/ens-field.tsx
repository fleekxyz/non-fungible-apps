import { Combobox, ComboboxItem, Form } from '@/components';
import { ensActions, useAppDispatch, useEnsStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useAccount } from 'wagmi';

export const EnsField = () => {
  const { ens, ensError, setEns } = Mint.useContext();
  const { state, ensNames } = useEnsStore();
  const dispatch = useAppDispatch();
  const { address } = useAccount();

  if (state === 'idle' && address) {
    dispatch(ensActions.fetchEnsNamesThunk(address));
  }

  const handleEnsChange = (item: ComboboxItem) => {
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
        withAutocomplete
      />
      {ensError && <Form.Error>{ensError}</Form.Error>}
    </Form.Field>
  );
};

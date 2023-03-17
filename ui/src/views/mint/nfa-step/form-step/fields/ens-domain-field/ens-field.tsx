import { Form } from '@/components';
import { ensActions, useAppDispatch, useEnsStore } from '@/store';

import { useAccount } from 'wagmi';
import { useMintFormContext } from '../../mint-form.context';

export const EnsField = () => {
  const { state, ensNames } = useEnsStore();
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const {
    form: { ens },
  } = useMintFormContext();

  if (state === 'idle' && address) {
    dispatch(ensActions.fetchEnsNamesThunk(address));
  }

  return (
    <Form.Field context={ens} css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Form.Combobox
        items={ensNames.map((ens) => ({
          label: ens,
          value: ens,
        }))}
        withAutocomplete
      />
      <Form.Overline />
    </Form.Field>
  );
};

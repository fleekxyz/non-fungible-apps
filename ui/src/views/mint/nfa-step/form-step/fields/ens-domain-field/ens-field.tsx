import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

import { getENSNamesDocument } from '@/../.graphclient';
import { ComboboxItem, Form } from '@/components';
import { ComboboxItemm } from '@/components/core/combobox/combobox.utils';
import { AppLog } from '@/utils';

import { useMintFormContext } from '../../mint-form.context';

export const EnsField: React.FC = () => {
  const { address } = useAccount();
  const { data, error } = useQuery(getENSNamesDocument, {
    variables: {
      address: address?.toLowerCase() || '', //should skip if undefined
    },
    skip: address === undefined,
  });

  const {
    form: { ens },
  } = useMintFormContext();

  const showError = useCallback(() => {
    AppLog.errorToast(
      'There was an error trying to get your ENS names. Please try again later.'
    );
  }, []);

  useEffect(() => {
    if (error) {
      showError();
    }
  }, [error, showError]);

  const ensNames = useMemo(() => {
    const ensList: ComboboxItem[] = [];
    if (data && data.account && data.account.domains) {
      data.account.domains.forEach((ens) => {
        const { name } = ens;
        if (name) {
          ensList.push({
            label: name,
            value: name,
          });
        }
      });
    }
    return ensList;
  }, [data]);

  return (
    <Form.Field context={ens} css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Form.Combobox
        items={ensNames}
        queryFilter={ComboboxItemm.queryFilter}
        handleValue={ComboboxItemm.handleValue}
      >
        {({ Field, Options }) => (
          <>
            <Field>{(selected) => selected?.label || 'Select an ENS'}</Field>

            <Options>{(item) => item.label}</Options>
          </>
        )}
      </Form.Combobox>
      <Form.Overline />
    </Form.Field>
  );
};

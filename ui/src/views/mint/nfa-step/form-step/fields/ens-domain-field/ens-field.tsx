import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

import { getENSNamesDocument } from '@/../.graphclient';
import { Form } from '@/components';
import { AppLog } from '@/utils';

import { useMintFormContext } from '../../mint-form.context';

export const EnsField: React.FC = () => {
  const { address } = useAccount();
  const { data, error, loading } = useQuery(getENSNamesDocument, {
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
    if (!(data && data.account && data.account.domains)) return [];
    return data.account.domains.map((ens) => ens.name as string);
  }, [data]);

  return (
    <Form.Field context={ens} css={{ flex: 1 }}>
      <Form.Label>ENS</Form.Label>
      <Form.Combobox
        unattached
        isLoading={loading}
        items={ensNames}
        queryFilter={(query, item = '') => item.includes(query)}
        handleValue={(item = '') => item}
      >
        {({ Field, Options, Message }) => (
          <>
            <Field>{(selected) => selected || 'Select an ENS'}</Field>

            <Options>
              {(item) => item}
              <Message>You do not own ENS names</Message>
            </Options>
          </>
        )}
      </Form.Combobox>
      <Form.Overline />
    </Form.Field>
  );
};

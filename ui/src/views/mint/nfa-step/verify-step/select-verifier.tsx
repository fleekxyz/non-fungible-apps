import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';

import { getVerifiersDocument } from '@/../.graphclient';
import { Form, ResolvedAddress } from '@/components';
import { useENSStore } from '@/store';

import { useMintFormContext } from '../form-step';

// TODO: remove mocked items after graphql api is fixed
const mockedItems = [
  '0xdBb04e00D5ec8C9e3aeF811D315Ee7C147c5DBFD',
  '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
];

export const SelectVerifier: React.FC = () => {
  const {
    form: { verifier },
  } = useMintFormContext();

  const {
    value: [selectedVerifier, setSelectedVerifier],
  } = verifier;

  const { addressMap } = useENSStore();

  const { data } = useQuery(getVerifiersDocument);

  const items = useMemo(() => {
    if (!data) return [];

    const verifiers = data.verifiers
      .map<string>((verifier) => verifier.id.toString())
      .concat(mockedItems);

    return verifiers.map((verifier) => ({
      address: verifier,
      ens: addressMap[verifier]?.value,
    }));
  }, [data, addressMap]);

  useEffect(() => {
    if (!selectedVerifier && items.length > 0) {
      setSelectedVerifier(items[0].address);
    }
  }, [selectedVerifier, setSelectedVerifier, items]);

  return (
    <Form.Field context={verifier}>
      <Form.Combobox
        items={items}
        handleValue={(item) => item.address}
        queryKey={['address', 'ens']}
      >
        {({ Field, Options }) => (
          <>
            <Field>
              {(selected) =>
                selected ? (
                  <ResolvedAddress>{selected.address}</ResolvedAddress>
                ) : (
                  'Select a Verifier'
                )
              }
            </Field>
            <Options>
              {(item) => <ResolvedAddress>{item.address}</ResolvedAddress>}
            </Options>
          </>
        )}
      </Form.Combobox>
    </Form.Field>
  );
};

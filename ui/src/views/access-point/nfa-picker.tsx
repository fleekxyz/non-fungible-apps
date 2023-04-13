import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { Combobox } from '@/components';
import { getLatestNFAsDocument } from '@/graphclient';
import { AppLog } from '@/utils';

import { CreateAccessPoint } from './create-ap.context';

export const NfaPicker: React.FC = () => {
  const { nfa, setNfa } = CreateAccessPoint.useContext();
  const { data, loading, error } = useQuery(getLatestNFAsDocument);

  const items = useMemo(() => data?.tokens || [], [data]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    AppLog.errorToast('Error loading NFA list');
  }

  return (
    <Combobox items={items} selected={[nfa, setNfa]} queryKey={['name', 'id']}>
      {({ Field, Options }) => (
        <>
          <Field>{(selected) => selected?.name || 'Select NFA'}</Field>

          <Options>{(item) => item.name}</Options>
        </>
      )}
    </Combobox>
  );
};

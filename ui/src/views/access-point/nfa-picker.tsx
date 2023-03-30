import { Combobox, ComboboxItem } from '@/components';
import { getLatestNFAsDocument } from '@/graphclient';
import { AppLog } from '@/utils';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { CreateAccessPoint } from './create-ap.context';

export const NfaPicker = () => {
  const { nfa, setNfa } = CreateAccessPoint.useContext();
  const { data, loading, error } = useQuery(getLatestNFAsDocument);

  const handleNfaChange = (item: ComboboxItem) => {
    setNfa(item);
  };

  const items = useMemo(() => {
    return data
      ? data.tokens.map(
          (nfa) => ({ value: nfa.id, label: nfa.name } as ComboboxItem)
        )
      : [];
  }, [data]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    AppLog.errorToast('Error loading NFA list');
  }

  return (
    <Combobox items={items} selectedValue={nfa} onChange={handleNfaChange} />
  );
};

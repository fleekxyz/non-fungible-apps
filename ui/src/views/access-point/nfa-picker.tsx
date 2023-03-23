import { Combobox, ComboboxItem } from '@/components';
import { NFAsDocument } from '@/graphclient';
import { AppLog } from '@/utils';
import { useQuery } from '@apollo/client';
import { AP } from './create-ap.context';

export const NfaPicker = () => {
  const { token, setToken } = AP.useContext();
  const { data, loading, error } = useQuery(NFAsDocument);

  if (loading) return <div>Loading...</div>;
  if (error) {
    AppLog.errorToast('Error loading NFA list');
  }

  const handleNfaChange = (item: ComboboxItem) => {
    setToken(item);
  };
  return (
    <Combobox
      items={
        data
          ? data.tokens.map(
              (token) =>
                ({ value: token.id, label: token.name } as ComboboxItem)
            )
          : []
      }
      selectedValue={token}
      onChange={handleNfaChange}
    />
  );
};

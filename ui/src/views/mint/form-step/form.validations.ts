import { Ethereum } from '@/integrations';

export const validateEnsField = async (
  ensName: string,
  setError: (message: string) => void
) => {
  const isValid = await Ethereum.validateEnsName(ensName);
  if (!isValid) setError('Invalid ENS name');
  else setError('');
  return isValid;
};

import { Ethereum } from '@/integrations';

//TODO remove if we're not gonna validate ens on the client side
export const validateEnsField = async (
  ensName: string,
  setError: (message: string) => void
): Promise<boolean> => {
  const isValid = await Ethereum.validateEnsName(ensName);
  if (!isValid) setError('Invalid ENS name');
  else setError('');
  return isValid;
};

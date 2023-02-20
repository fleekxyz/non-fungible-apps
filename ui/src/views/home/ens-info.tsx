import { useEnsName } from 'wagmi';

type EnsInfoProps = {
  address: `0x${string}`;
};

export const EnsInfo = ({ address }: EnsInfoProps) => {
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <div>Name: {data}</div>;
};

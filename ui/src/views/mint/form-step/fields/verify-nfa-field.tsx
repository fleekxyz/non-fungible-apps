import { Card, Flex, Grid } from '@/components';
import { Mint } from '@/views/mint/mint.context';

export const VerifyNFAField = () => {
  const { verifyNFA, setVerifyNFA } = Mint.useContext();

  const handleVerifyNFAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyNFA(e.target.checked);
  };

  return (
    <Card.Text css={{ p: '$4', textAlign: 'left' }}>
      {/* TODO replace for grid */}
      <Flex css={{ gap: '$10' }}>
        <Grid css={{ rowGap: '$1h' }}>
          <span>Verify NFA</span>
          <span>
            Add Fleek as a controller to be verified, learn more here.
          </span>
        </Grid>
        <input
          type="checkbox"
          checked={verifyNFA}
          onChange={handleVerifyNFAChange}
        />
      </Flex>
    </Card.Text>
  );
};

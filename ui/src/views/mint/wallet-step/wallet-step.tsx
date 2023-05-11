import {
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
} from '@/components';

import { ConnectWalletButton } from './connect-wallet-button';

export const WalletStep: React.FC = () => {
  return (
    <CustomCardContainer>
      <CustomCardHeader.Default title="Connect Wallet" />
      <Card.Body>
        <Flex css={{ gap: '$6', flexDirection: 'column' }}>
          <ConnectWalletButton />
          <Card.Text
            css={{
              height: '$46h',
              maxWidth: '$95',
              fontSize: '$md',
              px: '$12',
            }}
          >
            <span>Connect with the wallet you want to mint & own the NFA.</span>
          </Card.Text>
        </Flex>
      </Card.Body>
    </CustomCardContainer>
  );
};

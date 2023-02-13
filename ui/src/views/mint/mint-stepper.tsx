import { Stepper } from '@/components';
import { FormStep } from './form-step';
import { MintPreview } from './preview-step/mint-preview';
import { GithubStep } from './github-step';
import { MintStep } from './mint-step';
import { WalletStep } from './wallet-step';
import { Mint } from './mint.context';
import { NftMinted } from './nft-minted';

export const MintStepper = () => {
  const { sucessMint } = Mint.useContext();

  if (!sucessMint) {
    return (
      <Stepper.Root initialStep={1}>
        <Stepper.Container>
          <Stepper.Step>
            <MintStep header="Connect GitHub and select repository">
              <GithubStep />
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Connect your Ethereum Wallet to mint an NFA">
              <WalletStep />
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Finalize a few key things for your NFA">
              <FormStep />
            </MintStep>
          </Stepper.Step>

          <Stepper.Step>
            <MintStep header="Review your NFA and mint it on Polygon">
              <MintPreview />
            </MintStep>
          </Stepper.Step>
        </Stepper.Container>
      </Stepper.Root>
    );
  }

  return <NftMinted />;
};

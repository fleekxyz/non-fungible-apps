import { useEffect, useState } from 'react';
import { Web3AuthCore } from '@web3auth/core';
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import RPC from './ethersRPC';
import { Button, Flex } from '@/components';

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID || ''; // use your app client id you got from web3auth

export const Web3AuthLogin = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            displayName: 'Polygon Mumbai Testnet',
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x13881',
            rpcTarget: 'https://rpc-mumbai.maticvigil.com', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            whiteLabel: {
              name: 'Fleek NFAs',
              logoLight:
                'https://lh3.googleusercontent.com/a-/ACNPEu94rLyADmAJ80HamM8yp4ddV3AzoaMz3whdBH0D=s80-p',
              logoDark:
                'https://lh3.googleusercontent.com/a-/ACNPEu94rLyADmAJ80HamM8yp4ddV3AzoaMz3whdBH0D=s80-p',
              defaultLanguage: 'en',
              dark: true, // whether to enable dark mode. defaultValue: false
            },
            loginConfig: {
              // Add login configs corresponding to the provider
              // Auth0 login works with jwt login config
              jwt: {
                verifier: import.meta.env.VITE_AUTH0_VERIFIER || '', // use your app verifier you got from auth0
                typeOfLogin: 'jwt',
                clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '', // use your app client id you got from auth0
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.init();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        mfaLevel: 'none', // Pass on the mfa level of your choice: default, optional, mandatory, none
        // Auth0 login works with JWT loginProvider
        loginProvider: 'github', //'jwt'
        // extraLoginOptions: {
        //   domain: import.meta.env.VITE_AUTH0_DOMAIN || '', // Please append "https://" before your domain
        //   verifierIdField: 'sub', // For SMS & Email Passwordless, use "name" as verifierIdField
        // },
      }
    );
    setProvider(web3authProvider);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <Flex>
        <div>
          <Button onClick={getUserInfo}>Get User Info</Button>
        </div>
        <div>
          <Button onClick={authenticateUser}>Get ID Token</Button>
        </div>
        <div>
          <Button onClick={getChainId}>Get Chain ID</Button>
        </div>
        <div>
          <Button onClick={getAccounts}>Get Accounts</Button>
        </div>
        <div>
          <Button onClick={getBalance}>Get Balance</Button>
        </div>
        <div>
          <Button onClick={signMessage}>Sign Message</Button>
        </div>
        <div>
          <Button onClick={sendTransaction}>Send Transaction</Button>
        </div>
        <div>
          <Button onClick={getPrivateKey}>Get Private Key</Button>
        </div>
        <div>
          <Button onClick={logout}>Log Out</Button>
        </div>
      </Flex>

      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
      </div>
    </>
  );

  const unloggedInView = <Button onClick={login}>Login</Button>;

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </a>
        & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
};

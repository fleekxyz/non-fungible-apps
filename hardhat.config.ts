import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomicfoundation/hardhat-chai-matchers';
import 'hardhat-deploy';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config();

const {
  API_URL = 'https://polygon-mainnet.alchemyapi.io/v2/your-api-key',
  PRIVATE_KEY,
  REPORT_GAS,
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: API_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 80001,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS === 'true' || false,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ['NftMarketplace'],
  },
  namedAccounts: {
    localDeployer: {
      default: 0,
    },
    privateKey: {
      default: PRIVATE_KEY ? `privatekey://${PRIVATE_KEY}` : null,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: {
              yul: false,
            },
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;

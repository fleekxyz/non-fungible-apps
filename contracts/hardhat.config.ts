import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomicfoundation/hardhat-chai-matchers';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';
import { task, types } from 'hardhat/config';
import deploy from './scripts/deploy';

dotenv.config();

const {
  POLYGON_API_URL = 'https://polygon-mainnet.alchemyapi.io/v2/your-api-key',
  ETH_MAIN_API_URL = 'https://ethereum-mainnet.alchemyapi.io/v2/your-api-key', // TODO:test
  ETH_SEPOLIA_API_URL = 'https://ethereum-sepolia.alchemyapi.io/v2/your-api-key', // TODO:test
  PRIVATE_KEY,
  REPORT_GAS,
  POLYGONSCAN_KEY,
  ETHERSCAN_KEY,
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: POLYGON_API_URL, // why were we using mainnet for mumbai?
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    sepolia: {
      url: ETH_SEPOLIA_API_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    mainnet: {
      url: ETH_MAIN_API_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1,
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
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true,
        },
      },
      viaIR: true,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
      ethereumMainnet: ETHERSCAN_KEY,
    },
  },
};

export default config;

// npx hardhat deploy --network sepolia --new-proxy-instance --name "FleekNFAs" --symbol "FLKNFA" --billing "[10000, 20000]"
task('deploy', 'Deploy the contracts')
  .addFlag('newProxyInstance', 'Force to deploy a new proxy instance')
  .addOptionalParam('name', 'The collection name', 'FleekNFAs', types.string)
  .addOptionalParam('symbol', 'The collection symbol', 'FLKNFA', types.string)
  .addOptionalParam(
    'billing',
    'The billing values in an array of numbers like "[10000, 20000]"',
    [],
    types.json
  )
  .setAction(deploy);

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
import deployFleekERC721 from './scripts/deploy/deploy-fleek-erc721';
import deployFleekApps from './scripts/deploy/deploy-fleek-apps';

dotenv.config();

const {
  PRIVATE_KEY,
  REPORT_GAS,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_KEY,
  POLYGON_API_URL,
  ETH_MAIN_API_URL,
  ETH_SEPOLIA_API_URL,
  ETH_GOERLI_API_URL,
  MAINNET_API_KEY,
  COINMARKETCAP_KEY,
  QANET_RPC_URL,
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'local',
  networks: {
    hardhat: {
      chainId: 31337,
      forking: MAINNET_API_KEY
        ? {
            url: MAINNET_API_KEY,
            blockNumber: undefined,
          }
        : undefined,
    },
    mumbai: {
      url: POLYGON_API_URL ? POLYGON_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    goerli: {
      url: ETH_GOERLI_API_URL ? ETH_GOERLI_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
    sepolia: {
      url: ETH_SEPOLIA_API_URL ? ETH_SEPOLIA_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    mainnet: {
      url: ETH_MAIN_API_URL ? ETH_MAIN_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1,
    },
    qanet: {
      url: QANET_RPC_URL ? QANET_RPC_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 31337,
    },
    local: {
      url: 'http://localhost:8545',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: REPORT_GAS === 'true' || false,
    currency: 'USD',
    outputFile: 'gas-report',
    noColors: true,
    coinmarketcap: COINMARKETCAP_KEY,
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
      polygonMumbai: POLYGONSCAN_KEY ? POLYGONSCAN_KEY : '',
      mainnet: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
      goerli: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
      sepolia: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
    },
  },
};

export default config;

// Use the following command to deploy where the network flag can be replaced with the network you choose:
// npx hardhat deploy --network goerli --new-proxy-instance --name "FleekNFAs" --symbol "FLKNFA" --billing "[10000, 20000]"
task('deploy:FleekERC721', 'Deploy the FleekERC721 contract')
  .addFlag('newProxyInstance', 'Force to deploy a new proxy instance')
  .addOptionalParam('name', 'The collection name', 'Fleek NFAs', types.string)
  .addOptionalParam('symbol', 'The collection symbol', 'FLKNFA', types.string)
  .addOptionalParam(
    'billing',
    'The billing values in an array of numbers like "[10000, 20000]"',
    [],
    types.json
  )
  .setAction(deployFleekERC721);

task('deploy:FleekApps', 'Deploy the FleekApps contract')
  .addFlag('newProxyInstance', 'Force to deploy a new proxy instance')
  .addOptionalParam('name', 'The collection name', 'NFA - Apps', types.string)
  .addOptionalParam('symbol', 'The collection symbol', 'NFAA', types.string)
  .setAction(deployFleekApps);

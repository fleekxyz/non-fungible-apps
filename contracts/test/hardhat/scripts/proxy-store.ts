/* eslint-disable @typescript-eslint/no-var-requires */
import { expect } from 'chai';
import {
  proxyStore,
  getProxyFilePath,
} from '../../../scripts/utils/proxy-store';
import fs from 'fs/promises';

describe('Proxy Store', () => {
  const network = 'test';
  const contractName = 'FleekERC721';
  const proxyAddress = '0x91A425C1CA320A99a09BE1bee114Fce5d30153d9';

  afterEach(async () => {
    await fs.rm(getProxyFilePath(network));
  });

  it('should store the data', async () => {
    await proxyStore(contractName, proxyAddress, network);
    const file = require(getProxyFilePath(network));
    expect(file[contractName]).to.eql([
      { address: proxyAddress, timestamp: new Date().toLocaleString('en-US') },
    ]);
  });

  it('should update the data', async () => {
    const newProxyAddress = '0xB8594DC01580884AD69FE5d78EDEA5e66BeB5fFA';
    await proxyStore(contractName, proxyAddress, network);
    await proxyStore(contractName, newProxyAddress, network);
    const file = require(getProxyFilePath(network));

    expect(file[contractName]).to.eql([
      {
        address: newProxyAddress,
        timestamp: new Date().toLocaleString('en-US'),
      },
      { address: proxyAddress, timestamp: new Date().toLocaleString('en-US') },
    ]);
  });
});

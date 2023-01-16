const { existsSync, promises: fs } = require('fs');
const path = require('path');

const PROXY_FILE_NAME = 'proxy';

const getProxyFilePath = (network) => {
  return path.resolve(
    __dirname,
    `../deployments/${network}/${PROXY_FILE_NAME}.json`
  );
};

module.exports.proxyStore = async (contract, proxyAddress, network) => {
  const filePath = getProxyFilePath(network);

  const file = existsSync(filePath) ? require(filePath) : {};
  const newRecord = {
    address: proxyAddress,
    timestamp: new Date().toLocaleString('en-US'),
  };
  if (file[contract]) {
    file[contract].unshift(newRecord);
  } else {
    file[contract] = [newRecord];
  }

  console.log('Writing proxy file', filePath.split('/').slice(0, -1).join('/'));
  if (!existsSync(filePath.split('/').slice(0, -1).join('/'))) {
    try {
      await fs.mkdir(filePath.split('/').slice(0, -1).join('/'), {
        recursive: true,
      });
    } catch (err) {
      throw `Could not create network folder: ${err}`;
    }
  }

  try {
    await fs.writeFile(filePath, JSON.stringify(file, null, 2));
  } catch (err) {
    throw `Could not write file: ${err}`;
  }
};

module.exports.getProxyFilePath = getProxyFilePath;

module.exports.getProxyAddress = (contract, network) => {
  const filePath = getProxyFilePath(network);

  return new Promise((resolve) => {
    try {
      const proxyList = require(filePath)[contract];
      const lastItem = proxyList[0];
      resolve(lastItem.address);
    } catch (err) {
      resolve();
    }
  });
};

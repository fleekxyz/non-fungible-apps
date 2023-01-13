const fs = require('fs');
const path = require('path');

const PROXY_FILE_NAME = 'proxy';

const getProxyFilePath = (network) => {
  return path.join(
    __dirname,
    `../deployments/${network}/${PROXY_FILE_NAME}.json`
  );
};

module.exports.proxyStore = (contract, proxyAddress, network) => {
  const filePath = getProxyFilePath(network);

  const file = fs.existsSync(filePath) ? require(filePath) : {};
  file[contract] = proxyAddress;

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath.split('/').slice(0, -2).join('/'))) {
      fs.mkdir(
        filePath.split('/').slice(0, -1).join('/'),
        { recursive: true },
        (err) => {
          if (err) reject(`Could not create network folder: ${err}`);
        }
      );
    }

    fs.writeFile(filePath, JSON.stringify(file, null, 2), (err) => {
      if (err) reject(`Could not write file: ${err}`);
      resolve();
    });
  });
};

module.exports.getProxyFilePath = getProxyFilePath;

const { existsSync, promises: fs } = require('fs');

const createFolder = async (filePath) => {
  const folderPath = filePath.split('/').slice(0, -1).join('/');

  if (!existsSync(folderPath)) {
    try {
      await fs.mkdir(folderPath, {
        recursive: true,
      });
    } catch (err) {
      throw `Could not create network folder: ${err}`;
    }
  }
};

module.exports.writeFile = async (filePath, data) => {
  await createFolder(filePath);
  return fs.writeFile(filePath, data);
};

const fs = require("fs/promises");

exports.selectAvailableEndpoints = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`).then((data) => {
    const parsedData = JSON.parse(data);
    return parsedData;
  });
};

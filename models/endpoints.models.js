const fs = require("fs/promises");

exports.getApiInfo = () => {
  return fs.readFile("./endpoints.json", "utf8").then((contents) => {
    return JSON.parse(contents);
  });
};

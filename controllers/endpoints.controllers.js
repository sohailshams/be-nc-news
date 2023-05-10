const { getApiInfo } = require("../models/endpoints.models");

exports.fetchApiInfo = (request, response) => {
  return getApiInfo().then((apiInfo) => {
    response.status(200).send({ apiInfo: apiInfo });
  });
};

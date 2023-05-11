const { getTopics } = require("../models/topics.models");

exports.fetchTopics = (request, response, next) => {
  getTopics()
    .then((topics) => {
      response.status(200).send({ topics: topics });
    })
    .catch((err) => next(err));
};

const { getTopics } = require('../models/topics.models');

exports.fetchTopics = (request, response, next) => {
   
    return getTopics().then((topics) => {
      response.status(200).send({topics: topics})
    })
    .catch((err) => next(err));
};
const { getArticleWithId } = require("../models/articles.models");

exports.fetchArticleWithId = (request, response, next) => {
  const articleId = request.params.article_id;
  getArticleWithId(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch(next);
};

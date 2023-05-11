const { getArticleWithId, getArticles } = require("../models/articles.models");

exports.fetchArticleWithId = (request, response, next) => {
  const articleId = request.params.article_id;
  getArticleWithId(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch(next);
};

exports.fetchArticles = (request, response, next) => {
  getArticles()
    .then((articles) => {
      response.status(200).send({ articles: articles });
    })
    .catch((err) => next(err));
};
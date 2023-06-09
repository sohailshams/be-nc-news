const {
  getArticleWithId,
  getArticles,
  getCommentsWidArticleId,
  addComment,
  incrementArticleVote,
  removeComment,
} = require("../models/articles.models");

exports.fetchArticleWithId = (request, response, next) => {
  const articleId = request.params.article_id;
  getArticleWithId(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch(next);
};

exports.fetchArticles = (request, response, next) => {
  const sortBy = request.query.sort_by;
  const orderBy = request.query.order;
  const topic = request.query.topic;
  getArticles(sortBy, orderBy, topic)
    .then((articles) => {
      response.status(200).send({ articles: articles });
    })
    .catch(next);
};

exports.fetchCommentsWidArticleId = (request, response, next) => {
  const articleId = request.params.article_id;
  getCommentsWidArticleId(articleId)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.postComment = (request, response, next) => {
  const articleId = request.params.article_id;
  const newComment = request.body;
  addComment(articleId, newComment)
    .then((comment) => {
      response.status(201).send({ comment: comment });
    })
    .catch(next);
};

exports.updateArticle = (request, response, next) => {
  const articleId = request.params.article_id;
  const upateVoteBy = request.body;
  incrementArticleVote(articleId, upateVoteBy)
    .then((updatedArticle) => {
      response.status(200).send({ updatedArticle: updatedArticle });
    })
    .catch(next);
};

exports.deleteComment = (request, response, next) => {
  const commentId = request.params.comment_id;
  removeComment(commentId)
    .then((deletedComment) => {
      response.status(204).send({ deletedComment: deletedComment });
    })
    .catch(next);
};

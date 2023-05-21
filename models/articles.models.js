const { response } = require("../app.js");
const db = require("../db/connection.js");

exports.getArticleWithId = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [articleId])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Article ID does not exist!",
        });
      }
      return article;
    });
};

exports.getArticles = () => {
  return db
    .query(
      `SELECT 
       articles.article_id, articles.title, articles.votes, articles.topic, articles.author, articles.created_at, articles.article_img_url, 
       COUNT(comments.article_id) ::INT AS "comment_count" 
        FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      const articles = rows;
      return articles;
    });
};

exports.getCommentsWidArticleId = (articleId) => {
  return db
    .query(
      "SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at DESC;",
      [articleId]
    )
    .then(({ rows }) => {
      const comments = rows;
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comment found related to this ${articleId}`,
        });
      }
      return comments;
    });
};

exports.addComment = (articleID, newComment) => {
  const { username, body } = newComment;
  const commentProps = ["username", "body"];

  const isProps = commentProps.reduce((username, body) => {
    return username && body in newComment;
  }, true);

  if (!isProps) {
    return Promise.reject({
      status: 400,
      msg: "Please pass correct comment object!",
    });
  }

  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3)
  RETURNING *`,
      [username, body, articleID]
    )
    .then(({ rows }) => {
      const comment = rows[0];
      return comment;
    });
};

exports.incrementArticleVote = (articleID, updateVoteBy) => {
  const { inc_vote } = updateVoteBy;
  const isProp = updateVoteBy.hasOwnProperty("inc_vote");

  if (!isProp) {
    return Promise.reject({
      status: 400,
      msg: "Please pass correct object to update votes property!",
    });
  }

  if (typeof inc_vote !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Please pass votes as a number!",
    });
  }

  return db
    .query(
      `UPDATE articles SET votes = votes + ${inc_vote} WHERE articles.article_id = ${articleID} RETURNING *`
    )
    .then(({ rows }) => {
      const updatedArticle = rows[0];
      if (!updatedArticle) {
        return Promise.reject({
          status: 404,
          msg: "Article ID does not exist!",
        });
      }
      return updatedArticle;
    });
};

exports.removeComment = (commentID) => {
  return db
    .query(`DELETE FROM comments WHERE comments.comment_id = ${commentID};`)
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID does not exist!",
        });
      }
      const comment = response.rows;
      return comment;
    });
};

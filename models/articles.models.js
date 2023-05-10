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

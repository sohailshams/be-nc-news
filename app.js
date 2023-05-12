const express = require("express");
const app = express();
const { fetchTopics } = require("./controllers/topics.controllers");
const { fetchApiInfo } = require("./controllers/endpoints.controllers");
const {
  fetchArticleWithId,
  fetchArticles,
  fetchCommentsWidArticleId,
} = require("./controllers/articles.controllers");

app.get("/api", fetchApiInfo);
app.get("/api/topics", fetchTopics);
app.get("/api/articles", fetchArticles);

app.get("/api/articles/:article_id", fetchArticleWithId);
app.get("/api/articles/:article_id/comments", fetchCommentsWidArticleId);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Endpoint not found!" });
});

app.use((err, request, response, next) => {
  // handle custom errors
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  // handle specific psql errors
  else if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    // if the error hasn't been identified,
    // respond with an internal server error
    console.log(err);
    response.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;

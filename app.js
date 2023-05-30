const express = require("express");
const app = express();
app.use(express.json());
const { fetchTopics } = require("./controllers/topics.controllers");
const { fetchApiInfo } = require("./controllers/endpoints.controllers");
const {
  fetchArticleWithId,
  fetchArticles,
  fetchCommentsWidArticleId,
  postComment,
  updateArticle,
  deleteComment,
} = require("./controllers/articles.controllers");
const { fetchUsers } = require("./controllers/users.controllers");
const cors = require("cors");
app.use(cors());

app.get("/api", fetchApiInfo);
app.get("/api/users", fetchUsers);
app.get("/api/topics", fetchTopics);
app.get("/api/articles", fetchArticles);

app.get("/api/articles/:article_id", fetchArticleWithId);
app.get("/api/articles/:article_id/comments", fetchCommentsWidArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", updateArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Endpoint not found!" });
});

app.use((err, request, response, next) => {
  // handle custom errors
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  // handle specific psql errors
  else if (err.code === "22P02" || err.code === "42703") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    // if the error hasn't been identified,
    // respond with an internal server error
    console.log(err);
    response.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;

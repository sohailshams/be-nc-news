const express = require("express");
const app = express();
const { fetchTopics } = require("./controllers/topics.controllers");
const { fetchApiInfo } = require("./controllers/endpoints.controllers");

app.get("/api", fetchApiInfo);
app.get("/api/topics", fetchTopics);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Endpoint not found!" });
});

module.exports = app;

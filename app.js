const express = require("express");

const { getTopics } = require("./controllers/topic-controller");
const { getAvailableEndpoints } = require("./controllers/document-controller");
const { getArticles } = require("./controllers/article-controller");
const { getArticle } = require("./controllers/article-controller");
const { getAllComments } = require("./controllers/comment-controller");
const { patchArticle } = require("./controllers/article-controller");
const {
  handlePsqErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAvailableEndpoints);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/articles/:article_id/comments", getAllComments);

app.patch("/api/articles/:article_id", patchArticle);

app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;

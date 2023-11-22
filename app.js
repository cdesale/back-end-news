const express = require("express");

const { getTopics } = require("./controllers/topic-controller");
const { getAvailableEndpoints } = require("./controllers/document-controller");
const { getArticles, getArticle } = require("./controllers/article-controller");
const {
  getAllComments,
  postComments,
  deleteComment,
} = require("./controllers/comment-controller");
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

app.post("/api/articles/:article_id/comments", postComments);

app.get("/api/articles/:article_id/comments", getAllComments);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;

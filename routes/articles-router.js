const express = require("express");

const {
  getArticles,
  getArticle,
  patchArticle,
} = require("../controllers/article-controller");
const {
  getAllComments,
  postComments,
} = require("../controllers/comment-controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);

articlesRouter.get("/:article_id", getArticle);

articlesRouter.post("/:article_id/comments", postComments);

articlesRouter.get("/:article_id/comments", getAllComments);

articlesRouter.post("/:article_id/comments", postComments);

articlesRouter.patch("/:article_id", patchArticle);

module.exports = { articlesRouter };

const { selectArticleById } = require("../models/article-model");
const { selectArticles } = require("../models/article-model");
const { updateArticleById } = require("../models/article-model");
exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((articleData) => {
      res.status(200).send({ article: articleData });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((data) => {
      res.status(200).send({ articles: data });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (isNaN(article_id) || isNaN(inc_votes)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  updateArticleById(article_id, inc_votes)
    .then((data) => {
      res.status(201).send({ article: data });
    })
    .catch(next);
};

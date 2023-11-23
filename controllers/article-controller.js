const {
  selectArticleById,
  selectArticles,
  updateArticleById,
  checkArticleExists,
} = require("../models/article-model");

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

  Promise.all([
    checkArticleExists(article_id),
    updateArticleById(article_id, inc_votes),
  ])
    .then((resolvedPromises) => {
      res.status(200).send({ article: resolvedPromises[1] });
    })
    .catch(next);
};

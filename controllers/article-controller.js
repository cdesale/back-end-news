const { selectArticleById } = require("../models/article-model");
const { selectArticles } = require("../models/article-model");

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

const { selectArticles } = require("../models/article-model");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((data) => {
      res.status(200).send({ articles: data });
    })
    .catch(next);
};

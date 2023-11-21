const {
  inserCommentsForArticleByArticleId,
} = require("../models/comment-model");

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
    const { username, body } = req.body;
    
    
  inserCommentsForArticleByArticleId(article_id, username, body)
    .then((data) => {
      res.status(201).send({ comment: data });
    })
    .catch(next);
};

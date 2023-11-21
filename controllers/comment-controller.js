const { selectCommentsByArticleId } = require("../models/comment-model");

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};

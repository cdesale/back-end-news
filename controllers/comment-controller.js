const {
  selectCommentsByArticleId,
  insertCommentsForArticleByArticleId,
  deleteCommentById,
} = require("../models/comment-model");

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertCommentsForArticleByArticleId(article_id, username, body)
    .then((data) => {
      res.status(201).send({ comment: data });
    })
    .catch(next);
};

exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentById(comment_id)
    .then(() => {
      res.status(204).send("no content")
    })
    .catch(next);
};

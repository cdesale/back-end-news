const {
<<<<<<< HEAD
  selectCommentsByArticleId,
  inserCommentsForArticleByArticleId,
} = require("../models/comment-model");

=======
  insertCommentsForArticleByArticleId,
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

>>>>>>> 4c590a7 (Addressed typo error in comment-model)
exports.getAllComments = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  inserCommentsForArticleByArticleId(article_id, username, body)
    .then((data) => {
      res.status(201).send({ comment: data });
    })
    .catch(next);
};

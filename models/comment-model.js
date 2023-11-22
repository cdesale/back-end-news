const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
FROM comments
WHERE article_id = $1
ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    });
};
<<<<<<< HEAD

exports.inserCommentsForArticleByArticleId = (article_id, username, body) => {
=======
exports.insertCommentsForArticleByArticleId = (article_id, username, body) => {
>>>>>>> 4c590a7 (Addressed typo error in comment-model)
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Missing input data" });
  }

  const articleExistsQuery =
    "SELECT EXISTS(SELECT 1 FROM articles WHERE article_id = $1)";
  return db
    .query(articleExistsQuery, [article_id])
    .then(({ rows }) => {
      const { exists } = rows[0];
      if (!exists) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      return db.query(
        `INSERT INTO comments (article_id, author, body, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING comment_id, article_id, author, body, created_at, votes;`,
        [article_id, username, body]
      );
    })
    .then(({ rows }) => rows);
};

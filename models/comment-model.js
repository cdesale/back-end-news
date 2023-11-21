const db = require("../db/connection");

exports.inserCommentsForArticleByArticleId = (article_id, username, body) => {
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

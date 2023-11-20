const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  let query = `SELECT * FROM articles WHERE article_id = $1`;
  const queryValues = [article_id];
  return db.query(query, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
    return rows[0];
  });
};

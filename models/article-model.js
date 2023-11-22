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

exports.selectArticles = () => {
  return db
    .query(
      `SELECT 
    articles.article_id,
    articles.author,
    articles.title,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id)::int AS comment_count
FROM 
    articles
LEFT JOIN 
    comments ON articles.article_id = comments.article_id
GROUP BY 
    articles.article_id
ORDER BY 
    articles.created_at DESC`
    )
    .then(({ rows }) => rows);
};

exports.updateArticleById = (article_id, inc_votes) => {
  const articleExistsQuery =
    "SELECT EXISTS(SELECT 1 FROM articles WHERE article_id = $1);";
  const articleUpdateQuery = `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *
    `;
  return db
    .query(articleExistsQuery, [article_id])
    .then(({ rows }) => {
      if (!rows[0].exists) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      return db.query(articleUpdateQuery, [inc_votes, article_id]);
    })
    .then(({ rows }) => rows[0]);
};

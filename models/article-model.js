const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  let query = `
  SELECT *, 
  (SELECT COUNT(1) FROM comments WHERE article_id = $1)::int AS comment_count
  FROM articles
  WHERE article_id = $1`;
  const queryValues = [article_id];

  return db.query(query, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return rows[0];
  });
};

exports.selectArticles = (topic) => {
  let query = `SELECT
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
    `;
  const queryValues = [];

  const promises = [];

  if (topic) {
    const topicExistsQuery = `SELECT EXISTS(SELECT 1 FROM topics WHERE slug = $1);`;
    const topicExistsPromise = db.query(topicExistsQuery, [topic]);
    promises.push(topicExistsPromise);
    queryValues.push(topic);
    query += ` WHERE topic = $1`;
  }

  query += ` GROUP BY articles.article_id 
  ORDER BY articles.created_at DESC`;

  const articlePromise = db.query(query, queryValues);

  promises.push(articlePromise);
  return Promise.all(promises).then((resolvedPromises) => {
    if (topic) {
      if (!resolvedPromises[0].rows[0].exists) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return resolvedPromises[1].rows;
      }
    } else {
      return resolvedPromises[0].rows;
    }
  });
};
exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  const articleUpdateQuery = `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *
    `;
  return db
    .query(articleUpdateQuery, [inc_votes, article_id])
    .then(({ rows }) => rows[0]);
};

const express = require("express");

const { getTopics } = require("./controllers/topic-controller");
const { getAvailableEndpoints } = require("./controllers/document-controller");
const { getArticles } = require("./controllers/article-controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAvailableEndpoints);

app.get("/api/articles", getArticles);

module.exports = app;

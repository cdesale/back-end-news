const express = require("express");
const cors = require("cors");

const { documentRouter } = require("./routes/document-router");
const { articlesRouter } = require("./routes/articles-router");
const { commentsRouter } = require("./routes/comments-router");
const { topicsRouter } = require("./routes/topics-router");
const { usersRouter } = require("./routes/users-router");
const {
  handlePsqErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", documentRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);

app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;

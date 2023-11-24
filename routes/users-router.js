const express = require("express");

const { getUsers } = require("../controllers/user-controller");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

module.exports = { usersRouter };

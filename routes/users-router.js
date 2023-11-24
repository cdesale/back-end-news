const express = require("express");

const { getUsers, getUser } = require("../controllers/user-controller");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:username", getUser);

module.exports = { usersRouter };

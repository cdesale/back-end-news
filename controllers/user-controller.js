const { selectUsers, selectUserByUsername } = require("../models/user-model");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch(next);
};

const { selectUsers } = require("../models/user-model");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};

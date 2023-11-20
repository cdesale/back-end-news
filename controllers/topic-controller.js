const { selectTopics } = require("../models/topic-model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((data) => {
      res.status(200).send({ topics: data });
    })
    .catch(next);
};

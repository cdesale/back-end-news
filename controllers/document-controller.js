const { selectAvailableEndpoints } = require("../models/document-model");

exports.getAvailableEndpoints = (req, res, next) => {
  selectAvailableEndpoints().then((data) => {
    res.status(200).send({ endpoints: data });
  });
};

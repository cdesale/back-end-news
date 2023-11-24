const express = require("express");

const { getAvailableEndpoints } = require("../controllers/document-controller");

const documentRouter = express.Router();

documentRouter.get("/", getAvailableEndpoints);

module.exports = { documentRouter };

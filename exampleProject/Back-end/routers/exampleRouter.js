const express = require("express");
const exampleRouter = express.Router();
const exampleController = require("../controllers/exampleController");

exampleRouter.get("/example", exampleController.example);

module.exports = exampleRouter;

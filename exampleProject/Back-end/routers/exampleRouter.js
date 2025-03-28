const express = require("express");
const exampleRouter = express.Router();
const exampleController = require("../controllers/exampleController");

exampleRouter.post("/convert", exampleController.example);

module.exports = exampleRouter;

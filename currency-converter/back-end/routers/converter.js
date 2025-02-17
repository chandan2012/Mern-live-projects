const express = require("express");
const converterRouter = express.Router();
const controller = require("../controllers/coverterController")

converterRouter.post("/convert", controller.convert);

module.exports = converterRouter;

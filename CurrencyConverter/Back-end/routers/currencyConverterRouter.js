const express = require("express");
const currencyConverterRouter = express.Router();
const currencyConverterController = require("../controllers/currencyConverterController");

 currencyConverterRouter.post("/convert", currencyConverterController.convertCurrency);

module.exports = currencyConverterRouter;

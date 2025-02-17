const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = require("./routers/converter");
const currencyConverter = require("./service/currencyService");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

PORT = 3000;

async function init() {
  try {
    await currencyConverter.initializeRates();
    app.use("/api", router);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing exchange rates:", error);
    process.exit(1);
  }
}
init();

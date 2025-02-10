const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/errorController");
const currencyConverterRouter = require("./routers/currencyConverterRouter");
const currencyConverter = require("./services/currencyConverter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Initialize exchange rates before starting the server

async function startServer() {
  try {
    await currencyConverter.initializeRates();

    app.use("/api", currencyConverterRouter);
    app.use(errorController.get404);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing exchange rates:", error);
    process.exit(1);
  }
}
startServer();
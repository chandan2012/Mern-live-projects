const ENV = process.env.NODE_ENV || 'production'
require('dotenv').config({
  path: `.env.${ENV}`
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const errorController = require("./controllers/errorController");
const exampleController = require("./controllers/exampleController");

const app = express();
const MONGODB_URI =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@airbnb.no48h.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", exampleController.example);
app.use(errorController.get404);

const PORT = process.env.PORT  || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
  });

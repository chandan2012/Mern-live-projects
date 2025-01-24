const ENV = process.env.NODE_ENV || 'production'
require('dotenv').config({
  path: `.env.${ENV}`
});
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorController = require("./controllers/errorController");
const itemRouter = require('./routers/itemRouter');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@airbnb.no48h.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(itemRouter);
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

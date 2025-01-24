const express = require("express");
const itemRouter = express.Router();
const itemsController = require("../controllers/itemsController");

itemRouter.post("/todos", itemsController.postTodoItem);

module.exports = itemRouter;

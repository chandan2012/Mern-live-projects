const express = require("express");
const itemRouter = express.Router();
const itemsController = require("../controllers/itemsController");

itemRouter.post("/todos", itemsController.postTodoItem);
itemRouter.get("/todos", itemsController.getTodoItem);
itemRouter.delete("/todos/:id", itemsController.deleteTodoItem);
itemRouter.patch("/todos/:id", itemsController.isCompleted);

module.exports = itemRouter;

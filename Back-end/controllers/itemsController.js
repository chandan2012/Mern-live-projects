const TodoItem = require("../models/todoItem");

exports.postTodoItem = async (req, res, next) => {
    try{
       const todoItem = new TodoItem(req.body);
       const item = await todoItem.save();
       res.status(201).json(item);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }    
};
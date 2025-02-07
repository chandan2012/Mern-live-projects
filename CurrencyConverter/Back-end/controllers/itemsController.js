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

exports.getTodoItem = async (req, res, next) => {
    try{
        const todoItems = await TodoItem.find();
        res.status(200).json(todoItems);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.deleteTodoItem = async (req, res, next) => {
    try{
        const todoItem = await TodoItem.findByIdAndDelete(req.params.id);
        res.status(200).json(todoItem);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.isCompleted = async (req, res, next) => {
    try{
        const id = req.params.id;
        updatedItem = await TodoItem.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedItem);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}
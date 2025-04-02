const Blog = require("../model/blog");

exports.getBlogs =  async (req, res, next) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json({status: "success", blogs});
    }
    catch(err){
        res.status(500).json({status: "error", message: err.message});
    }
}

exports.createBlog = async (req, res, next) => {
    const {title, content, author} = req.body;    
    try{        
        const blog = new Blog({title, content, author});
        await blog.save();
        res.status(201).json({status: "successss", blog});
    }
    catch(err){
        res.status(500).json({status: "error", message: err.message});
    }
}

exports.deleteBlog = async (req, res, next) => {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({status: "deleted successfully", blog});
    }
    catch(err){
        res.status(500).json({status: "error", message: err.message});
    }
}

exports.likeBlog = async (req, res, next) => {
    const id = req.params.id;
    try{
        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(404).json({status: "blog not found"});
        }
        blog.likes += 1;
        await blog.save();  
        res.status(200).json({status: "deleted successfully", blog});
    }
    catch(err){
        res.status(500).json({status: "error", message: err.message});
    }
}
exports.commentBlog = async (req, res, next) => {
    const id = req.params.id;
    const {username, content} = req.body;
    if(!id || !username || !content){        
        return res.status(400).json({status: "error", message: "username and comment are required"});
    }
    try{        
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({status: "blog not found"});
        }
        blog.comment.push({username, content});
        await blog.save();
        res.status(201).json({status: "successss", blog});
    }
    catch(err){
        res.status(500).json({status: "error", message: err.message});
    }
}
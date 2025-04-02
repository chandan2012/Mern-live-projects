const express = require("express");
const blogRouter = express.Router();
const blogsController = require("../controllers/blogController");

blogRouter.get("/blogs", blogsController.getBlogs);
blogRouter.post("/blogs", blogsController.createBlog);
blogRouter.delete("/blogs/:id", blogsController.deleteBlog);
blogRouter.put("/blogs/:id/like", blogsController.likeBlog);
blogRouter.put("/blogs/:id/comment", blogsController.commentBlog);

module.exports = blogRouter;
    
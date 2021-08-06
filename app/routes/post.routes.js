const postController = require("../controllers/post.controller.js");
const router = require("express").Router();
const postValidator = require('../middleware/validators/post.validator')

module.exports = app => {

    // Create a new Post
    router.post("/createPost",postValidator,postController.create);

    // Retrieve all Posts
    router.get("/getAllPost", postController.findAll);

    // Retrieve a single Post with id
    router.get("/getPostById/:id", postController.findOne);

    // Update a Post with id
    router.put("/updatePost/:id",postValidator, postController.update);

    // Delete a Post with id
    router.delete("/deletePost/:id", postController.delete);

    app.use("/api/post", router);
};

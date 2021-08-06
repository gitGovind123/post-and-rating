const db = require("../models");
const PostModel = db.posts;

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Post
    const newPost = new PostModel({
        title: req.body.title,
        description: req.body.description,
    });

    // Save Post in the database
    newPost
        .save(newPost)
        .then(data => {
            res.status(200).send({status:'success',message:'Post saved successfully',data:null});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {

    PostModel.find()
        .then(data => {
            res.status(200).send({status:'success',message:'Post list',data:data});
        })
        .catch(err => {
            res.status(500).send({status: 'failed',
                message:
                    err.message || "Some error occurred while retrieving posts.",
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PostModel.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({status:'failed', message: "Not found post with id " + id });
            else res.send({status:'success', message: "Post by ID",data:data });
        })
        .catch(err => {
            res
                .status(500)
                .send({status:'failed', message: "Error retrieving post with id=" + id });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    PostModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({status: 'failed',
                    message: `Cannot update post with id=${id}. Maybe post was not found!`
                });
            } else res.status(200).send({status:'success', message: "Post was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({status: 'failed',
                message: "Error updating post with id=" + id
            });
        });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PostModel.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({status: 'failed',
                    message: `Cannot delete post with id=${id}. Maybe post was not found!`
                });
            } else {
                res.send({status: 'success',
                    message: "Post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({status: 'failed',
                message: "Could not delete post with id=" + id
            });
        });
};

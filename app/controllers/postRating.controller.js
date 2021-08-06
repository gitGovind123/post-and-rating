const db = require("../models");
const PostRating = db.postRating;

// Rate a post
exports.ratePost = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const newRating = new PostRating({
        post_id: req.body.postId,
        rating: req.body.rating,
    });

    newRating
        .save(newRating)
        .then(data => {
            res.status(200).send({status:'success',message:'Your rating saved successfully',data:null});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Find the average rating of single post
exports.findAverageRating = (req, res) => {
    const id = req.params.id;

    PostRating.aggregate([
        {  $match: {
            'post_id': id
            }},
        {$group:
                {
                    _id: "$post_id",
                    averageRating: { $avg: "$rating" },
                }
        }
    ])
        .then(data => {
            if (data && data.length == 0)
                res.status(404).send({status:'failed', message: "No Rating are given to post" });
            else res.send({status:'success', message: "Average Rating",data:data });
        })
        .catch(err => {
            res
                .status(500)
                .send({status:'failed', message: "Error retrieving post rating with id=" + id });
        });
};

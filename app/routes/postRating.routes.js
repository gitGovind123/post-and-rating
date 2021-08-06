const postRatingController = require("../controllers/postRating.controller.js");
const router = require("express").Router();
const postRatingValidator = require('../middleware/validators/postRating.validator')

module.exports = app => {

    // Rate a post
    router.post("/ratePost", postRatingValidator, postRatingController.ratePost);

    // get average rating of post
    router.get("/getAverageRatingOfPost/:id", postRatingController.findAverageRating);

    app.use("/api/postRating", router);
};

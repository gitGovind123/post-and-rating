const Joi = require("joi");
const validation =  Joi.object({
    postId: Joi.string()
        .required(),
    rating: Joi.number()
        .min(0)
        .max(5)
        .required(),
})

const postRating = async (req, res, next) => {
    const payload = {
        postId: req.body.postId,
        rating: req.body.rating
    };

    const { error } = validation.validate(payload);
    if (error) {
        res.status(400);
        return res.json(
            {status:'failed',message: error.message}
        );
    } else {
        next();
    }
};

module.exports = postRating;

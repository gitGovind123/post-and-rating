const Joi = require("joi");
const validation =  Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
    })

const postValidator = async (req, res, next) => {
    const payload = {
        title: req.body.title,
        description: req.body.description
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

module.exports = postValidator;

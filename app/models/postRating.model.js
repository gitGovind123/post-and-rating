module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            post_id: String,
            rating: Number
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const PostRating = mongoose.model("post_rating", schema);
    return PostRating;
};

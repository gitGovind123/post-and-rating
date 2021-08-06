module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: String,
            description: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const PostModel = mongoose.model("posts", schema);
    return PostModel;
};

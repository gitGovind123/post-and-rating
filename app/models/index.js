const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.posts = require("./post.model.js")(mongoose)
db.postRating = require("./postRating.model.js")(mongoose)

module.exports = db;

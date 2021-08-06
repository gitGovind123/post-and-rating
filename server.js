const express = require("express");
const cors = require("cors");
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// testing route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Post Demo application." });
});

require("./app/routes/post.routes")(app);
require("./app/routes/postRating.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

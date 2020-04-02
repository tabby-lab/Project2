// Requiring necessary npm packages
require('dotenv').config();
var express = require("express");
const cookieParser = require("cookie-parser");
var expressHandlebars = require("express-handlebars")

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(passport.initialize());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon succes
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

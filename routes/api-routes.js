// Requiring our models and passport as we've configured it
require("dotenv").config();
var db = require("../models");
const rp = require("request-promise");
var passport = require("../config/passport");
var signToken = require("../config/signToken");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local", { session: false }), function (req, res) {
    var token = signToken(req.user);
    console.log("Tabby's token", token);
    res.cookie("jwt", token);
    res.json({
      token: token
    });
  });

  app.get("/mytrip/results", (req, res) => {

  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.clearCookie("jwt");
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
 
  // app.post("/api/itinerary", function (req, res) {
  //   db.Inventory.create(req.body).then(function(data){
  //     res.json(data)
  //   })
  // });
};


// This is middleware for restricting routes a user is not allowed to visit if not logged in
const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      console.log("UNAUTHORIZED", error, user);
      return res.redirect("/");
    }

    req.user = user;
    next();
  })(req, res, next);
};

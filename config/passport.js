var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email,
        },
      })
        .then(function (dbUser) {
          // If there's no user with the given email
          if (!dbUser) {
            return done(null, false, {
              message: "Incorrect email.",
            });
          }
          // If there is a user with the given email, but the password the user gives us is incorrect
          else if (!dbUser.validPassword(password)) {
            return done(null, false, {
              message: "Incorrect password.",
            });
          }
          // If none of the above, return the user
          return done(null, dbUser);
        })
        .catch(function (error) {
          return done(null, false, {
            message: error,
          });
        });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  db.User.findOne({
    where: {
      id: user.id,
    },
  })
    .then(function (user) {
      cb(null, user);
    })
    .catch(function (error) {
      cb(error, false);
    });
});


// Calvin's note we will use JWT Passport to extract the tokens as they come in from user requests
// In my demo I was saying you can read the request header Authorization property to see JWT. But I recall you were trying to use the it in the body. The line below does that and this is what passport has also provided in their documentation. http://www.passportjs.org/packages/passport-jwt/

// "fromBodyField(field_name)"" creates a new extractor that looks for the JWT in the given body field. You must have a body parser configured in order to use this method.
const opts = {}

// opts.jwtFromRequest = ExtractJwt.fromBodyField("jwt_token");

// ^^^ on second thought I had this but ran into some problems of navigating user through the site.
// placing it only in the body means the user has to make a request and send in body, but what if they
// just click on a tag link? They are not sending the JWT in the body which means we need another form of
// reading the JWT. From my demo the other day I mentioned cookies is a good solution so I wrote my own
// custom method to do this. Which its using the cookies and also reading the body of the request as 2nd option
opts.jwtFromRequest = function(req) {
  console.log(req.body);
  if (req && req.body && req.body.jwt_token) { 
      return req.body.jwt_token;
  } else if (req && req.cookies) {
      return req.cookies.jwt;
  }
  return null;
};
opts.secretOrKey = process.env.jwt_secret;
opts.issuer = "project_2_app";
passport.use(new JWTStrategy(opts, (payload, done) => {
    // Find the user specified in token
    db.User.findOne({
      where: {
        email: payload.aud, // aud stands for "audience" and is the property we are using to store email from the token
      },
    })
    .then(function (dbUser) {
      // If user doesn't exist, INVALIDATE
      if(!dbUser) {
        return done(null, false);
      }

      // Otherwise, return the user
      done(null, dbUser);

    }).catch(function(error) {
      done(error, false, error.message);
    });
}));

// Exporting our configured passport
module.exports = passport;

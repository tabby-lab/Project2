var db = require("../models");
var passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
    jwtFromRequest: ExtractJwt.fromBodyField("secret"),
    secretOrKey: 'secret'
}
//This is called dotnotation. We can also use something called bracket notation to make an object within JS 
// opts["jwtFromRequest"] = ExtractJwt.fromAuthHeaderAsBearerToken();
// var possible_keys = ["name", "age","city"]
// if(object[possible_keys["name"]])
//Set the paramneters Of the opts object.

passport.use("login", new JwtStrategy(opts, function(jwt_payload, done) {
    db.User.findOne({where: {id: jwt_payload.sub}}).then(user =>{
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        } 
    }) 
}));

passport.use("signup", new JwtStrategy(opts, function(jwt_payload, done) {
    db.User.create(jwt_payload).then(user =>{
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        } 
    }) 
}));

module.exports = {passport}
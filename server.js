const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const db  = require("./models")
const UserModel = require('./models/user');
const PORT = process.env.PORT || 3000;
require('./config/passport_jwt.js');

app.use(bodyParser.urlencoded({
    extended: false
}));

const routes = require('./routes/routes.js');
const secureRoute = require('./routes/api-routes.js');

app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', {
    session: false
}), secureRoute);

//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: err
    });
});


// Syncing our database and logging a message to the user upon succes
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

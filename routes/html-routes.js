const moment = require("moment");

// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const rp = require("request-promise")

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/index", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/members", function (req, res){
    if(req.user){
      res.render("home");
    }
    res.render("home");
  });


  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    //res.render("home")
    if(req.user){
      res.render("home");
    }
  })

  app.get("/home", isAuthenticated, function (req, res) {
    res.render("home")
  })

  app.get("/itinerary", function(req,res){
    console.log(req.query)
  
    const arrival =  moment(new Date(req.query.arrival)).format("YYYY-MM-DD").toString();
    const departure = moment(new Date(req.query.departure)).format("YYYY-MM-DD").toString();
    console.log(arrival)
    console.log(departure)

    var options = {
      'method': 'GET',
      'url': `https://www.triposo.com/api/20190906/day_planner.json?location_id=${req.query.city}&start_date=${arrival}&end_date=${departure}`,
      'headers': {
        'X-Triposo-Account': process.env.ACCOUNT_ID,
        'X-Triposo-Token': process.env.API_KEY
      }
    };
    rp(options).then(result => {
      const trips = JSON.parse(result).results[0]
      console.log(trips)

      const days = [];
      trips.days.forEach(function(day) {
          const id = trips.location.id;
          const itinerary = [];
          day.itinerary_items.forEach(function(item) {
            console.log(item)
               itinerary.push(item.title+ " " + item.description);
          });
          const hotel_info = "Hotel Dracula";
          days.push({
              id,
              itinerary,
              hotel_info
          });
      });
      res.render("itinerary", { data: days});

      
      
    })
   })

  

};

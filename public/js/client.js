$( document ).ready(function() {

    const form = document.querySelector("form");

    $("#loading").hide();


    $("#submit").click( function() {
        console.log("click");
        $("#inputElements").hide();
        $("#loading").show();

        const formData = new FormData(form);

        const budget = formData.get("budgetInput");
        const city = formData.get("cityInput");
        const arrival = formData.get("arrivalInput");
        const departure = formData.get("departureInput");

        const trip = {
            budget,
            city,
            arrival,
            departure
        };
        console.log(trip);
        getCards(trip)
        var settings = {
            "url": "https://www.triposo.com/api/20190906/day_planner.json?location_id=" + trip.city + "&account=37RBWIEK&token=82n4g05dnhk3ubu1wivs3yv7940kz28l&start_date=" + trip.arrival + "&end_date=" + trip.departure,
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(trip);
            console.log(response);
          });
        


    
    })

    function getCards(budget, city, arrival, departure){
        $.post("/api/members", {
            budget: budget,
            city: city,
            arrival: arrival,
            departure: departure
          })
            .then(function () {
              window.location.replace("/members");
              // If there's an error, log the error
            })
            .catch(function (err) {
              console.log(err);
            });
    }
});

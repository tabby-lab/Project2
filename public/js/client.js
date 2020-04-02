$(document).ready(function () {

  //Mateiralize specific methods for the forms
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.datepicker').datepicker();
  $('.parallax').parallax();

  const form = document.querySelector("form");

  $("#loading").hide();


  $("#submit").click(function (event) {
    console.log("click");
    event.preventDefault();
    $("#inputElements").hide();
    const userData={}
     
    userData.budget =  $("#budgetInput").val()
    userData.city = $("#cityInput").val();
    userData.arrival = $("#from_date").val();
    userData.departure = $("#to_date").val();
    
    $.post("/api/inventory", userData).then(function(data){
      location.replace(`/itinerary?budget=${budget}&city=${city}&arrival=${arrival}&departure=${departure}`);
    })
    
  //   const trip = {
  //     budget,
  //     city,
  //     arrival,
  //     departure
  //   };
  //   var settings = {
  //     "url": "/api/triposo",
  //     "method": "POST",
  //     "timeout": 0,
  //     "data": trip
  //   };

  //   //Take the object and redirect to a URL with the params from above baked int the URL.
  //   $.ajax(settings).done(function (response) {
  //     console.log(trip);
  //     console.log(response)
      
  //   });
   })
});

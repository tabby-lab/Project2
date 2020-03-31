$(document).ready(function () {

  //Mateiralize specific methods for the forms
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.datepicker').datepicker();
  $('.parallax').parallax();

  const form = document.querySelector("form");

  $("#loading").hide();


  $("#submit").click(function () {
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
    var settings = {
      "url": "/api/triposo",
      "method": "POST",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
      console.log(trip);
      console.log(response);
    });
  })
});

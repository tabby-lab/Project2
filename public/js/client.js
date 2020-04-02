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
     
    const budget =  $("#budgetInput").val()
    const city = $("#cityInput").val();
    const arrival = $("#from_date").val();
    const departure = $("#to_date").val();
    
    location.replace(`/itinerary?budget=${budget}&city=${city}&arrival=${arrival}&departure=${departure}`);

   })
});

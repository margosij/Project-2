$(document).ready(function() {
  //run this function whenever Month, Week, or Day button is clicked
  $("#btnMonth,#btnWeek,#btnDay").on("click", function() {
    var shiftSource = [];
    var buttonClick = $(this);
    //ajax call to GET user data
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      //lookup current employee shifts with signed in User
      $.ajax({
        url: "/api/shifts/" + userData.id,
        type: "GET"
      })
        .then(function(shiftData) {
          //for each shift in shiftData add a new calendar array element to be pushed into event_source
          shiftData.forEach(function(shift, index) {
            console.log(shift);
            var shiftRecord = {
              id: index,
              title:
                shift.Client.clientName + " - " + shift.Client.clientAddress,
              class: "event-important",
              start: moment(
                shift.shiftDate + " " + shift.shiftStartTime
              ).valueOf(),
              end: moment(shift.shiftDate + " " + shift.shiftEndTime).valueOf()
            };
            shiftSource.push(shiftRecord);
          });
        })
        .then(function() {
          //initialize calendar using pushed shiftData found above
          var calendar = $("#calendar").calendar({
            tmpl_path: "/tmpls/",
            view: buttonClick.text(),
            events_source: shiftSource
          });
        });
    });
  });
});

$(document).ready(function() {
  $("#btnMonth,#btnWeek,#btnDay").on("click", function() {
    var shiftSource = [];
    var buttonClick = $(this);
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      $.ajax({
        url: "/api/shifts/" + userData.id,
        type: "GET"
      })
        .then(function(shiftData) {
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
          var calendar = $("#calendar").calendar({
            tmpl_path: "/tmpls/",
            view: buttonClick.text(),
            events_source: shiftSource
          });
        });
    });
  });
});

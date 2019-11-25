$(document).ready(function() {
  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    $.ajax({
      url: "/api/shiftRecord/" + userData.id,
      type: "GET"
    }).then(function(shift) {
      var shiftTasks = shift.shiftRecord;
      console.log(JSON.stringify(shiftTasks));
    });
  });
});

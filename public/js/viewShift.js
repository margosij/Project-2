$(document).ready(function() {
  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    $.ajax({
      url: "/api/shiftRecord/" + userData.id,
      type: "GET"
    }).then(function(shift) {
      var shiftTasks = JSON.parse(shift.shiftRecord);
      Object.keys(shiftTasks).forEach(function(category) {
        var shiftCategory = shiftTasks[category];
        console.log(shiftCategory);
        Object.keys(shiftCategory).forEach(function(task) {
          var accordianHeader = "title" + category;
          $("#" + accordianHeader).text(
            category + " (" + Object.keys(shiftCategory).length + ")"
          );
          var accordianBody = "tasks" + category;
          var taskSection = $("#" + accordianBody);
          taskSection.append(task);
        });
      });
    });
  });
});

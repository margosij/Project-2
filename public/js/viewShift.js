$(document).ready(function() {
  $(document).on("click", "button.complete", toggleComplete);

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    if (
      $(this)
        .parent()
        .find("span")
        .css("text-decoration-line") === "line-through"
    ) {
      if (confirm("Are you sure you want to undo completed task?")) {
        $(this)
          .parent()
          .find("span")
          .css("text-decoration", "none");
      }
    } else {
      $(this)
        .parent()
        .find("span")
        .css("text-decoration", "line-through");
    }
  }

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
        Object.keys(shiftCategory).forEach(function(task) {
          var accordianHeader = "title" + category;
          $("#" + accordianHeader).text(
            category + " (" + Object.keys(shiftCategory).length + ")"
          );

          var newTaskItem = $(
            [
              "<li class='list-group-item d-flex justify-content-between align-items-center task-item'>",
              "<span>",
              task,
              "</span>",
              //"<button class='delete btn btn-danger'>x</button>",
              "<button class='complete btn btn-primary'>✓</button>",
              "</li>"
            ].join("")
          );

          var accordianBody = "tasks" + category;
          var taskSection = $("#" + accordianBody);
          taskSection.append(newTaskItem);
        });
      });
    });
  });
});

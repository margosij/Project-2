$(document).ready(function() {
  var userId;

  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", "#btnEmployeeSign", btnEmployeeSign);
  $("#btnEmployeeSign").hide();
  $("#rowFinalize").hide();
  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var taskValue = "";
    var category = $(this).data("adl");

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
        $(this)
          .parent()
          .css("background-color", "white");
        $(this).removeAttr(category + "checked");
        $(this).removeAttr("complete");
      } else {
        return;
      }
    } else {
      $(this)
        .parent()
        .find("span")
        .css("text-decoration", "line-through");
      $(this)
        .parent()
        .css("background-color", "green");
      $(this).attr(category + "checked", "true");
      $(this).attr("complete", "true");
      taskValue = "C";
    }

    var totalADL = $("#tasks" + category + " li").length;
    var completeADL = $(
      "#tasks" + category + " li button[" + category + "checked]"
    ).length;
    $("#title" + category).text(
      category + " (" + completeADL + " of " + totalADL + ")"
    );

    var taskKey = $(this)
      .parent()
      .find("span")
      .text();
    updateShiftRecord(category, taskKey, taskValue);
  }

  function updateShiftRecord(category, taskKey, taskValue) {
    $.ajax({
      url: "/api/shiftRecord/" + userId,
      type: "GET"
    }).then(function(shift) {
      var shiftTasks = JSON.parse(shift.shiftRecord);
      shiftTasks[category][taskKey] = taskValue;

      var shiftUpdate = {
        shiftRecord: JSON.stringify(shiftTasks),
        id: shift.id
      };

      $.ajax({
        method: "PUT",
        url: "/api/shiftRecord",
        data: shiftUpdate
      }).then(function() {
        var tasksTotal = $("li button").length;
        var tasksCompleted = $("li button[complete]").length;

        if (tasksCompleted === tasksTotal) {
          $("#btnEmployeeSign").show();
        }
      });
    });
  }

  function btnEmployeeSign() {
    $("#modalMatch").modal("toggle");
  }

  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    userId = userData.id;
    $.ajax({
      url: "/api/shiftRecord/" + userId,
      type: "GET"
    }).then(function(shift) {
      $("#shiftId").val(shift.id);
      $("#lblShiftDate").text("Shift Date: " + shift.shiftDate);
      $("#lblShiftCheckIn").text("Shift Start: " + shift.shiftStartTime);
      $("#lblShiftCheckOut").text("Shift End: " + shift.shiftEndTime);
      var shiftTasks = JSON.parse(shift.shiftRecord);
      Object.keys(shiftTasks).forEach(function(category) {
        var shiftCategory = shiftTasks[category];
        Object.keys(shiftCategory).forEach(function(task) {
          var newTaskItem = $(
            [
              "<li class='list-group-item d-flex justify-content-between align-items-center task-item'>",
              "<span>",
              task,
              "</span>",
              "<button class='complete btn btn-primary' data-adl='" +
                category +
                "'>✓</button>",
              "</li>"
            ].join("")
          );
          if (shiftCategory[task] === "C") {
            newTaskItem
              .find("span")
              .css("text-decoration-line", "line-through");
            newTaskItem.find("button").attr(category + "checked", "true");
            newTaskItem.find("button").attr("complete", "true");
            newTaskItem.css("background-color", "green");
          }

          var accordianBody = "tasks" + category;
          var taskSection = $("#" + accordianBody);
          taskSection.append(newTaskItem);

          var totalADL = $("#tasks" + category + " li").length;
          var completeADL = $(
            "#tasks" + category + " li button[" + category + "checked]"
          ).length;
          $("#title" + category).text(
            category + " (" + completeADL + " of " + totalADL + ")"
          );
        });
      });

      if (shift.clientSignature) {
        $("li").addClass("disabled");
        $("#rowFinalize").show();
        $("#save2").hide();
        $("#clear2").hide();
      }
    });
  });
});

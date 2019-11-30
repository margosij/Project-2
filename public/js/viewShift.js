$(document).ready(function() {
  var userId;
  var incompleteButton;
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", "button.incomplete", toggleIncompleteModal);
  $(document).on("click", "#btnEmployeeSign", btnEmployeeSign);
  $(document).on("click", "#modalIncompleteSave", toggleIncomplete);
  $("#btnEmployeeSign").hide();
  $("#rowFinalize").hide();
  $("#modalError").hide();
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
        $(this)
          .parent()
          .find("button")
          .removeAttr(category + "checked");
        $(this)
          .parent()
          .find("button")
          .removeAttr("complete");
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
        var tasksTotal = $("li button").length / 2;
        var tasksCompleted = $("li button[complete]").length;

        if (tasksCompleted === tasksTotal) {
          $("#btnEmployeeSign").show();
        }

        $("#dropdownReasonIncomplete").val("Select...");
        $("#tbReasonIncomplete").val("");
      });
    });
  }

  function toggleIncompleteModal(event) {
    event.stopPropagation();
    incompleteButton = $(this);
    var category = $(this).data("adl");
    if (
      incompleteButton
        .parent()
        .find("span")
        .css("text-decoration-line") === "line-through"
    ) {
      if (confirm("Are you sure you want to undo incomplete/refused task?")) {
        incompleteButton
          .parent()
          .find("span")
          .css("text-decoration", "none");
        incompleteButton.parent().css("background-color", "white");
        incompleteButton
          .parent()
          .find("button")
          .removeAttr(category + "checked");
        incompleteButton
          .parent()
          .find("button")
          .removeAttr("complete");
      } else {
        return;
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
      updateShiftRecord(category, taskKey, "");
    } else {
      $("#lblTaskCategory").text($(this).data("adl"));
      $("#lblTaskKey").text(
        $(this)
          .parent()
          .find("span")
          .text()
      );

      $("#modalIncomplete").modal("toggle");
    }
  }

  // Toggles complete status
  function toggleIncomplete(event) {
    event.stopPropagation();
    if (
      $("#dropdownReasonIncomplete").val() !== "Select..." &&
      $("#tbReasonIncomplete").val() !== ""
    ) {
      $("#modalError").hide();
      $("#modalIncomplete").modal("toggle");
      var taskValue = "";
      var category = $("#lblTaskCategory").text();

      incompleteButton
        .parent()
        .find("span")
        .css("text-decoration", "line-through");
      incompleteButton.parent().css("background-color", "red");
      incompleteButton.attr(category + "checked", "true");
      incompleteButton.attr("complete", "true");
      taskValue =
        $("#dropdownReasonIncomplete").val() +
        " - " +
        $("#tbReasonIncomplete").val();

      var totalADL = $("#tasks" + category + " li").length;
      var completeADL = $(
        "#tasks" + category + " li button[" + category + "checked]"
      ).length;
      $("#title" + category).text(
        category + " (" + completeADL + " of " + totalADL + ")"
      );

      var taskKey = $("#lblTaskKey").text();
      updateShiftRecord(category, taskKey, taskValue);
    } else {
      $("#modalError").show();
    }
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
              "<button class='incomplete btn btn-danger' data-adl='" +
                category +
                "'>x</button>",
              "<span class='text-center'>",
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
            newTaskItem
              .find("button.complete")
              .attr(category + "checked", "true");
            newTaskItem.find("button.complete").attr("complete", "true");
            newTaskItem.css("background-color", "green");
          } else if (shiftCategory[task] !== "") {
            newTaskItem
              .find("span")
              .css("text-decoration-line", "line-through");
            newTaskItem
              .find("button.incomplete")
              .attr(category + "checked", "true");
            newTaskItem.find("button.incomplete").attr("complete", "true");
            newTaskItem.css("background-color", "red");
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

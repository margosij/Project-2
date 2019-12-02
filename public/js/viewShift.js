$(document).ready(function() {
  var userId;
  var incompleteButton;
  //create click event listeners for complete, incomplete, sign, and incompleteSave actions
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", "button.incomplete", toggleIncompleteModal);
  $(document).on("click", "#btnEmployeeSign", btnEmployeeSign);
  $(document).on("click", "#modalIncompleteSave", toggleIncomplete);
  //hide elements on page load
  $("#btnEmployeeSign").hide();
  $("#rowFinalize").hide();
  $("#modalError").hide();
  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    //initialize variables to hold taskValue and current button ADL category
    var taskValue = "";
    var category = $(this).data("adl");
    //checks to see if item is already completed
    if (
      $(this)
        .parent()
        .find("span")
        .css("text-decoration-line") === "line-through"
    ) {
      //messages user to make sure they want to undo a task that they have already marked completed
      if (confirm("Are you sure you want to undo completed task?")) {
        //reset css characteristics on undo
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
      //add completed attributes and CSS characteristics to completed task
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
    //calculates current totalADL count and completedADL count for category and adds those values to task heading
    var totalADL = $("#tasks" + category + " li").length;
    var completeADL = $(
      "#tasks" + category + " li button[" + category + "checked]"
    ).length;
    $("#title" + category).text(
      category + " (" + completeADL + " of " + totalADL + ")"
    );
    //finds current task key to send to the update Function
    var taskKey = $(this)
      .parent()
      .find("span")
      .text();
    //updates shift record every time a task is marked complete or incomplete
    updateShiftRecord(category, taskKey, taskValue);
  }
  //function to undate the shift record
  function updateShiftRecord(category, taskKey, taskValue) {
    //look up current shift record for signed in User
    $.ajax({
      url: "/api/shiftRecord/" + userId,
      type: "GET"
    }).then(function(shift) {
      //parge shiftRecord for use
      var shiftTasks = JSON.parse(shift.shiftRecord);
      //set shiftRecord taskKey to the correct taskValue
      shiftTasks[category][taskKey] = taskValue;
      //creates element to update DB shiftRecord
      var shiftUpdate = {
        shiftRecord: JSON.stringify(shiftTasks),
        id: shift.id
      };
      //ajax PUT to update shiftRecord
      $.ajax({
        method: "PUT",
        url: "/api/shiftRecord",
        data: shiftUpdate
      }).then(function() {
        //recalulate total tasks completed versus total to be done
        var tasksTotal = $("li button").length / 2;
        var tasksCompleted = $("li button[complete]").length;
        //if all tasks are complete then show the button to allow employee to sign for a completed shift
        if (tasksCompleted === tasksTotal) {
          $("#btnEmployeeSign").show();
        }
        //reset incomplete dropdownReason and values
        $("#dropdownReasonIncomplete").val("Select...");
        $("#tbReasonIncomplete").val("");
      });
    });
  }

  function toggleIncompleteModal(event) {
    //initialize variable for button on incomplete ADL and it's category
    event.stopPropagation();
    incompleteButton = $(this);
    var category = $(this).data("adl");
    //check to see if task marked incomplete is already completed
    if (
      incompleteButton
        .parent()
        .find("span")
        .css("text-decoration-line") === "line-through"
    ) {
      //double check to see if user wants to reverse a completed task
      if (confirm("Are you sure you want to undo incomplete/refused task?")) {
        //resets all css and attribute data for reversed task complete
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
      //update totalADL and completeADL titles for current ADL category
      var totalADL = $("#tasks" + category + " li").length;
      var completeADL = $(
        "#tasks" + category + " li button[" + category + "checked]"
      ).length;
      $("#title" + category).text(
        category + " (" + completeADL + " of " + totalADL + ")"
      );
      //save taskKey for db update
      var taskKey = $(this)
        .parent()
        .find("span")
        .text();
      //call updateShiftRecord for blanked task
      updateShiftRecord(category, taskKey, "");
    } else {
      //if user is marking this task as incomplete the set modal task category and toggle the desired modal
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

  // Toggles incomplete status
  function toggleIncomplete(event) {
    event.stopPropagation();
    //makes sure user has entered a reason and category for incomplete task
    if (
      $("#dropdownReasonIncomplete").val() !== "Select..." &&
      $("#tbReasonIncomplete").val() !== ""
    ) {
      //toggle incompleteModal off
      $("#modalError").hide();
      $("#modalIncomplete").modal("toggle");
      var taskValue = "";
      var category = $("#lblTaskCategory").text();
      //set row on shiftRecord to show marked as incomplete with associated attributes and css
      incompleteButton
        .parent()
        .find("span")
        .css("text-decoration", "line-through");
      incompleteButton.parent().css("background-color", "red");
      incompleteButton.attr(category + "checked", "true");
      incompleteButton.attr("complete", "true");
      //sets new taskValue to the reason provided by user
      taskValue =
        $("#dropdownReasonIncomplete").val() +
        " - " +
        $("#tbReasonIncomplete").val();
      //updates category ADL header
      var totalADL = $("#tasks" + category + " li").length;
      var completeADL = $(
        "#tasks" + category + " li button[" + category + "checked]"
      ).length;
      $("#title" + category).text(
        category + " (" + completeADL + " of " + totalADL + ")"
      );
      //calls updateShiftRecord with new incomplete values
      var taskKey = $("#lblTaskKey").text();
      updateShiftRecord(category, taskKey, taskValue);
    } else {
      $("#modalError").show();
    }
  }
  //function to toggle Employee Signature modal on button click
  function btnEmployeeSign() {
    $("#modalMatch").modal("toggle");
  }
  //AJAX call to GET user data on page load
  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    //GET call to find current shift for signed in user
    userId = userData.id;
    $.ajax({
      url: "/api/shiftRecord/" + userId,
      type: "GET"
    }).then(function(shift) {
      //populate shift finalizing screen with correct review information
      $("#shiftId").val(shift.id);
      $("#lblShiftDate").text("Shift Date: " + shift.shiftDate);
      $("#lblShiftCheckIn").text("Shift Start: " + shift.shiftStartTime);
      $("#lblShiftCheckOut").text("Shift End: " + shift.shiftEndTime);
      var shiftTasks = JSON.parse(shift.shiftRecord);
      //loop for each key in the shiftRecord object (all categories)
      Object.keys(shiftTasks).forEach(function(category) {
        var shiftCategory = shiftTasks[category];
        //lloop for each key in the shiftRecord Category object (all tasks)
        Object.keys(shiftCategory).forEach(function(task) {
          //sets newTaskItem html element for each task populated
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
          //checks if the task is already marked as completed or incomplete
          if (shiftCategory[task] === "C") {
            //if task is marked as successfully completed then set proper CSS and attributes
            newTaskItem
              .find("span")
              .css("text-decoration-line", "line-through");
            newTaskItem
              .find("button.complete")
              .attr(category + "checked", "true");
            newTaskItem.find("button.complete").attr("complete", "true");
            newTaskItem.css("background-color", "green");
          } else if (shiftCategory[task] !== "") {
            //if task is marked as incompleted then set proper CSS and attributes
            newTaskItem
              .find("span")
              .css("text-decoration-line", "line-through");
            newTaskItem
              .find("button.incomplete")
              .attr(category + "checked", "true");
            newTaskItem.find("button.incomplete").attr("complete", "true");
            newTaskItem.css("background-color", "red");
          }
          //append task adl categories to the taskSection
          var accordianBody = "tasks" + category;
          var taskSection = $("#" + accordianBody);
          taskSection.append(newTaskItem);
          //calculate task section header text
          var totalADL = $("#tasks" + category + " li").length;
          var completeADL = $(
            "#tasks" + category + " li button[" + category + "checked]"
          ).length;
          $("#title" + category).text(
            category + " (" + completeADL + " of " + totalADL + ")"
          );
        });
      });
      //if shift is complete and client signature is provided then lock data and show finalized shift
      if (shift.clientSignature) {
        $("li").addClass("disabled");
        $("#rowFinalize").show();
        $("#save2").hide();
        $("#clear2").hide();
      }
    });
  });
});

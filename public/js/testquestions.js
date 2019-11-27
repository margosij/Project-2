$(document).ready(function() {
  $.urlParam = function(name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.search
    );

    return results !== null ? results[1] || 0 : false;
  };

  var testId = $.urlParam("id");
  testId = parseInt(testId.substring(0, testId.length - 5));
  var displayTest = $("#displayTest");
  var submitTest = $("#submitTest");
  var next = $("#nextQuestion");

  var correct = 0;
  var wrong = 0;
  var currentQuestion = 0;

  var testSetup;

  submitTest.hide();
  displayTest.hide();
  next.hide();

  var selectedAnswers = [];

  $("#answerQuestions").hide();
  $("#instructions").hide();
  $("#postTest").hide();

  $("#beginTest").on("click", startFunction);
  $("#submitTest").on("click", results);
  $("#nextQuestion").on("click", nextButton);
  $("#postTest").on("click", postResults);

  function startFunction() {
    displayTest.show();
    next.show();
    $("#instructions").show();
    $("#beginTest").hide();
  }

  function results() {
    selectedAnswers = $(displayTest.find("input:checked"));

    if (
      selectedAnswers[0].value === testSetup[currentQuestion - 1].questionAnswer
    ) {
      correct++;
      $("#correct").text("Answers right: " + correct);
    } else {
      wrong++;
      $("#incorrect").text("Wrong answers: " + wrong);
    }
    $("#correct").text("Answers right: " + correct);
    $("#incorrect").text("Wrong answers: " + wrong);

    if (currentQuestion === 10) {
      $("#modalMatch").modal("toggle");
      $("#testScore").text(
        "End of test! You scored a " + (parseFloat(correct) / 10) * 100 + "%"
      );
      $("#postTest").show();
      $("#submitTest").hide();
    }
  }

  function postResults() {
    var testScore = (parseFloat(correct) / 10) * 100;
    var testPass = 0;
    if (testScore >= 70) {
      var testPass = 1;
    }
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      var newResult = {
        testScore: testScore,
        testPass: testPass,
        testDate: moment().toDate(),
        TestListId: testId,
        UserId: userData.id
      };
      console.log(newResult);
      $.post("/api/testRecordSave", newResult, function() {
        window.location.href = "testList.html";
      });
    });
  }

  function nextButton() {
    $("#correct").hide();
    $("#incorrect").hide();
    $("#instructions").hide();
    if (currentQuestion > 0) {
      results();
    }
    $.get("/api/testquestions/" + testId, function(testResults) {
      testSetup = testResults;
      for (var i = 0; i < testSetup.length; i++) {
        $("#displayTest").html(
          '<h2 class="questionTest">' +
            testSetup[currentQuestion - 1].questionText +
            "</h2>"
        );
        var split = testSetup[currentQuestion - 1].questionOptions.split(",");
        for (var j = 0; j < split.length; j++) {
          $("#displayTest").append(
            // eslint-disable-next-line quotes
            '<hr><label class="radio-inline pr-4"><input type="radio" class="radioTest" name="answers-' +
              currentQuestion +
              // eslint-disable-next-line quotes
              '"value="' +
              split[j] +
              // eslint-disable-next-line quotes
              '">' +
              split[j] +
              "</label>"
          );
        }
      }
    });
    currentQuestion++;
    if (currentQuestion === 10) {
      next.hide();
      submitTest.show();
    }
  }
});

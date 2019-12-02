$(document).ready(function() {
  $.urlParam = function(name) {
    //pull out TestListId from url path
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.search
    );

    return results !== null ? results[1] || 0 : false;
  };
  //initialize variables for current testId and page elements
  var testId = $.urlParam("id");
  testId = parseInt(testId.substring(0, testId.length - 5));
  var displayTest = $("#displayTest");
  var submitTest = $("#submitTest");
  var next = $("#nextQuestion");
  //initialize variables to track correct and wrong answers as well as question number
  var correct = 0;
  var wrong = 0;
  var currentQuestion = 0;

  var testSetup;
  var selectedAnswers = [];
  //hide unecessary buttons and elements from user at start of test
  submitTest.hide();
  displayTest.hide();
  next.hide();
  $("#answerQuestions").hide();
  $("#instructions").hide();
  $("#postTest").hide();

  //sets listeners for click events on beginTest, submitTest, nextQuestion, and postTest
  $("#beginTest").on("click", startFunction);
  $("#submitTest").on("click", results);
  $("#nextQuestion").on("click", nextButton);
  $("#postTest").on("click", postResults);
  //function for starting and displaying test when user is ready to begin
  function startFunction() {
    displayTest.show();
    next.show();
    $("#instructions").show();
    $("#beginTest").hide();
  }
  //function for reconciling results of current question
  function results() {
    selectedAnswers = $(displayTest.find("input:checked"));
    //if user is correct
    if (
      selectedAnswers[0].value === testSetup[currentQuestion - 1].questionAnswer
    ) {
      //add to correct score and display on element
      correct++;
      $("#correct").text("Answers right: " + correct);
    } else {
      //if user is wrong then add to wrong score and display on element
      wrong++;
      $("#incorrect").text("Wrong answers: " + wrong);
    }
    //check to see if the user has reached the end of the test
    if (currentQuestion === 10) {
      //toggle finalize modal at end of test to display score
      $("#modalMatch").modal("toggle");
      $("#testScore").text(
        "End of test! You scored a " + (parseFloat(correct) / 10) * 100 + "%"
      );
      //show postTest element
      $("#postTest").show();
      $("#submitTest").hide();
    }
  }
  //function for posting Test Results to TestRecord
  function postResults() {
    //calculate test score and determine if user passed the test
    var testScore = (parseFloat(correct) / 10) * 100;
    var testPass = 0;
    if (testScore >= 70) {
      var testPass = 1;
    }
    //ajax call for getting user data
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      //initialize new TestRecord with keys testScore, testPass, testDate, testListId, and UserId
      var newResult = {
        testScore: testScore,
        testPass: testPass,
        testDate: moment().toDate(),
        TestListId: testId,
        UserId: userData.id
      };
      //post results to api/testRecordSave and then route user back to testList
      $.post("/api/testRecordSave", newResult, function() {
        window.location.href = "testList.html";
      });
    });
  }
  //function for clicking the Next Button
  function nextButton() {
    $("#correct").hide();
    $("#incorrect").hide();
    $("#instructions").hide();
    //tabulate results if this is not the first question
    if (currentQuestion > 0) {
      results();
    }
    //ajax GET call to pull back testQuestion
    $.get("/api/testquestions/" + testId, function(testResults) {
      testSetup = testResults;
      for (var i = 0; i < testSetup.length; i++) {
        $("#displayTest").html(
          "<h2 class='questionTest'>" +
            testSetup[currentQuestion - 1].questionText +
            "</h2>"
        );
        var split = testSetup[currentQuestion - 1].questionOptions.split(",");
        for (var j = 0; j < split.length; j++) {
          //append radio buttons with questionOptions to the screen
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
    //proceed to next question
    currentQuestion++;
    //display submit button rather than next if at the end of the test
    if (currentQuestion === 10) {
      next.hide();
      submitTest.show();
    }
  }
});

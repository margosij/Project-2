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

$("#beginTest").on("click", startFunction);
$("#submitTest").on("click", results);
$("#nextQuestion").on("click", nextButton);

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
    alert(
      "End of test! You scored a " + (parseFloat(correct) / 10) * 100 + "%"
    );
  }
}

function nextButton() {
  $("#correct").hide();
  $("#incorrect").hide();
  $("#instructions").hide();
  if (currentQuestion > 0) {
    results();
  }
  $.get("/api/testquestions", function(testResults) {
    testSetup = testResults;
    for (var i = 0; i < testSetup.length; i++) {
      $("#displayTest").html(
        "<h2>" + testSetup[currentQuestion - 1].questionText + "</h2>"
      );
      var split = testSetup[currentQuestion - 1].questionOptions.split(",");
      for (var j = 0; j < split.length; j++) {
        $("#displayTest").append(
          // eslint-disable-next-line quotes
          '<hr><label class="radio-inline pr-4"><input type="radio" name="answers-' +
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

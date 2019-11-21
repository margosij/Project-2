var displayTest = $("#displayTest");
var submitTest = $("#submitTest");

var correct = 0;
var wrong = 0;

var testSetup;

submitTest.hide();

$("#beginTest").on("click", startFunction);
$("#submitTest").on("click", results);

function startFunction() {
  testSetup();
  submitTest.show();
  $("#beginTest").hide();
}

function results() {
  $("#displayTest").hide();
  submitTest.hide();

  $("#correct")
    .text("Answers right: " + correct)
    .show();
  $("#incorrect")
    .text("Wrong answers: " + wrong)
    .show();
  selectedAnswers = $(displayTest.children("input:checked"));
  for (var i = 0; i < selectedAnswers.length; i++) {
    if (selectedAnswers[i].value === testSetup[i].questionAnswer) {
      correct++;
      $("#correct").text("Answers right: " + correct);
    } else {
      wrong++;
      $("#incorrect").text("Wrong answers: " + wrong);
    }
  }
}

function testSetup() {
  $.get("/api/testquestions", function(testResults) {
    testSetup = testResults;
    for (var i = 0; i < testSetup.length; i++) {
      $("#displayTest").append("<p>" + testSetup[i].questionText + "</p>");
      var split = testSetup[i].questionOptions.split(",");
      for (var j = 0; j < split.length; j++) {
        $("#displayTest").append(
          // eslint-disable-next-line quotes
          '<input type="radio" name="answers-' +
            i +
            // eslint-disable-next-line quotes
            '"value="' +
            split[j] +
            // eslint-disable-next-line quotes
            '">' +
            split[j]
        );
      }
    }
  });
}

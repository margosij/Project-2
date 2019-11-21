// var mysql = require("mysql");

// var routes = require("../routes/apiRoutes");
var submitTest = $("#submitTest");

// var correct = 0;
// var incorrect = 0;

var questions = [];

submitTest.hide();
testSetup();

$("#beginTest").on("click", startFunction);
// $("#submitTest").on("click", results);

function startFunction() {
  displayTest.show();
  submitTest.show();
  $("#beginTest").hide();
}

function testSetup() {
  $.get("/api/testquestions", function(questionText) {
    questions = questionText;
    // console.log(JSON.stringify(questions), "questions");
    console.log(questions[0].questionText);
    console.log(questions[0].questionAnswer);
  });
}

// var testSetup = {
//   test: function(questionText, questionAnswer, questionOptions) {
//     var queryString = "SELECT * FROM " + questionText + ";";
//     mysql.query(queryString, function(err, res) {
//       if (err) {
//         throw err;
//       }
//       choices(res);
//     });
//   }
// };

var testDisplay = {
  test: function(cb) {
    testSetup.test("testquestions", function(res) {
      cb(res);
    });
  }
};

//formula for displaying the questions and their answers
for (var i = 0; i < testDisplay.length; i++) {
  $("#displayTest").append("<p>" + testDisplay[i].question + "</p>");
  for (var j = 0; j < testDisplay[i].answers.length; j++) {
    $("#displayTest").append(
      // eslint-disable-next-line quotes
      '<input type="radio" name="answers-' +
        i +
        // eslint-disable-next-line quotes
        '"value="' +
        testDisplay[i].answers[j] +
        // eslint-disable-next-line quotes
        '">' +
        testDisplay[i].answers[j]
    );
  }
}
// console.log(testDisplay[i]);
// module.exports = testDisplay;

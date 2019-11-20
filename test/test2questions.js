var mysql = require("mysql");

// var routes = require("../routes/apiRoutes");
var submitTest = $("#submitTest");

// var correct = 0;
// var incorrect = 0;

submitTest.hide();

var testSetup = {
  test: function(questions, choices) {
    var queryString = "SELECT * FROM " + questions + ";";
    mysql.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      choices(res);
    });
  }
};

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
      '<input type="radio" name="aswers-' +
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

module.exports = testDisplay;

require("dotenv").config();

var db = require("./models");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );

    db.Employee.bulkCreate([
      {
        employeeName: "Caren Worker",
        employeeUsername: "cworker",
        employeePassword: "password",
        employeeStatus: "Active",
        employeeDOB: "2010-01-01",
        employeeHireDate: "2019-01-02"
      },
      {
        employeeName: "Henry Helper",
        employeeUsername: "hhelper",
        employeePassword: "password",
        employeeStatus: "Active",
        employeeDOB: "2002-01-01",
        employeeHireDate: "2019-01-12"
      },
      {
        employeeName: "Dougie Dapper",
        employeeUsername: "dougie",
        employeePassword: "password",
        employeeStatus: "Active",
        employeeDOB: "1999-01-01",
        employeeHireDate: "2019-01-20"
      }
    ])
      .then(
        db.TestList.bulkCreate([
          {
            testName: "HIPAA",
            testCategory: "safety",
            testRequired: "1",
            testCreatedBy: "Patrick"
          },
          {
            testName: "Activities of Daily Living",
            testCategory: "Health",
            testRequired: "1",
            testCreatedBy: "Patrick"
          },
          {
            testName: "Hand Hygiene",
            testCategory: "safety",
            testRequired: "1",
            testCreatedBy: "Patrick"
          }
        ])
      )
      .then(
        db.TestQuestion.bulkCreate([
          {
            TestListId: "1",
            questionText:
              "If someone works for the same agency as you, you are allowed to discuss information about your client.",
            questionAnswer: "False",
            questionOptions: "[True,False]"
          },
          {
            TestListId: "1",
            questionText:
              "All of the following should remain confidential except:",
            questionAnswer: "reporting a fall to the nurse",
            questionOptions:
              "[client diagnosis,client social security number,reporting a fall to the nurse,clients phone number]"
          },
          {
            TestListId: "1",
            questionText:
              "Confidentiality is one of your clients rights on their Bill of Rights.",
            questionAnswer: "True",
            questionOptions: "[True,False]"
          },
          {
            TestListId: "1",
            questionText:
              "If you share client confidential information you could:",
            questionAnswer: "All of the above",
            questionOptions:
              "[Lose your job,Face criminal charges,Have a lawsuit,All of the above]"
          },
          {
            TestListId: "1",
            questionText:
              "What would you do if you witness someones breaking client confidentiality?",
            questionAnswer: "Report to supervisor",
            questionOptions: "[Ignore it,Laugh,Report to supervisor,Join in]"
          },
          {
            TestListId: "1",
            questionText:
              "If a client tells you that his left side is numb you must not tell anyone.",
            questionAnswer: "False",
            questionOptions: "[True,False]"
          },
          {
            TestListId: "1",
            questionText:
              "It is okay to share client information with any part of the clients family.",
            questionAnswer: "False",
            questionOptions: "[True,False]"
          },
          {
            TestListId: "1",
            questionText:
              "The following must be kept in a locked cabinet or a supervised area:",
            questionAnswer: "All of the above",
            questionOptions:
              "[Medical records,Personal files,TB test results,All of the above]"
          },
          {
            TestListId: "1",
            questionText:
              "Your supervisor can share your annual evaluation results with your coworkers?",
            questionAnswer: "False",
            questionOptions: "[True,False]"
          },
          {
            TestListId: "1",
            questionText:
              "HIPAA was passed by Congress and is a Federal Law to ensure all of us the confidentiality of our personal medical information.",
            questionAnswer: "True",
            questionOptions: "[True,False]"
          }
        ])
      );
  });
});

module.exports = app;

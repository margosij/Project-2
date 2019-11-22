var taskList = require("./taskList.js");

module.exports = {
  getEmployees: function () {
    var employees = [
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
    ];
    return employees;
  },
  getTests: function () {
    var testList = [
      {
        testName: "HIPAA",
        testCategory: "safety",
        testRequired: 1,
        testCreatedBy: "Patrick"
      },
      {
        testName: "Activities of Daily Living",
        testCategory: "Health",
        testRequired: 1,
        testCreatedBy: "Patrick"
      },
      {
        testName: "Hand Hygiene",
        testCategory: "safety",
        testRequired: 1,
        testCreatedBy: "Patrick"
      }
    ];

    return testList;
  },
  getQuestions: function () {
    var testQuestions = [
      {
        TestListId: 1,
        questionText:
          "If someone works for the same agency as you, you are allowed to discuss information about your client.",
        questionAnswer: "False",
        questionOptions: "True,False"
      },
      {
        TestListId: 1,
        questionText: "All of the following should remain confidential except:",
        questionAnswer: "reporting a fall to the nurse",
        questionOptions:
          "client diagnosis,client social security number,reporting a fall to the nurse,clients phone number"
      },
      {
        TestListId: 1,
        questionText:
          "Confidentiality is one of your clients rights on their Bill of Rights.",
        questionAnswer: "True",
        questionOptions: "True,False"
      },
      {
        TestListId: 1,
        questionText: "If you share client confidential information you could:",
        questionAnswer: "All of the above",
        questionOptions:
          "Lose your job,Face criminal charges,Have a lawsuit,All of the above"
      },
      {
        TestListId: 1,
        questionText:
          "What would you do if you witness someones breaking client confidentiality?",
        questionAnswer: "Report to supervisor",
        questionOptions: "Ignore it,Laugh,Report to supervisor,Join in"
      },
      {
        TestListId: 1,
        questionText:
          "If a client tells you that his left side is numb you must not tell anyone.",
        questionAnswer: "False",
        questionOptions: "True,False"
      },
      {
        TestListId: 1,
        questionText:
          "It is okay to share client information with any part of the clients family.",
        questionAnswer: "False",
        questionOptions: "True,False"
      },
      {
        TestListId: 1,
        questionText:
          "The following must be kept in a locked cabinet or a supervised area:",
        questionAnswer: "All of the above",
        questionOptions:
          "Medical records,Personal files,TB test results,All of the above"
      },
      {
        TestListId: 1,
        questionText:
          "Your supervisor can share your annual evaluation results with your coworkers?",
        questionAnswer: "False",
        questionOptions: "True,False"
      },
      {
        TestListId: 1,
        questionText:
          "HIPAA was passed by Congress and is a Federal Law to ensure all of us the confidentiality of our personal medical information.",
        questionAnswer: "True",
        questionOptions: "True,False"
      }
    ];

    return testQuestions;
  },
  getClients: function () {
    var clientList = [
      {
        clientName: "Old Person",
        clientAddress: "10 Main Street, Raleigh, NC 27613"
      },
      {
        clientName: "Test Patient",
        clientAddress: "100 Oak Road, Raleigh, NC 27612"
      },
      {
        clientName: "Elderly Parent",
        clientAddress: "500 Red Road, Raleigh, NC 27612"
      }
    ];

    return clientList;
  },
  createCarePlans: function () {
    function createRandomTasks() {
      var newTaskObject = {
        Monday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {}
      };
      newTaskObject.Monday.Bathing[
        taskList.Bathing[Math.floor(Math.random() * 10)]
      ] = "";
      newTaskObject.Monday.Dressing[
        taskList.Dressing[Math.floor(Math.random() * 7)]
      ] = "";
      newTaskObject.Monday.Mobility[
        taskList.Mobility[Math.floor(Math.random() * 6)]
      ] = "";
      newTaskObject.Monday.Toileting[
        taskList.Toileting[Math.floor(Math.random() * 3)]
      ] = "";
      newTaskObject.Monday.Eating[
        taskList.Eating[Math.floor(Math.random() * 9)]
      ] = "";
      newTaskObject.Monday.IADL[taskList.IADL[Math.floor(Math.random() * 13)]] =
        "";

      return newTaskObject;
    }

    var carePlans = [
      {
        ClientId: 1,
        taskObject: JSON.stringify(createRandomTasks())
      },
      {
        ClientId: 2,
        taskObject: JSON.stringify(createRandomTasks())
      },
      {
        ClientId: 3,
        taskObject: JSON.stringify(createRandomTasks())
      }
    ];

    return carePlans;
  },
  createSchedule: function (carePlans) {
    var scheduleList = [];
    for (let index = 1; index < 4; index++) {
      for (let i = 0; i < 7; i++) {
        var today = new Date();
        var randomStart = (Math.floor(Math.random()*5) + 1)+":00";
        var randomEnd = (Math.floor(Math.random()*5) + 6)+":00";
        var newScheduleItem = {
          shiftDate: today.setDate(today.getDate() + i),
          shiftStartTime: randomStart,
          shiftEndTime: randomEnd,
          EmployeeId: index,
          ClientId: index,
          shiftRecord: JSON.stringify(carePlans[index-1])
        };
        scheduleList.push(newScheduleItem);
      }
    }

    return scheduleList;
  }
};

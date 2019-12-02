//require taskList to generate random tasks for careplans
var taskList = require("./taskList.js");
var moment = require("moment");

module.exports = {
  //function for generating TestList Seed Data
  getTests: function() {
    //testList has keys of testName, testCategory, testRequired, and testCreatedBy
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
        testCreatedBy: "Joel"
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
  //function getQuestions to generate TestQuestion seed data
  getQuestions: function() {
    //testQuestions has keys of testListId, questionText, questionAnswer, and questionOptions
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
      },
      {
        TestListId: 2,
        questionText:
          "Which of the following is not considered an activity of daily living (ADL)?",
        questionOptions: "Bathing,Toileting,Transferring,Cooking",
        questionAnswer: "Cooking"
      },
      {
        TestListId: 2,
        questionText:
          "All patients can improve in doing ADLs if they really want to.",
        questionOptions: "True,False",
        questionAnswer: "False"
      },
      {
        TestListId: 2,
        questionText: "Which of the following is true about ADLs",
        questionOptions:
          "If you are unable to do any of them you are considered homebound.,They include such household chores as washing dishes and doing laundry.,They are the basic activities of caring for oneself that are essential for day to day living.,All of the above.",
        questionAnswer:
          "They are the basic activities of caring for oneself that are essential for day to day living."
      },
      {
        TestListId: 2,
        questionText:
          "Which of the following would be important for the home health aide to do in order to help the patient improve in doing ADLs?",
        questionOptions:
          "Learn how to use the assistive devices the patient may need,Encourage the patient to do as much for himself/herself as possible.,Provide enough time for the patient to do things.,All of the above are important.",
        questionAnswer: "All of the above are important."
      },
      {
        TestListId: 2,
        questionText: "Which ADL limitation is reported most often?",
        questionOptions:
          "Requiring assistance with eating.,Requiring assistance with bathing.,Requiring assistance with toileting.,Requiring assistance with dressing.",
        questionAnswer: "Requiring assistance with bathing."
      },
      {
        TestListId: 2,
        questionText:
          "Which of the following is not a common reason that people need help with ADLs?",
        questionOptions:
          "Having a baby.,Having paralysis.,Having fractures.,Having chronic lung disease.",
        questionAnswer: "Having a baby."
      },
      {
        TestListId: 2,
        questionText:
          "A key to success in improving ADL function is good communication between home health aide and professionals who are seeing the patient.",
        questionOptions: "True,False",
        questionAnswer: "True"
      },
      {
        TestListId: 2,
        questionText: "How many activities are commonly called the ADLs?",
        questionOptions: "Four,Six,Three,Seven",
        questionAnswer: "Six"
      },
      {
        TestListId: 2,
        questionText:
          "Which of the following is considered to be one of the ADLs?",
        questionOptions:
          "Transferring,Using the telephone,Doing laundry,Washing dishes",
        questionAnswer: "Transferring"
      },
      {
        TestListId: 2,
        questionText:
          "Which of the following diseases/conditions may cause a patient to need assistance with ADLs?",
        questionOptions:
          "Stroke,Severe arthritis,Major surgery,All of the above",
        questionAnswer: "All of the above"
      }
    ];

    return testQuestions;
  },
  //function get Clients to generate Client Table Seed DAta
  getClients: function() {
    //clientList has keys of clientNAme and clientAddress
    var clientList = [
      {
        clientName: "Grandma Nelly",
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
  //function createCarePlans to generate random CarePlan data for the already generated clients
  createCarePlans: function() {
    function createRandomTasks() {
      //newTaskObject has keys Monday-Sunday with sub keys related to patient Activities of Daily Living (ADLs)
      var newTaskObject = {
        Monday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Tuesday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Wednesday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Thursday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Friday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Saturday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        },
        Sunday: {
          Bathing: {},
          Dressing: {},
          Mobility: {},
          Toileting: {},
          Eating: {},
          IADL: {}
        }
      };
      //random task list is generated for each client at the start of care plans using the taskList data
      Object.keys(newTaskObject).forEach(function(element) {
        for (var i = 0; i < 5; i++) {
          //adds random object from associated taskList ADL up to 5 times
          newTaskObject[element].Bathing[
            taskList.Bathing[Math.floor(Math.random() * 10)]
          ] = "";
          newTaskObject[element].Dressing[
            taskList.Dressing[Math.floor(Math.random() * 7)]
          ] = "";
          newTaskObject[element].Mobility[
            taskList.Mobility[Math.floor(Math.random() * 6)]
          ] = "";
          newTaskObject[element].Toileting[
            taskList.Toileting[Math.floor(Math.random() * 3)]
          ] = "";
          newTaskObject[element].Eating[
            taskList.Eating[Math.floor(Math.random() * 9)]
          ] = "";
          newTaskObject[element].IADL[
            taskList.IADL[Math.floor(Math.random() * 13)]
          ] = "";
        }
      });

      return newTaskObject;
    }
    //carePlans has keys of clientId and taskObject
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
  //createSchedule function generates random schedules for employee users
  createSchedule: function(carePlans) {
    var scheduleList = [];
    //adds a random start time and end time for shifts over each of the next 7 days
    for (var index = 1; index < 4; index++) {
      for (var i = 0; i < 7; i++) {
        var randomStart = Math.floor(Math.random() * 5) + 1 + ":00";
        var randomEnd = Math.floor(Math.random() * 5) + 6 + ":00";
        var dayName = moment()
          .add(i, "days")
          .format("dddd")
          .toString()
          .trim();
        var newScheduleItem = {
          shiftDate: moment()
            .add(i, "days")
            .subtract(5, "hours"),
          shiftStartTime: randomStart,
          shiftEndTime: randomEnd,
          //UserId: index,
          ClientId: index,
          shiftRecord: JSON.stringify(
            JSON.parse(carePlans[index - 1].taskObject)[dayName]
          )
        };
        scheduleList.push(newScheduleItem);
      }
    }

    return scheduleList;
  }
};

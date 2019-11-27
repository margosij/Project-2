var displayTest = $("#displayTest");
var submitTest = $("#submitTest");
var next = $("#nextQuestion");

var correct = 0;
var wrong = 0;
var currentQuestion = 0;

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
  // for (var i = 0; i < selectedAnswers.length; i++) {
  //   if (selectedAnswers.length < 10 || selectedAnswers.length === 0) {
  //     $("#modalMatch").modal("toggle");
  //   } else {
  //     displayTest.hide();
  //     submitTest.hide();
  //   }
  // }

  if (
    selectedAnswers[0].value === dailyLiving[currentQuestion - 1].correctAnswer
  ) {
    correct++;
    $("#correct").text("Answers right: " + correct);
  } else {
    wrong++;
    $("#incorrect").text("Wrong answers: " + wrong);
  }

  $("#correct").text("Answers right: " + correct);
  // .show();
  $("#incorrect").text("Wrong answers: " + wrong);
  // .show();
  if (currentQuestion === 10) {
    alert(
      "End of test! You scored a " +
        (parseFloat(correct) / dailyLiving.length) * 100 +
        "%"
    );
  }
}

var dailyLiving = [
  {
    question:
      "Which of the following is not considered an activity of daily living (ADL)?",
    answers: ["Bathing", "Toileting", "Transferring", "Cooking"],

    correctAnswer: "Cooking"
  },
  {
    question: "All patients can improve in doing ADLs if they really want to.",
    answers: ["True", "False"],

    correctAnswer: "False"
  },
  {
    question: "Which of the following is true about ADLs",
    answers: [
      "If you are unable to do any of them you are considered homebound.",
      "They include such household chores as washing dishes and doing laundry.",
      "They are the basic activities of caring for oneself that are essential for day to day living.",
      "All of the above."
    ],

    correctAnswer:
      "They are the basic activities of caring for oneself that are essential for day to day living."
  },
  {
    question:
      "Which of the following would be important for the home health aide to do in order to help the patient improve in doing ADLs?",
    answers: [
      "Learn how to use the assistive devices the patient may need",
      "Encourage the patient to do as much for himself/herself as possible.",
      "Provide enough time for the patient to do things.",
      "All of the above are important."
    ],

    correctAnswer: "All of the above are important."
  },
  {
    question: "Which ADL limitation is reported most often?",
    answers: [
      "Requiring assistance with eating.",
      "Requiring assistance with bathing.",
      "Requiring assistance with toileting.",
      "Requiring assistance with dressing."
    ],

    correctAnswer: "Requiring assistance with bathing."
  },
  {
    question:
      "Which of the following is not a common reason that people need help with ADLs?",
    answers: [
      "Having a baby.",
      "Having paralysis.",
      "Having fractures.",
      "Having chronic lung disease."
    ],

    correctAnswer: "Having a baby."
  },
  {
    question:
      "A key to success in improving ADL function is good communication between home health aide and professionals who are seeing the patient.",
    answers: ["True", "False"],

    correctAnswer: "True"
  },
  {
    question: "How many activities are commonly called the ADLs?",
    answers: ["Four", "Six", "Three", "Seven"],

    correctAnswer: "Six"
  },
  {
    question: "Which of the following is considered to be one of the ADLs?",
    answers: [
      "Transferring",
      "Using the telephone",
      "Doing laundry",
      "Washing dishes"
    ],

    correctAnswer: "Transferring"
  },
  {
    question:
      "Which of the following diseases/conditions may cause a patient to need assistance with ADLs?",
    answers: [
      "Stroke",
      "Severe arthritis",
      "Major surgery",
      "All of the above"
    ],

    correctAnswer: "All of the above"
  }
];

function nextButton() {
  $("#correct").hide();
  $("#incorrect").hide();
  $("#instructions").hide();
  if (currentQuestion > 0) {
    results();
  }
  displayTest.html("<h2>" + dailyLiving[currentQuestion].question + "</h2>");
  for (var i = 0; i < dailyLiving[currentQuestion].answers.length; i++) {
    displayTest.append(
      // eslint-disable-next-line quotes
      '<hr><label class="radio-inline pr-4"><input type="radio" name="answers-' +
        currentQuestion +
        // eslint-disable-next-line quotes
        '"value="' +
        dailyLiving[currentQuestion].answers[i] +
        // eslint-disable-next-line quotes
        '">' +
        dailyLiving[currentQuestion].answers[i] +
        "</label>"
    );
  }

  currentQuestion++;
  if (currentQuestion === 10) {
    next.hide();
    submitTest.show();
  }
}

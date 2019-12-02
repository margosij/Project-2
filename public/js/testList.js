$(document).ready(function() {
  //when user selects desired text then route them to testActive with the correct testId
  $($(".button")).click(function() {
    window.location.href =
      "./testActive?id=" + $(this).attr("data-test") + ".html";
  });
  //gets user data on page load
  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    //ajax call to GET all tests currently in database along with user test records
    $.ajax({
      url: "/api/testList/",
      type: "GET"
    }).then(function(testList) {
      //for each test in database search for user testRecord
      for (var i = 0; i < testList.length; i++) {
        findTestRecord(testList, i, userData);
      }
    });
  });
  //function to check if user has already taken this test
  function findTestRecord(testList, i, userData) {
    //initialize variables for the current test label and testName for placement on button
    var testLabel = "lblTest" + (i + 1);
    var testName = testList[i].testName;
    $("#" + testLabel).text(testName);
    //call api/testRecord GET to see if userId and testListId find this user's test
    $.ajax({
      url: "/api/testRecord/" + userData.id + "/" + testList[i].id,
      type: "GET"
    }).then(function(testRecord) {
      //if testRecord exists for user
      if (testRecord) {
        if (testRecord.testPass) {
          //display if user has taken and passed the test
          $("#" + testLabel).text(
            testName + " - PASSED (" + testRecord.testScore + "%)"
          );
        } else {
          //display if the user has taken and failed the test
          $("#" + testLabel).text(
            testName + " - FAILED (" + testRecord.testScore + "%)"
          );
        }
      }
    });
  }
});

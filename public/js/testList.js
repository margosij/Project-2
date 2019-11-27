$(document).ready(function() {
  $.ajax({
    url: "/api/user_data",
    type: "GET"
  }).then(function(userData) {
    $.ajax({
      url: "/api/testList/",
      type: "GET"
    }).then(function(testList) {
      for (var i = 0; i < testList.length; i++) {
        findTestRecord(testList, i, userData);
      }
    });
  });
  function findTestRecord(testList, i, userData) {
    var testLabel = "lblTest" + (i + 1);
    var testName = testList[i].testName;
    $("#" + testLabel).text(testName);
    $.ajax({
      url: "/api/testRecord/" + userData.id + "/" + testList[i].id,
      type: "GET"
    }).then(function(testRecord) {
      if (testRecord) {
        if (testRecord.testPass) {
          $("#" + testLabel).text(
            testName + " - PASSED (" + testRecord.testScore + "%)"
          );
        } else {
          $("#" + testLabel).text(
            testName + " - FAILED (" + testRecord.testScore + "%)"
          );
        }
      }
    });
  }
});

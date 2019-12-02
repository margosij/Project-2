//Inititializing JS on document ready
$(document).ready(function() {
  //rerouting links on home page
  $("#schedule-btn").click(function() {
    window.location.href = "./viewSchedule.html";
  });
  $("#checklist-btn").click(function() {
    window.location.href = "./viewShift.html";
  });
  $("#learning-btn").click(function() {
    window.location.href = "./testList.html";
  });
  //setting global variables for latitude and longitude to pass through yelp Ajax Request
  var latitude;
  var longitude;

  //On Click event to get map and current latitude and longitude
  $("#btnLocate").on("click", initMap);
  checkInorOut();

  function initMap() {
    var map, infoWindow;
    unFilter = true;
    //if we want to add the map back uncomment lines 14-17 and uncomment public/home.html lines 133-137
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          //setting global gps variables w/ values of current position
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);

          insertEVV(longitude, latitude);
        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        },
        $("#check-in-modal").modal("show")
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
  //function insertEVV inserts the EVV record for Check In or Check Out
  function insertEVV(longitude, latitude) {
    //get user data to pull correct schedule
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      //get shift record for shift occuring today
      $.ajax({
        url: "/api/shiftRecord/" + userData.id,
        type: "GET"
      }).then(function(currentShift) {
        //checks if today's shift clientSignature has a value which indicates shift end
        if (currentShift.clientSignature) {
          //creates Check Out object to send to db
          var EVVRecord = {
            checkOutLongitude: longitude,
            checkOutLatitude: latitude,
            checkOutTime: moment().format("h:mm:ss"),
            UserID: userData.id,
            id: currentShift.id
          };
        } else {
          //creates Check In object if client signature is blank in database
          var EVVRecord = {
            checkInLongitude: longitude,
            checkInLatitude: latitude,
            checkInTime: moment().format("h:mm:ss"),
            UserID: userData.id,
            id: currentShift.id
          };
        }
        //puts new EVVRecord data into database for respective Check In or Check Out
        $.ajax({
          method: "PUT",
          url: "/api/EVVRecord",
          data: EVVRecord
        }).then(
          console.log("successfully updated shift id: " + currentShift.id)
        );
      });
    });
  }
  //function to check if user option should be Check In or Check Out on page load
  function checkInorOut() {
    //ajax call to get user data and shift data
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      $.ajax({
        url: "/api/shiftRecord/" + userData.id,
        type: "GET"
      }).then(function(currentShift) {
        //if current shift client signature is filled out and shift is over then change Check In text to Check Out
        if (currentShift.clientSignature) {
          $("#lblCheckIn").text("Check Out");
          $("#exampleModalLongTitle").text("Employee Check-Out Success");
        }
      });
    });
  }
});

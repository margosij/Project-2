//Inititializing JS on document ready
$(document).ready(function() {
  //setting global variables for latitude and longitude to pass through yelp Ajax Request
  var latitude;
  var longitude;
  var evvData = getEVV();

  //On Click event to get map and current latitude and longitude
  $("#btnLocate").on("click", initMap);

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

          insertEVV(longitude, latitude, 1);
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
  function insertEVV(longitude, latitude, EmployeeID) {
    var EVVRecord = {
      longitude: longitude,
      latitude: latitude,
      //hardcoding "EmployeeID" for now but once we have the login set up we need to go back and rework this:
      EmployeeID: EmployeeID
    };

    $.post("/api/EVVRecord", EVVRecord);
  }

  function getEVV() {
    $.get("/api/EVVRecord", function(data) {
      var evvRecords = data;
      console.log(evvRecords);
    });
  }
});

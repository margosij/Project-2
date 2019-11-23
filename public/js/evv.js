//Inititializing JS on document ready
$(document).ready(function() {
  //setting global variables for latitude and longitude to pass through yelp Ajax Request
  var latitude;
  var longitude;

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
  function insertEVV(longitude, latitude) {
    $.ajax({
      url: "/api/user_data",
      type: "GET"
    }).then(function(userData) {
      $.ajax({
        url: "/api/shiftRecord/" + userData.id,
        type: "GET"
      }).then(function(currentShift) {
        var EVVRecord = {
          checkInLongitude: longitude,
          checkInLatitude: latitude,
          checkInTime: moment().format("h:mm:ss"),
          UserID: userData.id,
          id: currentShift.id
        };

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
});

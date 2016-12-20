function initMap() {
  //setup the Google Maps API services
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    //arbitrary center just for loading the map
    center: {lat: 37.8719, lng: -122.2585},
    zoom: 6
  });
  //Initialize the geolocator for a user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //center the map at the user's current location
      map.setCenter(pos);
      //set these non visibile p elements to the coordinates for later user
      var lat = document.getElementById("start-lat");
      var long = document.getElementById("start-long");
      lat.innerHTML = position.coords.latitude;
      long.innerHTML = position.coords.longitude;
      //call the directions function
      calculateAndDisplayRoute(directionsService, directionsDisplay, map);
      var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay, map);
        };
        document.getElementById('transportation').addEventListener('change', onChangeHandler);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    //browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, map) {
  //set up displays for the directions
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));
  var mode = document.getElementById('transportation').value;
  //the ClickTime office address
  var end =  "282 2nd Street 4th floor, San Francisco, CA 94105"
  //getting/compiling user location coordinates into a starting point
  var start_lat = document.getElementById('start-lat').innerHTML;
  var start_long = document.getElementById('start-long').innerHTML;
  var start_pos = new google.maps.LatLng(start_lat, start_long);
  //draw the route and choose the method of travel
  directionsService.route({
    origin: start_pos,
    destination: end,
    travelMode: mode
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
//function to notify users about an error
function handleLocationError(browserHasGeolocation, pos) {
  window.alert(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

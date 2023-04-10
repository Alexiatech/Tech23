


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // Doe hier iets met de verkregen locatiegegevens, bijvoorbeeld:
  alert("Latitude: " + latitude + "\nLongitude: " + longitude);
}

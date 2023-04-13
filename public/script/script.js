if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // Doe hier iets met de verkregen locatiegegevens, bijvoorbeeld:
  alert("Latitude: " + latitude + "Longitude: " + longitude);
}


// chuck norris jokes 
function updateJoke() {
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("quote").innerHTML = data.value;
    });
}


  updateJoke();
  setInterval(updateJoke, 9000);


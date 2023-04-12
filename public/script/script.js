

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




const h1 = document.getElementById('img');


function updateQuote(){

fetch ('https://api.chucknorris.io/jokes/random')
  .then(response => response.json())
  .then(data => {
  console.log(data);
  h1.innerHTML = data.data;
 
});
}

updateQuote();

setInterval(updateQuote, 5000);

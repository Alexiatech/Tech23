// const quoteElement = document.getElementById('quote');

// function updateQuote(){
//   fetch('https://meowfacts.herokuapp.com/')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       quoteElement.innerHTML = data.data;
//     })
//     .catch(error => {
//       console.log(error);
//       quoteElement.innerHTML = "Er is een fout opgetreden bij het laden van de gegevens. Probeer het later opnieuw.";
//     });
// }

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

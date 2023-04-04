const quoteElement = document.getElementById('quote');

function updateQuote(){
  fetch('https://meowfacts.herokuapp.com/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      quoteElement.innerHTML = data.data;
    })
    .catch(error => {
      console.log(error);
      quoteElement.innerHTML = "Er is een fout opgetreden bij het laden van de gegevens. Probeer het later opnieuw.";
    });
}
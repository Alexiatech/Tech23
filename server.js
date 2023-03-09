const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337;


app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.get ('/', onHome).listen(1337);

function onHome (req, res) {
    res.send ('hallo')
}

//routing

app.get("/registreren", (req, res) => {
    res.render("registreren.ejs", {data: port})
});
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', (req, res) => {
  res.render('index.ejs');
});

app.get('/header', (req, res) => {
  res.render('index');
});

app.get('/form', (req, res) => {
  res.render('form.ejs');
});





//submitting

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password1;
  const confirmPassword = req.body.password2;
  const country = req.body.country; 
  const birthday = req.body.date;
 

  console.log(req.body)
  res.send(`Name: ${name}, Email: ${email}, Password: ${password}, Country: ${country}, Birthday: ${birthday},`);
});



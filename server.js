require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 2000;
const passwordCon = process.env.PASSWORD



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
  res.locals.Errorcode = "";
  res.render('form.ejs');
});



//submitting

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password1;
  const secondpassword = req.body.password2;
  const country = req.body.country; 
  const birthday = req.body.date;

  if(password !== secondpassword) {
    res.locals.Errorcode = "Password does NOT match";
    res.render('form.ejs');

    }
 else{
  res.send(`Name: ${name}, Email: ${email}, Password: ${password}, Country: ${country}, Birthday: ${birthday},`);
}

  console.log(req.body)
  
});


// mongodb 

let db = null;

async function connectDB() {
  console.log('connecting')
  const uri = "mongodb+srv://alexiawiersma:" + passwordCon + "@alexiawiersma.5d12jf8.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
  });
  try {
      await client.connect();
      console.log('connected!')
      db = client.db('Gebruikersgegevens');

  } catch (error) {
    console.error(error);
    throw error;
  }
}

//server configurations
app.listen(port, async () => {
  console.log('Server started on port 2000');
  let databaseConnection = await connectDB();
  let theData = await db.collection('gegevens').find({}).toArray();
  console.log(theData);
});

// app.get('/', async(req, res)) => {
//   const db = client.db("Gebruikersgegevens").collection("gegevens");
//   const connectDb = await db.find({}).toArray();
//   console.log ("@@-- data", connectDb); 
// }


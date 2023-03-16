require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 2000;
const passwordCon = process.env.PASSWORD
const session = require('express-session');


const bcrypt = require('bcrypt');


app.use("/public", express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: 'geheime_sleutel',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

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

app.post('/submit', (req, res) => {
  const userdata = req.body;
  res.render('confirmation.ejs', { userdata: userdata });
});


app.get('/update', async (req, res) => {
  const userId = req.session.userId; // haal het userId op uit de sessie

  // haal de gegevens van de huidige gebruiker op uit de database
  const user = await db.collection('gegevens').findOne({ _id: ObjectId(userId) });

  // render de update pagina en geef de gebruikersgegevens door als parameter
  res.render('update.ejs', { user: user });
});


//submitting

app.post('/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password1;
  const secondpassword = req.body.password2;
  const country = req.body.country; 
  const birthday = req.body.date;

  console.log(name, email, password, secondpassword, country, birthday);

  if(password !== secondpassword) {
    res.locals.Errorcode = "Password does NOT match";
    res.render('form.ejs');
  } else {
    // hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user data to the database
    const userdata = {
      name: name,
      pwd: hashedPassword, 
      email: email,
      country: country,
      birthday: birthday
    };
    await db.collection('gegevens').insertOne(userdata);

    // store the user data in session or temporary storage
    req.session.userdata = userdata;

    // redirect the user to the confirmation page
    res.redirect('/confirmation');
  }
  
});

app.post('/update', async (req, res) => {
  const { ObjectId } = require("mongodb");
  
  const name = req.body.name;
  const email = req.body.email;
  const country = req.body.country; 
  const birthday = req.body.date;

  // retrieve the user data from session or temporary storage
  const userdata = req.session.userdata;

  // update the user data in the database
  await db.collection('gegevens').updateOne(
    { email: userdata.email },
    { $set: { name: name, email: email, country: country, birthday: birthday } }
  );

  // update the user data in session or temporary storage
  userdata.name = name;
  userdata.email = email;
  userdata.country = country;
  userdata.birthday = birthday;

  // redirect the user to the confirmation page
  res.redirect('/confirmation');
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


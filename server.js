require('dotenv').config();


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000;
const uriDB = process.env.URIDB
const bcrypt = require('bcrypt');

let db = null;
let randomQuote;

async function connectDB() {
  console.log('connecting');
  const uri = uriDB;
  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  try {
      console.log("awaiting connection");
      await client.connect();
      console.log('connected!')
      db = client.db('Gebruikersgegevens');


  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.use("/public", express.static("public"));
app.set("view engine", "ejs");


//routing

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/form', (req, res) => {
  res.locals.Errorcode = "";
  res.render('form.ejs');
});

app.get('/login', (req, res) => {
  res.render('inloggen.ejs');
});

app.get('/update', (req, res) => {
  res.render('update.ejs');
});




app.post('/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password1;
  const secondpassword = req.body.password2;
  const country = req.body.country; 
  const birthday = req.body.date;

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


    // redirect the user to the confirmation page
    res.render('confirmation.ejs', { userdata });

  }
  
});



app.get('/update', async (req, res) => {
  // Haal de eerste gebruiker op uit de collectie 'gegevens'
  const user = await db.collection('gegevens').findOne({});
  
  // Render de update-pagina en geef de gebruikersgegevens mee als een object
  res.render('update', { user });
});





// inloggen 

app.post('/login', async (req, res) => {
  const emailSignin = req.body.emailsign;
  const passwordSignin = req.body.passwordsign;
  console.log('hello')

  const user = await db.collection('gegevens').findOne({ email: emailSignin });

      if (!user) {
        return res.render('inloggen', { error: 'Invalid email or password' });
      }
  const isMatch = await bcrypt.compare(passwordSignin, user.pwd);

      if (!isMatch) {
         return res.render('inloggen', { error: 'Invalid email or password' });
      } else {
  
    res.redirect('/');
     }

});


app.use(function (req, res) {
  res.locals.title = "Error 404"
  res.status(404).render('404', {
    path: 'Error'
  });
});


//server configurations
app.listen(port, async () => {
  console.log('Server started on port 2000');
  await connectDB();
  let theData = await db.collection('gegevens').find({}).toArray();
});
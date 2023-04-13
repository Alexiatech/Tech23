require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');// body-parser om de data van HTTP requests te parsen
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
const port = 3000;
const uriDB = process.env.URIDB //Het haalt de URI op uit de omgevingsvariabele 'URIDB' die is ingesteld in het bestand .env, met behulp van de module dotenv.
const bcrypt = require('bcrypt');



let db = null;

// Maakt een connectie met een MongoDB-database met behulp van 
// de geconfigureerde URI. Vervolgens initialiseert het een MongoClient en verbindt het met de database.

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
// 
// 
// registreert een middleware om de URL-gecodeerde gegevens te parseren die naar de server worden gestuurd 
// vanuit een HTML-formulier met de methode POST. 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/form', (req, res) => {
  res.locals.Errorcode = "";
  res.render('form.ejs');
});

app.get('/login', (req, res) => {
  res.locals.Errorcode = "";
  res.render('inloggen.ejs');
});


// Registreren

// De code ontvangt data van de gebruiker en controleert of alle 
// verplichte velden zijn ingevuld en of de wachtwoorden overeenkomen. 
// Als er een fout is, wordt er een foutcode gerenderd. Anders wordt het 
// wachtwoord gehasht en wordt de gebruikersgegevens opgeslagen in de database. 
// Vervolgens wordt de gebruiker doorgestuurd naar de bevestigingspagina.



app.post('/submit', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password1;
  const secondpassword = req.body.password2;
  const country = req.body.country;
  const birthday = req.body.date;
  console.log("hello")

  if (!name || !email || !password || !secondpassword || !country || !birthday) {
    res.locals.Errorcode = "Please fill in all required fields";
    res.render('form.ejs');
  } else if (password !== secondpassword) {
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

    console.log(db)

    // redirect the user to the confirmation page
    res.render('confirmation.ejs', {
      userdata
    });
  }
});





// inloggen 

// Deze code controleert of alle verplichte velden zijn ingevuld. 
// Als dit niet het geval is, wordt er een foutmelding weergegeven. Vervolgens 
// wordt er gecontroleerd of de opgegeven e-mail en wachtwoord overeenkomen met de gegevens 
// in de database. Als dit niet het geval is, wordt er een foutmelding weergegeven. Als alles 
// correct is ingevuld, wordt de gebruiker doorgestuurd naar de homepagina

app.post('/login', async (req, res) => {
  const emailSignin = req.body.emailsign;
  const passwordSignin = req.body.passwordsign;

  // Check if required fields are empty
  if (!emailSignin || !passwordSignin) {
    res.locals.Errorcode = "Please fill in all required fields";
    return res.render('inloggen', {
      emailSignin: emailSignin
    });
  }

  const user = await db.collection('gegevens').findOne({
    email: emailSignin
  });

  if (!user) {
    res.locals.Errorcode = "Incorrect email or password";
    return res.render('inloggen', {
      emailSignin: emailSignin
    });
  }

  const isMatch = await bcrypt.compare(passwordSignin, user.pwd);

  if (!isMatch) {
    res.locals.Errorcode = "Incorrect email or password";
    return res.render('inloggen', {
      emailSignin: emailSignin
    });
  } else {
    res.redirect('/');
  }
});

// account delete

// Het controleert of de ingevoerde e-mail en wachtwoord overeenkomen met de
// gegevens in de database en geeft een foutmelding als dat niet het geval is. Als alles correct is,
//  wordt de gebruiker doorgestuurd naar de update pagina waar je feedback krijgt dat het geslaagd is.

app.post('/delete', async (req, res) => {
  try {

    const name = req.body.delete;
    console.log(`hello`);


    const result = await db.collection('gegevens').deleteOne({
      name: name
    });
    if (result.deletedCount === 0) {
      res.status(404).send('Gebruiker niet gevonden');
      return;
    }

    res.redirect('/update');
  } catch (error) {
    console.error(error);
    res.status(404).send('Er is een fout opgetreden bij het verwijderen van de gebruiker');
  }
});




app.get('/update', (req, res) => {
  res.render('update.ejs');
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
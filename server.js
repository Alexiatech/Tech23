require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000;
const uriDB = process.env.URIDB
const bcrypt = require('bcrypt');



let db = null;


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

app.post('/delete', async (req, res) => {
  try {
    // Haal de naam van de te verwijderen gebruiker op uit de POST request
    const name = req.body.delete.trim(); // use trim() to remove extra spaces
    console.log(`hello`);

    // Verwijder de gebruiker met de opgegeven naam uit de "Users" collectie
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
    res.status(400).send('Er is een fout opgetreden bij het verwijderen van de gebruiker');
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
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 2000;
const passwordCon = process.env.PASSWORD
const bcrypt = require('bcrypt');

let db = null;
let randomQuote;

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

app.get('/location', (req, res) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${long}`);
        res.send(`Latitude: ${lat}, Longitude: ${long}`);
      },
      error => {
        console.error(error);
        res.send('Unable to retrieve location.');
      }
    );
  } else {
    res.send('Geolocation is not supported by this browser.');
  }
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


    // redirect the user to the confirmation page
    res.redirect('/');
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



// gegevens updaten 

// app.get('/update', async (req, res) => {
//   const userId = req.session.userId;

//   const user = await db.collection('gegevens').findOne({ _id: ObjectId(userId) });

//   if (!user) {
//     return res.redirect('/login');
//   }

//   res.render('update', { user });
// });




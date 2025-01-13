const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());

//utvonalak importalasa
const users = require('./routes/users');

//utvonalak hasznalata
app.use('/users', users);

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton!`);
});


const mongoose = require('mongoose');
const mongoDBURL = process.env.MONGO_URI;

mongoose.connect(mongoDBURL, {}).then(() => { console.log("Az adatbázis kapcsolat létrejött sikeresen") }).catch((err) => { console.log("Hiba az adatbázis kapcsolódáskor") })
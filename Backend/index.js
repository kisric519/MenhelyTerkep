const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(cors());

//utvonalak importalasa
const users = require('./routes/users');
const menhelyek = require('./routes/menhelyek');
const admin = require('./routes/admin');
const naptar = require('./routes/naptar');

//utvonalak hasznalata
app.use('/users', users);
app.use('/menhelyek', menhelyek);
app.use('/admin', admin);
app.use('/naptar', naptar);

//Adatbázis kapcsolat
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Sikeres adatbázis kapcsolódás');
  } catch (error) {
    console.error('Sikertelen adatbézis kapcsolat: ', error);
  }
}
connectToDatabase();

//Szerver létrehozása
const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton!`);
});
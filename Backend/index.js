const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton!`);
});
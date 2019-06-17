const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Routes: il metodo carica tutte le routes che trova nella cartella route e i file
  che contengono nel filename la parola chiave 'route'
*/
require('./server/routes').loadRoutes(app);

app.get('*', (req, res) => {
  res.status(200).send({msg: 'Hello World!'});
});

module.exports = app;

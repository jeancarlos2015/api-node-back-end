const express = require('express');
const app = express();
const port = 4545;

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('api/data/db.sqlite');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(app, db);

app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});
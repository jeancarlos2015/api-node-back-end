const getRoutesContatos = require('./contato-get-route');
const postRoutesContatos = require('./contato-post-route');
const putRoutesContatos = require('./contato-put-route');
const deleteRoutesContatos = require('./contato-delete-route');
const loadDatabaseContato = require('../data/setup-contato-database');

const getRoutesOperadoras = require('./operadora-get-route');
const postRoutesOperadoras = require('./operadora-post-route');
const loadDatabaseOperadora = require('../data/setup-operadora-database');
module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabaseContato(db);
  loadDatabaseOperadora(db);

  // start routes
  getRoutesContatos(app, db);
  postRoutesContatos(app, db);
  putRoutesContatos(app, db);
  deleteRoutesContatos(app, db);

  getRoutesOperadoras(app, db);
  postRoutesOperadoras(app, db);

};
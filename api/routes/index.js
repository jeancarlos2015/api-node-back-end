const getRoutes = require('./contato-get-route');
const postRoutes = require('./contato-post-route');
const putRoutes = require('./contato-put-route');
const deleteRoutes = require('./contato-delete-route');
const loadDatabase = require('../data/setup-contato-database');

module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);

};
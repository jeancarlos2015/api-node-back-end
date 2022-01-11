module.exports = () => {
  var service = {};
  service.listarContatos = function () {
    var db = require("../database/database.js");
    var sql = "SELECT * FROM Contato";
    var contatos = [];
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        contatos.push(row);
      });
    });
    return contatos;
  };
  return service;
};

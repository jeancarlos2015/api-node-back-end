module.exports = function (app, db) {
  app.post("/api/contato/", (req, res) => {
 
    var data = req.body;

    if (data.constructor === Array) processContatos(req, res, db);
    else processContato(req, res, db);
  });
};

function processContatos(req, res, db) {
  for (var prod of req.body) {
    insertContato(prod, res, db);
  }
}

function processContato(req, res, db) {
  validateRequest(req, res);
  insertContato(req.body, res, db);
}

function insertContato(contato, res, db) {
  let name = contato.nome;
  let telefone = contato.telefone;
  let data = contato.data;
  let cor = contato.cor;
  let codoperadora = contato.codoperadora;

  let sql = `insert into Contato (nome, telefone, data, codoperadora,cor) 
            VALUES 
            ( ?, ?, ?, ?, ? );`;

  let values = [name, telefone, data, codoperadora, cor];

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
}

function validateRequest(req, res) {
  var fs = require("fs");
  var schema = JSON.parse(
    fs.readFileSync("api/mock/ContatosMock.json", "utf8")
  );

  var JaySchema = require("jayschema");
  var js = new JaySchema();
  var instance = req.body;

  js.validate(instance, schema, function (errs) {
    if (errs) {
      console.error(errs);
      res.status(400).send(errs);
    }
  });

  if (req.body.id) {
    res.status(400).send("ID cannot be submmited");
  }
}

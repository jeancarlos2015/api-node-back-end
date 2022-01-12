module.exports = function (app, db) {
  // Load products by ID: http://localhost:4300/api/product/id/$id
  // example: http://localhost:4300/api/product/id/15
  app.get("/api/contato/id/:serial", (req, res) => {
    processData(
      res,
      "SELECT * FROM Contato where serial == " + req.params.serial
    );
  });

  // Load products by attribute: http://localhost:4300/api/product/$attribute/$name
  // example: http://localhost:4300/api/product/price/24
  //          http://localhost:4300/api/product/name/Suntone
  // $attribute = ['name', 'price', 'currency', 'description']*
  // * this is not checked values, wrong parameters will return in a DB error.
  app.get("/api/contato/:attribute/:name", (req, res) => {
    processData(
      res,
      "SELECT * FROM contato where " +
        req.params.attribute +
        " = '" +
        req.params.name +
        "'"
    );
  });

  // Load all products: http://localhost:4300/api/product/
  app.get("/api/contatos", (req, res) => {
    processData(
      res,
      `SELECT 
        c.nome, 
        c.serial, 
        c.telefone,
        c.data, 
        c.cor,
        O.nome as operadora, 
        O.codoperadora,
        O.categoria 
        FROM Contato C
      INNER JOIN Operadora O on O.codoperadora = C.codoperadora`
    );
  });

  // Load products: http://localhost:4300/api/product/sort/$attribute
  // example: http://localhost:4300/api/product/sort/price
  //          http://localhost:4300/api/product/sort/name
  // $attribute = ['name', 'price', 'currency', 'description']*
  app.get("/api/contato/sort/:way", (req, res) => {
    processData(res, "SELECT * FROM contato order by " + req.params.way);
  });

  // Load products: http://localhost:4300/api/product/sort/$direction/$attribute
  // example: http://localhost:4300/api/product/sort/asc/price
  //          http://localhost:4300/api/product/sort/desc/price
  // $attribute = ['name', 'price', 'currency', 'description']*
  // $direction [ASC or DESC]C]*
  // * the direction is checked and when wrong will return a 401 business error.
  app.get("/api/contato/sort/:direction/:way", (req, res) => {
    var way = req.params.way;
    var direction = req.params.direction;

    if (direction !== "asc" && direction !== "desc") {
      res.status(404).send("Sorting serial invalid!");
    }

    processData(res, "SELECT * FROM contato order by " + way + " " + direction);
  });

  function processData(res, sql) {
    db.serialize(function () {
      db.all(sql, function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else sendData(res, rows, err);
      });
    });
  }

  function sendData(res, data, err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const registros = data.map((row) => {
      return {
        serial: row.serial,
        nome: row.nome,
        telefone: row.telefone,
        data: row.data,
        cor: row.cor,
        operadora: {
          nome: row.operadora,
          codoperadora: row.codoperadora,
          categoria: row.categoria,
        },
      };
    });
    res.send(registros);
    // if (data[0]) res.send({
    //   serial: data[0].serial,
    //   nome: data[0].nome,
    //   telefone: data[0].telefone,
    //   data: data[0].data,
    //   cor: data[0].cor,
    //   operadora: {
    //     nome: data[0].operadora,
    //     codoperadora: data[0].codoperadora,
    //     categoria: data[0].categoria
    //   }

    // });
    // else {
    //   res.status(404).send("Contato not found");
    // }
  }
};

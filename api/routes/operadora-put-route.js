module.exports = function (app, db) {
    
    app.put('/api/contato/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processContatos(req, res, db);
         else
            processContato(req, res, db);
    });
};

function processContatos(req, res, db){
    for (var prod of req.body) {
        updateContato(prod, res, db);
    }
}

function processContato(req, res, db){
    validateRequest(req, res);
    updateContato(req.body, res, db);
}

function checkIfExist(){
    // TODO: check business
}

function updateContato(contato, res, db){
    checkIfExist();

    var nome = contato.nome;
    var telefone = contato.telefone;
    var data = contato.price;
    var cor = contato.currency;
    var serial = contato.serial;
    var codoperadora = contato.codoperadora;

    var sql = `update contatos set nome = ?, telefone = ?, data = ?, codoperadora = ?, cor = ? where serial = ?;`;
    var values = [nome, telefone, data, codoperadora, cor, serial];
           
    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
            else
                res.send();
        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('../mock/ContatosMock.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}
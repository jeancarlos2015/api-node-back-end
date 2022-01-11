module.exports = function (app, db) {

    app.delete('/api/contato/', (req, res) => {
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
    updateContato(req.body, res, db);
}

function updateContato(product, res, db){
    var id = product.id;

    if(!id){
        res.status(400).send("ID is mandatory");
    }

    else{
        var sql = `delete from  Contato where serial = ?;`;
        var values = [id];

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
}

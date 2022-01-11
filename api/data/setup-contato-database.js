var fs = require('fs');
var sqlSchema = fs.readFileSync('api/data/Contato-schema.sql').toString();

module.exports = function(db) {
    db.serialize(function() {
        db.run(sqlSchema);
    });
};
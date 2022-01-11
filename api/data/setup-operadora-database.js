var fs = require('fs');
var sqlSchema = fs.readFileSync('api/data/Operadora-schema.sql').toString();

module.exports = function(db) {
    db.serialize(function() {
        db.run(sqlSchema);
    });
};
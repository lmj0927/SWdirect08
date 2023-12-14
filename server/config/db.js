var mysql = require('mysql2');

var db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '0000',
    database: 'TEAMING'
});
db.connect();

module.exports = db;

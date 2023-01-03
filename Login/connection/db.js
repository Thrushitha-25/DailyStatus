const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'xelpmoc',
  password: 'password'
});
connection.connect();
module.exports = connection;
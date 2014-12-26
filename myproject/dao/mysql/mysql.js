var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'a1016114218',
    port: 3306
});
conn.connect();
conn.query('select * from job', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0]);
});
conn.end();
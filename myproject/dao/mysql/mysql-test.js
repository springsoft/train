var Client = require('D:/WWW/train/myproject/node_modules/mysql').Client();

client = new Client();

client.host = 'localhost';
client.port = 3306;
client.user = 'root';
client.password = 'root';
client.database = 'a1016114218';

query(client);

function query(client) {
    client.query(
         'select * from job',
         function (err, res, fields) {
             console.log(res);
             client.end();
         }
     );
};  
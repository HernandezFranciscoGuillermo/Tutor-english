var mysql          = require('mysql');

exports.connection = function() {

    return  mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password : 'alpha1sw',
                  database : 'tutor_app'
            });
}
exports.genero = function (req, res, callback) {

    var stm  = "SELECT * from genero";
    var data = [];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, genero: rows[i].genero};
                data.push(dataObj);
            }

            callback({generos:data});
        });
    });
};
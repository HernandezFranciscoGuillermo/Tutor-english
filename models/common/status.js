exports.userStatus = function (req, res, callback) {
    var stm = "SELECT * from status";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, tipo: rows[i].status};
                data.push(dataObj);
            }
           // obj = {status:data};

            callback({"status":data});
        });
    });
};
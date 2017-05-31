exports.userType = function (req, res, callback) {
    var stm = "SELECT * from user_type";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {
            
            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {
                    
                    id:   rows[i].id, 
                    tipo: rows[i].tipo
                };
                data.push(dataObj);
            }
            
            callback({usertypes:data});
        });
    });
};
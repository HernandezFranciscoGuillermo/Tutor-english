exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT users.id, users.email, users.username, user_type.tipo, status.status, genero.genero FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, email: rows[i].email, username:rows[i].username, user_type:rows[i].tipo, genero:rows[i].genero, status:rows[i].status};
                data.push(dataObj);
            }

            hbs.registerHelper('table_users', function (data) {

                var str  = '<table class="table table-bordered">';
                    str +='<thead>'+
                        '<tr>'+
                        '<th>id</th>'+
                        '<th>email</th>'+
                        '<th>username</th>'+
                        '<th>user_type</th>'+
                        '<th>genero</th>'+
                        '<th>status</th>'+
                        '</tr>'+
                        '</thead>';
                for (var i = 0; i < data.length; i++ ) {
                    str += '<tr>';

                    for (var key in data[i]) {
                        str += '<td>' + data[i][key] + '</td>';
                    };
                    str += '</tr>';
                };
                str += '</table>';

                return new hbs.SafeString (str);
            });
        });
    });
};

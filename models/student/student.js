exports.student = function (req, res, moment,callback) {
    var stm = "SELECT estudiantes.id, estudiantes.nombre, estudiantes.apellido, estudiantes.username, estudiantes.userimag, estudiantes.edad, status.status, genero.genero, estudiantes.creacion, estudiantes.modificacion FROM estudiantes, status, genero WHERE estudiantes.status_id = status.id AND estudiantes.genero_id = genero.id";
    var data =[];
    moment.lang("es");
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {

                    id:           rows[i].id,
                    nombre:       rows[i].nombre,
                    apellido:     rows[i].apellido,
                    username:     rows[i].username,
                    userimag:     rows[i].userimag,
                    edad:         rows[i].edad +' años',
                    genero:       rows[i].genero,
                    status:       rows[i].status,
                    creacion:     moment(rows[i].creacion).format('LLL'),
                    modificacion: moment(rows[i].modificacion).format('LLL')
                };
                data.push(dataObj);
            }

            callback({students:data});
        });
    });
};
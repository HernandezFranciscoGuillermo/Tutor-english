exports.searchById = function (req, res, callback) {

    var id = req.query['temaId'];
    var stm  = "SELECT i.id, e.descripcion, i.pregunta, i.respuesta FROM item as i, examen as e WHERE i.examen_id = ?";
    var data = [];

    req.getConnection(function (errs, connection) {
        connection.query(stm, [id], function(err, rows, fields) {

            var size = rows.length;
            var data = [];
            dataObj  = {};
            if(size > 0 ){
                for(i=0; i< size; i++){

                    dataObj = {

                        id:            rows[i].id,
                        descripcion:   rows[i].descripcion,
                        pregunta:       rows[i].pregunta,
                        pronunciacion: rows[i].pronunciacion,
                        tema:          rows[i].tema,
                        creacion:      rows[i].creacion,
                        modificacion:  rows[i].modificacion
                    };

                    data.push(dataObj);
                    callback({Options:data});
                }

                //data.push(dataObj);

            }else {

                dataObj = {

                    id:            '-1',
                    descripcion:   'no existe',
                    pregunta:      'no existepregunta',
                    pronunciacion: 'pronuciacion',
                    tema:          'aun no relacionado',
                    creacion:      'nunca',
                    modificacion:  'nunca'
                };
                data.push(dataObj);
                callback({Options:data});
            }

        });
    });
};

var kindOf = require('kind-of');

exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){

            var insert = {
                pregunta: temp.pregunta,
                respuesta:(kindOf(temp.respuesta) == 'array')? formater(temp.respuesta):temp.respuesta,
                examen_id:temp.examen
            };

            connection.query("INSERT INTO item set ? ", insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nuevo item se ha creado");
            });

        }else {

        }
    });
};

function formater(array) {
    return array.join(', ')
}

function deformater(array){

    if (array.match('[,]')) {

        return array.split(/[,]+/);
    }

    return 'err';
}
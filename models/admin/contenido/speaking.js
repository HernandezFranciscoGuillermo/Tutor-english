var moment = require('moment');
    moment.locale("es");

exports.getSpeaking = function (req, res, callback) {
 
    var stm = "SELECT p.id, p.descripcion, p.palabra, p.pronunciacion, temas.tema, p.creacion, p.modificacion FROM pronunciacion as p, temas WHERE p.temas_id = temas.id;";
    var data        = [];
    var speaking    = [];
    var speakingobj = {};


    req.getConnection(function (errs, connection) {
        try {
            connection.query(stm, function(err, rows, fields) {
                if (errs){
                    data = {message:"error"};
                    res.end(JSON.stringify(data));
                }

                var size = rows.length;

                if(size === 0){

                    data = {message:"data not found"};
                    res.end(JSON.stringify(data));

                }else{

                    for(i=0; i< size; i++){
                        speakingobj = {
                            id:            rows[i].id,
                            descripcion:   rows[i].descripcion,
                            palabra:       rows[i].palabra,
                            pronunciacion: rows[i].pronunciacion,
                            tema:          rows[i].tema,
                            creacion:      moment(rows[i].creacion).fromNow(),
							modificacion:  moment(rows[i].modificacion).fromNow()
                        };

                        speaking.push(speakingobj);
                    }

                    callback({speaking:speaking});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};


exports.searchById = function (req, res, callback) {

    //entities = new Entities();
    //var id = entities.encode(req.params.id);
    var id = req.query['temaId'];
    //var id =1;
    var stm  = "SELECT p.id, p.descripcion, p.palabra, p.pronunciacion, temas.tema, p.creacion, p.modificacion FROM pronunciacion as p, temas WHERE p.temas_id = temas.id AND p.temas_id = ?";
    var data =[];
 
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
                        palabra:       rows[i].palabra,
                        pronunciacion: rows[i].pronunciacion,
                        tema:          rows[i].tema,
                        creacion:      moment(rows[i].creacion).fromNow(),
                        modificacion:  moment(rows[i].modificacion).fromNow()
                    };
                    
                    data.push(dataObj);
                }

                //data.push(dataObj);

            }else {

                dataObj = {

                    id:           '-1',
                    descripcion:  'no existe',
                    palabra:       'palabra',
                    pronunciacion: 'pronuciacion',
                    tema:         'aun no relacionado',
                    creacion:     'nunca',
                    modificacion: 'nunca'
                };
                data.push(dataObj);
            }

            callback({speaking:data});
        });
    });
};

exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){

            var insert = {
                descripcion:   temp.descripcion,
                palabra:       temp.palabra,
                pronunciacion: temp.pronunciacion,
                temas_id:      temp.temas
            };

            connection.query("INSERT INTO pronunciacion set ? ",insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nueva speaking creado");
            });

        }else {

        }
    });
};
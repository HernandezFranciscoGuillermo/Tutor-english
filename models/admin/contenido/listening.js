var moment = require('moment');
    moment.locale("es");

exports.getListening = function (req, res, callback) {

    var stm = "SELECT listening.id, listening.descripcion, listening.audio, temas.tema, listening.creacion, listening.modificacion FROM listening, temas WHERE listening.temas_id = temas.id;";
    var data          = [];
    var listening      = [];
    var listeningobj   = {};


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
                        listeningobj = {
                            id:           rows[i].id,
                            descripcion:  rows[i].descripcion,
                            audio:        req.app.locals.appUrl + '/assets/sound?resource=' + rows[i].audio,
                            tema:         rows[i].tema,
                            creacion:     rows[i].creacion,
                            modificacion: rows[i].modificacion
                        };

                        listening.push(listeningobj);
                    }

                    callback({listening:listening});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};
//SELECT ejemplos.id, ejemplos.descripcion, ejemplos.ejemplos, temas.tema, ejemplos.creacion, ejemplos.modificacion FROM ejemplos, temas WHERE ejemplos.temas_id = temas.id ?

exports.searchById = function (req, res, callback) {

    //entities = new Entities();
    //var id = entities.encode(req.params.id);
    var id = req.query['temaId'];
    //var id =1;
    var stm  = "SELECT listening.id, listening.descripcion, listening.audio, temas.tema, listening.creacion, listening.modificacion FROM listening, temas WHERE listening.temas_id = temas.id AND listening.temas_id = ?;";
    var data =[];
    
    req.getConnection(function (errs, connection) {
        connection.query(stm, [id], function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            var data = [];
            if(size > 0 ){

                for(i=0; i< size; i++){

                    dataObj = {

                        id:           rows[i].id,
                        descripcion:  rows[i].descripcion,
                        audio:        req.app.locals.appUrl + '/assets/sound?resource=' + rows[i].audio,
                        tema:         rows[i].tema,
                        creacion:     moment(rows[i].creacion).fromNow(),
                        modificacion: moment(rows[i].modificacion)
                    };
					data.push(dataObj);
                }
                
            }else {
                dataObj = {

                    id:           '-1',
                    descripcion:  'no existe',
                    audio:         req.app.locals.appUrl + '/assets/sound?resource=error.mp3',
                    tema:         'aun no creado',
                    creacion:     'nunca',
                    modificacion: 'nunca'
                };
                data.push(dataObj);
            }

            callback({listening:data});
        });
    });

};

exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){

            var insert = {
                descripcion: temp.descripcion,
                audio:temp.audioFile,
                temas_id:temp.temas
            };

            connection.query("INSERT INTO listening set ? ", insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nuevo listening creado");
            });

        }else {

        }
    });
};
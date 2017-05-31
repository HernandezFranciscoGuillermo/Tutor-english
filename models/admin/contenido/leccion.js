exports.getLeccion = function (req, res, callback) {
    // moment.lang("es");

    var stm = "SELECT leccion.id, leccion.descripcion, leccion.leccion, temas.tema, leccion.creacion, leccion.modificacion FROM leccion, temas WHERE leccion.temas_id = temas.id;";
    var data         = [];
    var leccion      = [];
    var leccionobj   = {};


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
                        leccionobj = {
                            id:           rows[i].id,
                            descripcion:  rows[i].descripcion,
                            leccion:      req.app.locals.appUrl + '/assets/markdown?resource=lecciones/' + rows[i].leccion.concat('.md'),
                            tema:         rows[i].tema,
                            creacion:     rows[i].creacion,
                            modificacion: rows[i].modificacion
                        };

                        leccion.push(leccionobj);
                    }

                    callback({lecciones:leccion});
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
    var stm  = "SELECT leccion.id, leccion.descripcion, leccion.leccion, temas.tema, leccion.creacion, leccion.modificacion FROM leccion, temas WHERE leccion.temas_id = temas.id AND leccion. temas_id = ?";
    var data =[];
    //moment.lang("es");
    req.getConnection(function (errs, connection) {
        connection.query(stm, [id], function(err, rows, fields) {

            var size = rows.length;
            var data = [];
            dataObj  = {};
            if(size > 0 ){
                for(i=0; i< size; i++){

                    dataObj = {

                        id:           rows[i].id,
                        descripcion:  rows[i].descripcion,
                        leccion:      req.app.locals.appUrl + '/assets/markdown?resource=lecciones/' + rows[i].leccion.concat('.md'),
                        tema:         rows[i].tema,
                        creacion:     rows[i].creacion,
                        modificacion: rows[i].modificacion
                    };
                }
                data.push(dataObj);
            }else {
                dataObj = {

                    id:           '-1',
                    descripcion:  'no existe',
                    leccion:      req.app.locals.appUrl + '/assets/markdown?resource=' +'no_se_ha_creado.md',
                    tema:         'aun no creado',
                    creacion:     'nunca',
                    modificacion: 'nunca'
                };
                data.push(dataObj);
            }

            callback({lecciones:data});
        });
    });
};


exports.save = function (req, res, nombre, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));
    var lecc = JSON.parse(JSON.stringify(nombre));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){
            
            var insert = {
                descripcion: temp.descripcion,
                leccion:lecc,
                temas_id:temp.temas
            };

            connection.query("INSERT INTO leccion set ? ",insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nueva categoria creada");
            });

        }else {

        }
    });
};
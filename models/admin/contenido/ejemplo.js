exports.getEjemplos = function (req, res, callback) {
    // moment.lang("es");

    var stm = "SELECT ejemplos.id, ejemplos.descripcion, ejemplos.ejemplo, temas.tema, ejemplos.creacion, ejemplos.modificacion FROM ejemplos, temas WHERE ejemplos.temas_id = temas.id;";
    var data          = [];
    var ejemplos      = [];
    var ejemplosobj   = {};


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
                        ejemplosobj = {
                            id:           rows[i].id,
                            descripcion:  rows[i].descripcion,
                            ejemplos:     req.app.locals.appUrl + '/assets/markdown?resource=ejemplos/' + rows[i].ejemplo.concat('.md'),
                            tema:         rows[i].tema,
                            creacion:     rows[i].creacion,
                            modificacion: rows[i].modificacion
                        };

                        ejemplos.push(ejemplosobj);
                    }

                    callback({ejemplos:ejemplos});
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
    var stm  = "SELECT ejemplos.id, ejemplos.descripcion, ejemplos.ejemplo, temas.tema, ejemplos.creacion, ejemplos.modificacion FROM ejemplos, temas WHERE ejemplos.temas_id = temas.id AND ejemplos.temas_id = ?;";
    var data =[];
    //moment.lang("es");
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
                        ejemplos:     req.app.locals.appUrl + '/assets/markdown?resource=ejemplos/' + rows[i].ejemplo.concat('.md'),
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
                    ejemplos:      req.app.locals.appUrl + '/assets/markdown?resource=' + 'no_se_ha_creado.md',
                    tema:         'aun no creado',
                    creacion:     'nunca',
                    modificacion: 'nunca'
                };
				data.push(dataObj);
            }

            callback({ejemplos:data});
        });
    });

};


exports.save = function (req, res, nombre, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));
    var ejem = JSON.parse(JSON.stringify(nombre));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){
            
            var insert = {
                descripcion: temp.descripcion,
                ejemplo:ejem,
                temas_id:temp.temas
            };

            connection.query("INSERT INTO ejemplos set ? ",insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nuevo ejemplo creado");
            });

        }else {

        }
    });
};

exports.delete = function(){
	
};
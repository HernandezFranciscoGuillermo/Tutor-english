exports.getTemas = function (req, res, moment, callback) {

    moment.lang("es");

    var stm = "SELECT temas.id, temas.tema, temas.img, categoria.categoria, temas.creacion, temas.modificacion FROM temas, categoria WHERE temas.categoria_id = categoria.id; ";
    var data     = [];
    var temas    = [];
    var temasobj = {};

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
                        temasobj = {

                            id:           rows[i].id,
                            tema:         rows[i].tema,
                            tipo:         rows[i].categoria,
                            img:          rows[i].img,
                            creacion:     moment(rows[i].creacion).format('LLL'),
                            modificacion: moment(rows[i].modificacion).format('LLL')
                        };
                        
                        temas.push(temasobj);
                    }

                    callback({temas:temas});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};
/*
exports.getByIdTemas = function (req, res, moment, Entities, callback) {
    //var stm = "SELECT temas.id, temas.tema, temas.img, categoria.categoria, temas.creacion, temas.modificacion FROM temas, categoria WHERE temas.categoria_id = categoria.id; ";
    entities = new Entities();
    var stm = "SELECT users.id, users.email, users.username, userimg, user_type.tipo, status.status, genero.genero, users.creacion, users.modificacion FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id AND users.username like '%" + entities.encode(req.query.id) + "%'";

    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

        });
    });
};*/
exports.getCategoria = function (req, res, moment, callback) {
   // moment.lang("es");

    var stm = "SELECT categoria.categoria, categoria.creacion, categoria.descripcion, categoria.modificacion FROM categoria;";
    var data     = [];
    var categorias    = [];
    var categoriaobj = {};

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
                        categoriaobj = {
                            
                            categoria:    rows[i].categoria,
                            descripcion:  rows[i].descripcion,
                            creacion:     moment(rows[i].creacion).format('LLL'),
                            modificacion: moment(rows[i].modificacion).format('LLL')
                        };

                        categorias.push(categoriaobj);
                    }

                    callback({categoria:categorias});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};

//SELECT categoria.categoria, categoria.creacion, categoria.modificacion FROM categoria WHERE categoria.id = ?
exports.search = function (req, res, moment, Entities, callback) {
    // moment.lang("es");
    entities = new Entities();
   // var stm = "SELECT users.id, users.email, users.username, userimg, user_type.tipo, status.status, genero.genero, users.creacion, users.modificacion FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id AND users.username like '%" + entities.encode(req.query.username) + "%'";
    var stm = "SELECT categoria.categoria, categoria.descripcion, categoria.creacion, categoria.modificacion FROM categoria WHERE categoria.categoria like'%" + entities.encode(req.query.categoria) + "%'";
    var data     = [];
    var categorias    = [];
    var categoriaobj = {};

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
                        categoriaobj = {

                            categoria:    rows[i].categoria,
                            creacion:     moment(rows[i].creacion).format('LLL'),
                            modificacion: moment(rows[i].modificacion).format('LLL')
                        };

                        categorias.push(categoriaobj);
                    }

                    callback({categoria:categorias});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};

exports.save = function (req, res, fn) {
    
    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (errs, connection) {
        
        if(temp.user_id == null){

            var insert = {
                categoria:     temp.nombre,
                descripcion:   temp.descripcion
            };

            connection.query("INSERT INTO categoria set ? ",insert, function(err, rows)
            {

                if (err)
                    return fn(false, err);

                return fn(true,"Nueva categoria creada");
            });

        }else {

        }
    });
};
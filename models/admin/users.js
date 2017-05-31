exports.users = function (req, res, moment,callback) {
    var stm = "SELECT users.id, users.nombre, users.apellido, users.email, users.username, user_type.tipo, status.status, genero.genero, users.creacion, users.modificacion FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id";
    var data =[];
    moment.locale("es");
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {
            
            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {

                    id:rows[i].id,
                    nombre: rows[i].nombre,
                    apellido:rows[i].apellido,
                    email: rows[i].email,
                    username:rows[i].username,
                    //userimg:rows[i].userimg,
                    user_type:rows[i].tipo,
                    genero:rows[i].genero,
                    status:rows[i].status,
                    creacion:moment(rows[i].creacion).format('LLL'),
                    modificacion:moment(rows[i].modificacion).format('LLL')
                };
                data.push(dataObj);
            }
            
            callback({users:data});
        });
    });
};

exports.save = function (req, hash, Entities, fn) {
    entities = new Entities();
    var temp = JSON.parse(JSON.stringify(req.body));
    //set password = temp.username
    hash(temp.password, function(err, salt_it, hash_it){

        if (err) throw err;

        req.getConnection(function (err, connection) {

            if(temp.user_id == null){
                var insert = {
                    nombre:         temp.nombre,
                    apellido:       temp.apellido,
                    email:          temp.email,
                    username:       temp.username,
                    userimg:        temp.excerptImage,
                    user_type_id:   temp.userTypes,
                    genero_id:      temp.genero,
                    password_salt:  salt_it,
                    password_hash:  hash_it,
                    status_id:      temp.status
                };

                connection.query("INSERT INTO users set ? ",insert, function(err, rows)
                {

                    if (err)
                        return fn(false,err);

                    return fn(true," New user created");
                });

            }else{

                var update;
                if(temp.password!=''){ //if password is filled

                    update = {
                        email:temp.email,
                        username:temp.username,
                        userimg:temp.userimg,
                        user_type_id:temp.userTypes,
                        genero_id:temp.genero,
                        password_salt:salt_it,
                        password_hash:hash_it,
                        status:temp.status
                    };

                }else{

                    update = {
                        email:temp.email,
                        username:temp.username,
                        userimg:temp.userimg,
                        user_type_id:temp.userTypes,
                        genero_id:temp.genero,
                        status:temp.status
                    };
                }
                connection.query("UPDATE users set ? WHERE id = ? ",[update,temp.user_id], function(err, rows)
                {

                    if (err)
                        return fn(false,err);

                    return fn(true," user Updated");
                });
            }
        });
    }); //end of hash
};

exports.search = function (req, res, moment, Entities, callback) {

    entities = new Entities();
    var stm = "SELECT users.id, users.nombre, users.apellido, users.email, users.username, userimg, user_type.tipo, status.status, genero.genero, users.genero_id users.creacion, users.modificacion FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id AND users.username like '%" + entities.encode(req.query.username) + "%'";
    var data =[];
    moment.locale("es");
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {

                    id:rows[i].id,
					nombre:   rows[i].nombre,
                    apellido: rows[i].apellido,
                    email: rows[i].email,
                    username:rows[i].username,
                    userimg:rows[i].userimg,
                    user_type:rows[i].tipo,
                    genero:rows[i].genero,
                    generoid:rows[i].genero_id,
                    status:rows[i].status,
                    creacion:moment(rows[i].creacion).format('LLL'),
                    modificacion:moment(rows[i].modificacion).format('LLL')
                };
                data.push(dataObj);
            }

            callback({users:data});
        });
    });
};


exports.searchById = function (req, res, moment, Entities, callback) {

    entities = new Entities();
    var id = entities.encode(req.params.id);
    var stm = "SELECT users.id, users.nombre, users.apellido, users.email, users.username, user_type.tipo,  status.status, genero.genero, users.genero_id, users.status_id, users.user_type_id, users.creacion, users.modificacion FROM users, user_type, status, genero WHERE users.user_type_id = user_type.id AND users.status_id = status.id AND users.genero_id = genero.id AND users.id = ? ";
    var data =[];
    moment.locale("es");
    req.getConnection(function (errs, connection) {
        connection.query(stm, [id], function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {

                    id:rows[i].id,
					nombre:   rows[i].nombre,
                    apellido: rows[i].apellido,
                    email: rows[i].email,
                    username:rows[i].username,
                    //userimg:rows[i].userimg,
                    user_type:rows[i].tipo,
                    genero:rows[i].genero,
                    generoid:rows[i].genero_id,
                    status:rows[i].status,
                    statusid:rows[i].status_id,
                    usertypeid:rows[i].user_type_id,
                    creacion:moment(rows[i].creacion).format('LLL'),
                    modificacion:moment(rows[i].modificacion).format('LLL')
                };
            }

            callback(dataObj);
        });
    });
};

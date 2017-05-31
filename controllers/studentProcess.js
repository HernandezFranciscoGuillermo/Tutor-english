
/**
 *	Recuperacion de los datos
 * @param req
 * @param done
 */

function fetch_user(req, done){
var stm = "SELECT * FROM estudiantes WHERE ??  = ? ";
     req.getConnection(function (err, connection) {  

        var query = connection.query(stm, ['username', req.body.username], function(err, rows, fields){
            
            if (err){
            	console.log("Error %s", err);
            	done(false);  

            }else{
            
	            if(rows.length  > 0)   
	              done(rows); 
	            else 
	            	done(false);           	
            }
        });
     });
}

/**
 * Autenticacion
 * @param req
 * @param hash
 * @param fn
 */

function authenticate(req,hash, fn) {
	
 	 if(!module.parent) 
  		console.log('authenticating %s:%s', req.body.username, req.body.password);
  	
    fetch_user(req, function(jsonData) {
        
        if(!jsonData)
            return fn(false, 'Actualmente no esta registrado');
            
        if(jsonData[0].status_id ==1){
			if(jsonData[0].username==req.body.username){

				/*From database*/
				var password_salt =  jsonData[0].password_salt;
				var password_hash =  jsonData[0].password_hash;
				hash(req.body.password,password_salt, function(err, hash_pass){

					if (err) {

						console.log(err);
						return fn(false);
					}

					if(password_hash == hash_pass){ //check if the hash is the same

						var arr_ret = new Array();
						var obj = {};
						obj['username'] = jsonData[0].username;
						obj['user_id']  = jsonData[0].id;
						obj['nombre']	= jsonData[0].nombre;
						obj['apellido'] = jsonData[0].apellido;
						obj['edad'] 	= jsonData[0].edad;
						obj['userimg']	= jsonData[0].userimag;
						arr_ret.push(obj);

						//console.log("Password match");
						return fn(arr_ret, 'Inicio de sesion exitoso');

					}else{

						//console.log("Password did not match");
						return fn(false, 'El usuario o la contraseña no coinciden');
					}
				});

			}else{

				console.log("No username match in DB");
				return fn(false, 'No esta registrado');
			}
		}else {
			console.log('estudiante inactivo');
			return fn(false, 'Estudiante inactivo');
		}
    });
}

/**
 *	
 * @param req
 * @param hash
 * @param fn
 */

exports.check = function (req, hash, fn) {

   authenticate(req, hash, function(result, msg){
  	    
     if(!result)
         return fn(false, msg);

	   ///result[0].username;
	   
	   var data = {
		   username:result[0].username,
		   nombre:  result[0].nombre,
		   apellido:result[0].apellido,
		   edad:    result[0].edad,
		   img:     result[0].userimg
	   };
	   
	   return fn(true, msg, data);
  });
};


/**
 *
 * @param req
 * @param hash
 * @param fn
 */

exports.seeding = function(req,hash,fn){
	// nombre, apellido, username, edad,
	var users = {
		tj: { nombre:'Bernardo Wii', apellido:'Hess Holden', username:'Bernardo', edad:12, status_id:2, genero_id:6 }  // set username
	};

	hash('hello', function(err, salt, hash){

		if (err) throw err;
		users.tj.salt = salt;
		users.tj.hash = hash;

		/*Seeding db*/
		req.getConnection(function (err, connection) {

			var exape = {
				nombre:users.tj.nombre,
				apellido:users.tj.apellido,
				username:users.tj.username,
				edad:users.tj.edad,
				password_salt:users.tj.salt,
				password_hash:users.tj.hash,
				status_id:users.tj.status_id,
				genero_id:users.tj.genero_id

			};

			connection.query("INSERT INTO estudiantes set ? ",exape, function(err, rows){

				if (err) {

					return fn(false,err);

				}else{
					return fn(true," Seeding's done");
				}
			});
		});
	}); //end of hash
};

exports.save = function (req, hash, fn) {

	var temp = JSON.parse(JSON.stringify(req.body));

	hash(temp.password, function(err, salt_it, hash_it){

		if (err) throw err;

		req.getConnection(function (err, connection) {

			if(temp.id == null){
				var insert = {
					nombre:         temp.nombre,
					apellido:       temp.apellido,
					username:       temp.username,
					email:          temp.email,
					edad: 			temp.edad,
					genero_id:      temp.genero,
					password_salt:  salt_it,
					password_hash:  hash_it,
					status_id:      1
				};

				connection.query("INSERT INTO estudiantes set ? ",insert, function(err, rows)
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

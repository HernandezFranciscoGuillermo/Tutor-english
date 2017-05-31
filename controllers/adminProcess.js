function fetch_user(req, done){
var stm = "SELECT * FROM users WHERE ??  = ? ";
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
        
        //in case we want ro print te raw sql
        //console.log(query.sql);        
     });
}


function acceso(req, ip, ua, id){
	req.getConnection(function (err, connection) {
		
		var insert = {
		  ip:ip.address(),
		  so:ua.os,
		  dispositivo:(ua.isMobile) ? 'smartphone': 'computadora',
		  platform:ua.platform,
		  browser:ua.browser,
		  version:ua.version,
		  users_id:id
		}	

        connection.query("INSERT INTO acceso set ? ",insert, function(err, rows){

            if (err)
                console.log('error')

            console.log('created');
		});
	});
	//console.log(insert);
	//console.log(ip.address());
	///console.log(req.body);
	//console.log(id);
}

/*Authenticate the Password*/
function authenticate(req, hash, fn) {
	
 	 if(!module.parent) 
  		console.log('authenticating %s:%s', req.body.username, req.body.password);
  	
    fetch_user(req, function(jsonData) {
        
        if(!jsonData)
            return fn(false);
        if(jsonData[0].status_id == 1){
			if(jsonData[0].username == req.body.username){

				/*From database*/
				var password_salt =  jsonData[0].password_salt;
				var password_hash =  jsonData[0].password_hash;
				//var usertype 	  =  jsonData[0].user_type_id;
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
						obj['userimg']  = jsonData[0].userimg;
						obj['usertype'] = jsonData[0].user_type_id;
						obj['estado']   = jsonData[0].status_id;

						arr_ret.push(obj);

						//console.log("Password match");
						return fn(arr_ret);

					}else{

						//console.log("Password did not match");
						return fn(false);
					}
				});

			}else{

				console.log("No username match in DB");
				return fn(false);
			}

		}else{
			console.log("usuario inactivo");
			return fn(false);
		}
    });
}

exports.check = function (req, ip, ua, hash, fn) {

	authenticate(req, hash, function(result){

		if(!result)
			return fn(false);

		req.session.regenerate(function(){

			req.session.username = result[0].username;
			req.session.user_id  = result[0].user_id;
			req.session.userimg  = result[0].userimg;
			req.session.usertype = user(result[0].usertype);
			req.session.estado   = result[0].estado;

			
			acceso(req, ip, ua, result[0].user_id);
			console.log("User { Username :%s , ID : %d } is Logged in",req.session.username,req.session.user_id);
			return fn(true);
		});
	});
};

function user(user) {
	var type = '';
	switch (user){
		case 1:
			type = 'Administrador';
			break;
		case 2:
			type = 'Docente';
			break;
		case 3:
			type = 'Asistente';
			break;
	}
	return type;
}


exports.seeding = function(req,hash,fn){
    
    /*----------------------------------------------
        Set it in Global like this,so it can be accessed
        inside the callback function below
     ------------------------------------------------*/
    var users = {
      tj: {email : "tutor02@local.com", username: 'admin02', user_type_id:1, status_id:2, genero_id:6 }  // set username
    };
    
    //set password = ganjar
    hash('hello', function(err, salt, hash){
    
        if (err) throw err;
         users.tj.salt = salt;
         users.tj.hash = hash;

      
         /*Seeding db*/
         req.getConnection(function (err, connection) {
      
            var exape = {
						email:users.tj.email,
						username:users.tj.username,
						password_salt:users.tj.salt,
						password_hash:users.tj.hash,
						user_type_id:users.tj.user_type_id,
						status_id:users.tj.status_id,
						genero_id:users.tj.genero_id

				};
            connection.query("INSERT INTO users set ? ",exape, function(err, rows){
      
	          if (err) {
	            
	          	  return fn(false,err); 
	          	   
	          }else{
	          	  return fn(true," Seeding's done");
	          }
	        });
        });
    }); //end of hash
};
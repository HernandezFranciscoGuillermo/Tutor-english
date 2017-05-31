var express   = require('express');
var useragent = require('express-useragent');
var router    = express.Router();
var process   = require('./studentProcess');
var hash      = require('../middleware/pass').hash;
var gravatar  = require('gravatar');
var redis     = require("redis");
var jwt       = require('jsonwebtoken');
var ip        = require('ip');
var Isemail   = require('isemail');


var GeneroModel = require('../models/common/genero');


var secret = 'qrhkv7xwHwINYBn2Tii648Zej3RHo1EUtHonPZreuQvtdy/gAfKsnhxVfYsmyxYLeWCPcDR0vAQ9sPywSJ4ZJQ==';

/*router.get('/logout', function (req, res, netx) {

 if(req.jwtSession.id){

 req.jwtSession.update(function(error){
 res.json(req.jwtSession.toJSON());
 });

 }else{
 res.redirect("/student");
 }
 });

 router.get('/seeding',function(req, res){
 process.seeding(req, hash, function(status, msg){

 if(status){
 console.log("Status %s : %s",status, msg);
 res.redirect('/');

 }
 });
 });*/

router.get('/', function(req, res) {
    res.end('hello');
});


/**
 *  Autenticación
 */

router.post('/', function(req, res, next){
    //var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    
   if(username == null || password == null){
	   
	   res.end(JSON.stringify({message:'peticion invalida'}));
       console.log('peticion invalida');
	   
   }
    process.check(req, hash,function(status, msg, data){

         if(status){

             var data = {

                 response:  msg,
                 res:       true,
                 token:     '',
                 grav:      req.app.locals.appUrl + '/img/'+data.img,
                 username:  data.username,
                 nombre:    data.nombre,
                 apellido:  data.apellido,
                 edad:      data.edad
             };



             var token = jwt.sign(data, secret, {
              //expiresIn: 86400 // expires in 24 hours
              expiresIn: 60 // expires in 24 hours
              });

             data.token = token;

             res.header("Content-Type", "application/json; charset=utf-8");
             res.end(JSON.stringify(data));

         }else{

             res.status(401);
             res.end(JSON.stringify({'response': msg,'res':false}));
         }
     });
});

/**
 * Registro
 */

router.post('/register', function (req, res, next) {
    var nombre   = req.body.nombre;
    var apellido = req.body.apellido;
    var username = req.body.username;
    var email    = req.body.email;
    var edad     = req.body.edad;
    var password = req.body.password;
    var genero   = req.body.genero;
	
	console.log(req.body);

    if(nombre == null || apellido == null || username == null || email == null  || edad == null || password == null || genero == null){
        data = {message:"se requiren todos los datos para completar el registro", res:false};
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));

    }else{

        if(nombre.length >= 3 && apellido.length >= 3 && username.length > 4 && edad.match(/([0-9])/) && genero.match(/([0-9])/) && password.length > 5 && Isemail.validate(email)){
           
            process.save(req, hash, function (status, msg) {
				
                if(!status){
					
                    res.header("Content-Type", "application/json; charset=utf-8");                  
                    data = {response:'puede ser que el nombre de usuario o el email ya han sido usados', res:false};
                    res.end(JSON.stringify(data));
					
                }else{
                    
					res.header("Content-Type", "application/json; charset=utf-8");
					res.end(JSON.stringify({response: '', res:true}));
                   
                }
            });

        }else{

            data = {message:"algun dato no cumple con los requerimientos", res:false};
            res.header("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(data));
        }
    }
});

router.post('/chpass', function (req, res, next) {
    var id    = req.body.id;
    var opass = req.body.oldpass;
    var npass = req.body.newpass; 
});

router.post('/modificar',function (req, res, next) {
    res.end('ok');
});

router.get('/genero', function (req, res, next) {
    GeneroModel.genero(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

router.get('/check', function(req, res, next) {
  var source = req.headers['user-agent'],

  ua = useragent.parse(source);
  var acceso ={
	  ip:ip.address(),
	  so:ua.os,
	  dispositivo:(ua.isMobile) ? 'smartphone': 'computadora',
	  platform:ua.platform,
	  browser:ua.browser,
	  version:ua.version
  };
  
  res.end(JSON.stringify(acceso));
});

module.exports = router;

var express      = require('express');
var router       = express.Router();
var csrf         = require('csurf');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var moment       = require('moment');
var Entities     = require('html-entities').AllHtmlEntities;
var process      = require('./adminProcess');
var hash         = require('../middleware/pass').hash;
var form         = require('express-form');
var password     = require('../middleware/password');
var useragent    = require('express-useragent');
var ip           = require('ip');
var ExpressBrute = require('express-brute');
var RedisStore   = require('express-brute-redis');
var wCharacter   = require('is-word-character');
var redis        = require("redis");
var client       = redis.createClient();
var env          = require('node-env-file');


require('connect-flash');
moment.locale("es");
env(__dirname + '/../.env');

var field = form.field;

/**
 * Importar los modelos
 */
var userTypemodel   = require('../models/admin/userType');
var Statusmodel     = require('../models/common/status');
var UsersModel      = require('../models/admin/users');
var temasModel      = require('../models/admin/temas');
var StudentModel    = require('../models/student/student');
var CategoriasModel = require('../models/admin/categorias');
var LeccionModel    = require('../models/admin/contenido/leccion');
var EjemploModel    = require('../models/admin/contenido/ejemplo');
var ListeningModel  = require('../models/admin/contenido/listening');
var ExamenModel     = require('../models/admin/contenido/examen');
var ItemModel       = require('../models/admin/contenido/item');
var SpekingModel    = require('../models/admin/contenido/speaking');

router.use(function(req, res, next){
    res.header('Cache-Control','nocache, no-store, max-age=0, must-revalidate');
    res.header('X-Frame-Options','deny');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Pragma','no-cache');
    res.header('Expires','Fri, 01 Jan 1990 00:00:00 GMT');
    res.header('x-powered-by','Tutor-app');
    res.header('Server','Tutor-app Server');
    //res.header('Access-Control-Expose-Headers','Access-Control-Allow-Origin');
    //res.header('Access-Control-Allow-Origin', '*');//Access-Control-Allow-Origin
    res.header('X-XSS-Protection','1; mode=block');

    next();

});
//console.log(env.data);

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
var store = new RedisStore({

    host:  env.REDIS_HOST,
    port:  env.REDIS_PORT,
    prefix:'brute',
    pass:  env.REDIS_PASSWORD,
    db:    env.REDIS_DB
});

var failCallback = function (req, res, next, nextValidRequestDate) {
    req.flash('error', moment(nextValidRequestDate).fromNow());
    console.log(moment(nextValidRequestDate).fromNow());

    req.session.brute = 'Regrese en ' + moment(nextValidRequestDate).fromNow();
    res.redirect('/admin'); // brute force protection triggered, send them back to the login page
};
var handleStoreError = function (error) {
    log.error(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
};

var userBruteforce = new ExpressBrute(store, {
    freeRetries: 3,
    minWait: 48*60*60*1000, 
    maxWait: 72*60*60*1000, 
    failCallback: failCallback,
    handleStoreError: handleStoreError
});

var globalBruteforce = new ExpressBrute(store, {
    freeRetries: 30,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 12*60*60*1000, 
    maxWait: 24*60*60*1000, 
    lifetime: 24*60*60, 
    failCallback: failCallback,
    handleStoreError: handleStoreError
});

/**
 *  Configuracion del ruteo
 */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
//router.use(cookieParser());


/**
 *  Sembrar registros en la base de datos
 */

router.get('/seeding',function(req, res){
    process.seeding(req, hash, function(status, msg){
    
        if(status){
            console.log("Status %s : %s",status, msg);
            res.redirect('/');
        }
    });
});


/**
 *  Mostrar el login
 */

router.get('/', csrfProtection, function(req,res){
    
    if(req.session.username){
        res.redirect('/admin/manage');
    }else {
        res.render('admin/login', {layout: false, title: 'Login', csrfToken: req.csrfToken(), error:false, warn:(req.session.login_error) ? true : false, brute:(req.session.brute) ? true : false, time:req.session.brute});
    }

    /*if(req.session.brute){
        delete req.session.brute;

    }*/
	
	 if(req.session.brute){
	   res.clearCookie("tutor_app");
   }
});

/**
 *  Recibir la peticion del fornmulario de 
 *  inicio de session
 */

router.post('/login',globalBruteforce.prevent,
    userBruteforce.getMiddleware({
        key: function(req, res, next) {
            // prevent too many attempts for the same username
            next(req.body.username);
        }
    }), parseForm ,csrfProtection, form(field("username").trim().required(), field("password").trim().required()), function(req, res, next){
   
   var source = req.headers['user-agent'],
		   ua = useragent.parse(source);
  
   var username = req.body.username;
   var password = req.body.password;

   if(username == null || password == null){

	   req.session.login_error = 'Invalid username and password';
	   res.status(403);
	   res.redirect('/admin');
	   
   }else{
	   
	   if(username == "" || password == ""){
		   
		   req.session.login_error = 'Invalid username and password';
		   res.status(403);
		   res.redirect('/admin');
		   
	   }else{
		   
			process.check(req, ip, ua, hash, function(status, msg){
        
				if (!req.form.isValid) {
				  
					//res.render('admin/login', {layout: false, title: 'Login', csrfToken: req.csrfToken() , error:true});
					req.session.login_error = 'Invalid username and password';
					res.status(403);
					res.redirect('/admin');
				}

				if(status){
					
					if(req.session.login_error){
						delete req.session.login_error;
						
					}
					//res.redirect('/admin/manage');

                    req.brute.reset(function () {
                        res.redirect('/admin/manage');
                    });

				}else{
					  req.session.login_error = 'Invalid username and password';
					  res.status(403);
					  res.redirect('/admin');
				}
		   }); 
	   }
   }
});



/**
 *  Verifica la autenticacion
 */

router.use(function(req, res, next) {

    if(!req.session.username){
        res.redirect('/admin');
        
    }else{
        next();
    }
});

/**
 *  Panel de administracion
 */
router.get('/manage', function(req, res, next) {
    res.render('admin/dashboard', {layout: 'layouts/admin', title:"Admin", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
});

/**
 *  Logout
 */

router.get('/logout', function(req, res, next){

    req.session.destroy(function(err) {
        if(err) {

            console.log(err);
        } else {

            res.redirect('/admin');
        }
    });
});

/**
 * Todas las rutas de la administracion de la app
 */
require('./admin/usuarios').users(hash, router, csrfProtection, form, field, UsersModel, password, moment, Entities);
require('./admin/estudiantes').estudiantes(router, csrfProtection, form, field, StudentModel, password, moment);
require('./admin/temas').temas(router, temasModel, moment);
require('./admin/categoria').categorias(router, CategoriasModel, moment, Entities);
require('./admin/temas/leccion').leccion(router, LeccionModel, moment, Entities);
require('./admin/temas/ejemplos').ejemplos(router, EjemploModel, moment, Entities);
require('./admin/temas/listening').listening(router, ListeningModel, moment, Entities);
require('./admin/temas/speaking').speaking(router, SpekingModel, moment, Entities, wCharacter);
require('./admin/temas/examen').examen(router, ExamenModel, moment, Entities, wCharacter);
require('./admin/temas/itemExamen').item(router, ItemModel, moment, Entities, wCharacter);
require('./admin/upload').UploadApk(router);

/**
 *  Manejador de errores
 */

router.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403);
  res.render('errors/403', {layout: 'layouts/errors', title: '403', description:"No autorizado"});
});

module.exports = router;

var express        = require('express');
var mysql          = require('mysql');
var router         = express.Router();
var TemasModel     = require('../models/api/api');
var LeccionModel   = require('../models/admin/contenido/leccion');
var EjemploModel   = require('../models/admin/contenido/ejemplo');
var ListeningModel = require('../models/admin/contenido/listening');
var SpeakingModel  = require('../models/admin/contenido/speaking');
var ExamenModel    = require('../models/admin/contenido/examen');
var ItemModel      = require('../models/admin/contenido/item');

router.use(function(req, res, next){
    //res.header('Cache-Control','nocache, no-store, max-age=0, must-revalidate');
    res.header('X-Frame-Options','deny');
    res.header('X-Content-Type-Options', 'nosniff');
    //res.header('Pragma','no-cache');
    //res.header('Expires','Fri, 01 Jan 1990 00:00:00 GMT');
    res.header('x-powered-by','Tutor-app');
    res.header('Server','Tutor-app Server');
    res.header('Access-Control-Expose-Headers','Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Origin', '*');//Access-Control-Allow-Origin
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    res.header('X-XSS-Protection','1; mode=block');
    
    next();

});


var hashing    = require('../middleware/hashModule');
const uuidV4   = require('uuid/v4');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next){
    var token = req.query['token'];

    if (token) {

        if(token.length > 5){
            next();
        }else{
            res.end('Expresion invalida');
        }

    } else {

        return res.status(403).send({
            message: 'No ha proveido el Token de acceso'
        });
    }
});

router.get('/', function(req, res, next) {
    res.end('Soy una API');
});


/**
 * Listar todos los temas
 */
router.get('/temas', function(req, res, next) {
    TemasModel.getTemas(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data)); 
    });
});


/**
 *  Ruta para los temas
 */

router.get('/tema', function (req, res, next) {

    var id = req.query['id'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if(id >0 ){
            res.end('ok');

        }else{

            res.end('expresion invalida');
        }
    }
});

/**
 *  Ruta para una leccion
 */

router.get('/leccion', function (req, res, next) {

    var id = req.query['temaId'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if(id >0 ){

            LeccionModel.searchById(req, res, function (data) {
                res.header("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(data));
            });

        }else{

            res.end('expresion invalida');
        }
    }
});


/**
 *  Ruta para las lecciones
 */

router.get('/lecciones',function (req, res, next) {
    LeccionModel.getLeccion(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

/**
 *  Ruta para un ejemplo
 */

router.get('/ejemplo',function (req, res, next) {
    var id = req.query['temaId'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if(id >0 ){

            EjemploModel.searchById(req, res, function (data) {
                res.header("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(data));
            });

        }else{

            res.end('expresion invalida');
        }
    }
});

/**
 *  Ruta para los ejemplos
 */

router.get('/ejemplos',function (req, res, next) {
    EjemploModel.getEjemplos(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

/**
 *  Ruta para los listening
 */

router.get('/listening',function (req, res, next) {
    var id = req.query['temaId'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if(id >0 ){
            ListeningModel.searchById(req, res, function (data) {
                res.header("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(data));
            });

        }else{
            res.end('expresion invalida');
        }
    }
});


/**
 *  Ruta para los listenings
 */

router.get('/listenings',function (req, res, next) {
    ListeningModel.getListening(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

/**
 *  Ruta para las speaking
 */

router.get('/speaking',function (req, res, next) {

    var id = req.query['temaId'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if( id >0 ){

            SpeakingModel.searchById(req, res, function (data) {
                res.header("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(data));
            });

        }else{
            res.end('expresion invalida');
        }
    }
});


/**
 * Ruta para los speakings
 *
 */

router.get('/speakings',function (req, res, next) {
    SpeakingModel.getSpeaking(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

/**
 *  Ruta para las Examen
 */

router.get('/examen',function (req, res, next) {
    var id = req.query['temaId'];

    if(id == null){
        res.end('expresion invalida');

    }else{

        if(id >0 ){
            ExamenModel.searchById(req, res, function (data) {
                res.header("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(data));
            });

        }else{

            res.end('expresion invalida');
        }
    }
});

/**
 * Ruta para los examenes
 *
 */

router.get('/examenes',function (req, res, next) {
    ExamenModel.getExamen(req, res, function (data) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data));
    });
});

router.post('/quiz/submit', function (req, res, next) {
   res.end('ok');
    console.log(req.body);
});

module.exports = router;
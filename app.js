/**
 *  Importar las librerias
 */
var async        = require('async');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var exlogger     = require('express-logger');
var session      = require('express-session');
var redis        = require('redis').createClient();
var RedisStore   = require('connect-redis')(session);
var MySQLStore   = require('express-mysql-session')(session);
var moment       = require('moment');
var connection   = require('express-myconnection');
var mysql        = require('mysql');
var isWindows    = require('is-windows');
var useragent    = require('express-useragent');
const uuidV4     = require('uuid/v4');
var rfs          = require('rotating-file-stream');
var fs           = require('fs');
var timeout      = require('connect-timeout');
var hbs          = require('express-hbs');
var exphbs       = require('express-handlebars');
var ipAddr       = require('./middleware/ipAdress');
var assert       = require('assert');
var env          = require('node-env-file');
var upload       = require('jquery-file-upload-middleware');
var minifyHTML   = require('express-minify-html');
var redis        = require('redis');
var client       = redis.createClient();
var shell        = require('shelljs');
    handlebars   = require("handlebars-helper-sri").register(hbs);

//app.use(require('express-status-monitor')());
var app = express();
app.set('title', 'Tutor app');//app.get('title');
env(__dirname + '/.env');

/**
 *  Controladores
 */

var api   = require('./controllers/api');
var index = require('./controllers/index');
var users = require('./controllers/users');
var admin = require('./controllers/admin');
var img   = require('./controllers/img');
var stdnt = require('./controllers/student');
var sound = require('./controllers/sound');
var md    = require('./controllers/markdown');
var quiz  = require('./controllers/quiz');
var chat  = require('./controllers/chat');
var apk  = require('./controllers/release');
/**
 *  Configuracion de la aplicacion
 */

app.use(function (req, res, next) {
    res.header('Cache-Control', 'nocache, no-store, max-age=0, must-revalidate');
    res.header('X-Frame-Options', 'deny');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Pragma', 'no-cache');
    //res.header('Expires','Fri, 01 Jan 1990 00:00:00 GMT');
    res.header('x-powered-by', 'Tutor-app');
    res.header('Server', 'Tutor-app Server');
    //res.header('Access-Control-Expose-Headers','Access-Control-Allow-Origin');
    //res.header('Access-Control-Allow-Origin', '*');//Access-Control-Allow-Origin
    res.header('X-XSS-Protection', '1; mode=block');

    next();
});

/**
 *
 */

app.use(function (req, res, next) {
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    }
    else {
        //move on
        next();
    }
});

/**
 *
 */

app.options(function (req, res, next) {
    //res.sendStatus(401);
    //res.end('unauthorized');
    res.dropBody();
    next();
});

/**
 *
 */

app.delete(function (req, res) {
    res.dropBody();
    console.log('auth method called');
});

/**
 *
 */

app.head(function () {
    console.log('auth method called');
});

/**
 *  Configuracion de la base de datos
 */

var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

/**
 *  Conexion a la base de datos
 */

app.use(connection(mysql, options, 'single'));

/**
 *  Configuracion de las vistas
 */

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views'

}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

/**
 *  Helpers
 */

app.use(function (req, res, next) {
    require('./helpers/handlebars/registerHelper').hbsHelpers(hbs);
    require('./helpers/admin/userType').hbsHelper(hbs, req, res);
    require('./helpers/common/status').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarStudiantes').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarUsuarios').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarTemas').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarLecciones').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarCategorias').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarEjemplos').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarListening').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarSpeaking').hbsHelper(hbs, req, res);
    require('./helpers/admin/contar/contarExamenes').hbsHelper(hbs, req, res);
    require('./helpers/common/genero').hbsHelper(hbs, req, res);
    require('./helpers/admin/examenTipo').hbsHelper(hbs, req, res);
    require('./helpers/admin/examen').hbsHelper(hbs, req, res);
    require('./helpers/common/table').hbsHelper(hbs, req, res);
    require('./helpers/admin/categoria').hbsHelper(hbs, req, res);
    require('./helpers/common/tableEditar').hbsHelper(hbs, req, res);
    require('./helpers/admin/temas').hbsHelper(hbs, req, res);
    next();
});


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(logErrors);
app.use(useragent.express());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));
app.use(cookieParser('74849102-f500-41d6-bb2f-d7aa9ea987a5'));

/**
 *  configuracion en la sesion
 */

app.use(session({
    genid: function (req) {
        return uuidV4().concat(uuidV4())
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    name: process.env.SESSION_NAME,
    cookie: {httpOnly: true, secure: false, expires: false},
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        prefix: process.env.REDIS_PREFIX,
        pass: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB

    })
}));

client.auth(process.env.REDIS_PASSWORD, function (err) {
    if (err) throw err;
});

client.on('connect', function () {
    console.log('Connected to Redis');
});

/**
 *
 */

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));


var m = moment();
var date = m.format();
var month = m.month(m.month()).format('MMMM');
var dt = moment(date, "YYYY-MM-DD HH:mm:ss");
var day = dt.format('dddd') + "_" + m.date();

app.use(exlogger({path: "logs/" + date.replace(/:/g, '_') + ".log"}));
//app.use(exlogger({path: "logs/" + month + "/" + day + "/" + date.replace(/:/g,'_') + ".log"}));


/**
 *  rutas
 */

app.use('/', index);
app.use('/api/v1', api);
app.use('/users', users);
app.use('/admin', admin);
app.use('/student', stdnt);
app.use('/assets/img', img);
app.use('/assets/sound', sound);
app.use('/assets/markdown', md);
app.use('/quiz', quiz);
app.use('/chat', chat);
app.use('/app/android', apk);

/**
 *  Configuracion de los directorios
 *  de la app
 */

if (isWindows()) {
    app.locals.app = __dirname + '\\';
    app.locals.tmp = __dirname + '\\tmp\\';
    app.locals.imgfolder = __dirname + '\\uploads\\img\\';
    app.locals.apkfolder = __dirname + '\\uploads\\apk\\';
    app.locals.public = __dirname + '\\public\\';
    app.locals.soundfolder = __dirname + '\\uploads\\sound\\';
    app.locals.markDownFolder = __dirname + '\\uploads\\md\\';
    app.locals.leccionesFiles = __dirname + '\\uploads\\md\\lecciones\\';
    app.locals.ejemplosFiles = __dirname + '\\uploads\\md\\ejemplos\\';

} else {

    app.locals.imgfolder = __dirname + '/uploads/img/';
    app.locals.soundfolder = __dirname + '/uploads/sound/';
    app.locals.markDownFolder = __dirname + '/uploads/md/';
}


var resizeConf = require('./middleware/config/config').resizeVersion;
var dirs       = require('./middleware/config/config').directors;
//var upl        = require('./middleware/imgUpload').imgUpload(upload, resizeConf, dirs);

/**
 *
 * @param file
 * @returns {*}
 */
function fname(file) {
    var result = file.split('.'),
        name = result[0];
    return name;
}

/**
 *
 * @param file
 * @returns {*}
 */
function ftype(file) {
    var result = file.split("."),
        name = result[1];
    return name;
}

app.use('/upload/default', function (req, res, next) {
    upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.default,
        uploadUrl: dirs.default_url,
        imageVersions: resizeConf.default
    })(req, res, next);

    console.log(req.body);
});

app.use('/upload/location', upload.fileHandler({
    tmpDir: dirs.temp,
    uploadDir: __dirname + dirs.location,
    uploadUrl: dirs.location_url,
    imageVersions: resizeConf.location
}));

/**
 * Middleware para subir los audios
 */

app.use('/upload/sound', upload.fileHandler({
    tmpDir: dirs.temp,
    uploadDir: __dirname + dirs.sound,
    uploadUrl: dirs.sound_url
}));

/**
 *
 */

app.use('/upload/img', function (req, res, next) {
    upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.img,
        uploadUrl: dirs.img_url
    })(req, res, next);
});

/**
 *
 */

app.use('/upload/apk', function (req, res, next) {
    upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.apk,
        uploadUrl: dirs.apk_url
    })(req, res, next);

    upload.on('end', function (fileInfo) {
        shell.mv(__dirname + dirs.apk + '/' +fileInfo.name, __dirname + dirs.apk + '/Tutor.apk');
        // //console.log(fileInfo.name);
        // if(ftype(fileInfo.name) == 'apk'){
        //     console.log('is apk');
        //
        // }
    });
});

app.use('/upload/location/list', function (req, res, next) {
    upload.fileManager({
        uploadDir: function () {
            return __dirname + dirs.location;
        },
        uploadUrl: function () {
            return dirs.location_url;
        }
    }).getFiles(function (files) {
        res.json(files);
    });
});


/**
 *  App url
 */
app.locals.appUrl = 'http://' + ipAddr.getIPAddress();

/**
 *
 */
app.use('production', function () {
    app.use(express.errorHandler());
});

/**
 *  manejador de errores 404
 */

app.use(function (req, res, next) {
    //var err = new Error('Not Found');
    //err.status = "404";
    res.status(404);
    res.render('errors/404', {layout: 'layouts/errors', title: '404', description: "No encontrado"});
    //res.render('error');
    //next(err);
});

/**
 *  manejador de errores de el servidor
 */

app.use(function (err, req, res, next) {
    // set locals, only providing error in development production
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === process.env.APP_ENV ? err : {};

    // render the error page
    res.status(err.status || 500);

    if(process.env.APP_ENV == 'production'){

        res.render('errors/500', {layout: 'layouts/errors', title: '500', description: "Error en el servidor"});

    }else{

        res.render('error');
    }

    //next();
});

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

process.env.app = 'node_app';
/*
 app.listen(80,function(){

 //console.log("Running at PORT 80");
 });*/

module.exports = app;
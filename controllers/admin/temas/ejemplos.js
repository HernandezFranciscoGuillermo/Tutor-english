var he     = require('he');
var fs     = require('fs');
var uuidV4 = require('uuid/v4');

exports.ejemplos = function (router, EjemploModel, moment, Entities) {

    /**
     * Buscar
     */
    router.get('/ejemplos/buscar', function (req, res, next) {
        res.render('admin/ejemplos/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/ejemplos/buscar', function (req, res, next) {
        res.render('admin/ejemplos/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/ejemplos/crear', function (req, res, next) {
        res.render('admin/ejemplos/crear', {layout: 'layouts/admin', title:"Crear una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/ejemplos/crear', function (req, res, next) {

        var temas_id = req.body.temas;
        var markdown = req.body.markdown;
        var descrpcn = req.body.descripcion;
        var nombre   = uuidV4();

        if(temas_id == null || markdown == null|| descrpcn == null){
            res.end('error');

        }else{

            if(temas_id.match(/([0-9])/) && markdown.length > 5 && descrpcn.length > 5){


                var dir = req.app.locals.ejemplosFiles;

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                fs.writeFile(dir + nombre.concat('.md'), he.encode(markdown), function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                    res.end('ok');

                    EjemploModel.save(req, res, nombre, function (status, msg) {
                        if(status){
                            console.log(msg);
                            res.end('ok');

                        }else{
                            console.log(msg);
                            res.end('fail');
                        }
                    });
                });

            }else {
                res.end('error');
            }
        }
    });

    /**
     * Editar
     */

    router.get('/ejemplos/editar', function (req, res, next) {
        res.render('admin/ejemplos/editar', {layout: 'layouts/admin', title:"Editar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/ejemplos/editar/:id', function (req, res, next) {
        res.render('admin/ejemplos/editar', {layout: 'layouts/admin', title:"Editar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/ejemplos/editar', function (req, res, next) {
        res.render('admin/ejemplos/editar', {layout: 'layouts/admin', title:"Editar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/ejemplos/eliminar', function (req, res, next) {
        res.render('admin/ejemplos/eliminar', {layout: 'layouts/admin', title:"Eliminar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/ejemplos/eliminar/:id', function (req, res, next) {
        res.render('admin/ejemplos/eliminar', {layout: 'layouts/admin', title:"Eliminar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/ejemplos/eliminar', function (req, res, next) {
        res.render('admin/ejemplos/eliminar', {layout: 'layouts/admin', title:"Eliminar una ejemplos", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
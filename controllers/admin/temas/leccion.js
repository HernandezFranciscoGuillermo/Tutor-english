var he     = require('he');
var fs     = require('fs');
var uuidV4 = require('uuid/v4');

exports.leccion = function (router, LeccionModel,  moment, Entities) {

    /**
     * Buscar
     */
    router.get('/leccion/buscar', function (req, res, next) {
        res.render('admin/leccion/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/leccion/buscar', function (req, res, next) {
        res.render('admin/leccion/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/leccion/crear', function (req, res, next) {
        res.render('admin/leccion/crear', {layout: 'layouts/admin', title:"Crear una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/leccion/crear', function (req, res, next) {
        //console.log(req.body.markdown);
        var temas_id = req.body.temas;
        var markdown = req.body.markdown;
        var descrpcn = req.body.descripcion;
        var nombre   = uuidV4();

        //var nombre   = req.body.nombre;
        console.log(typeof(idTema));

        if(temas_id == null || markdown == null|| descrpcn == null){
            //res.end('parametro(s) invalido(s)');
            res.end('error');

        }else{

            if(temas_id.match(/([0-9])/) && markdown.length > 5 && descrpcn.length > 5 ){

                var dir = req.app.locals.leccionesFiles;

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                fs.writeFile(dir + nombre.concat('.md'), he.encode(markdown), function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");

                    LeccionModel.save(req, res, nombre, function (status, msg) {
                        if(status){
                            console.log(msg);
                            res.end('ok');

                        }else{
                            console.log(msg);
                            res.end('fail');
                        }
                    });
                });

            }else{
                res.end('error');
            }
        }
    });

    /**
     * Editar
     */

    router.get('/leccion/editar', function (req, res, next) {
        res.render('admin/leccion/editar', {layout: 'layouts/admin', title:"Editar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/leccion/editar/:id', function (req, res, next) {
        res.render('admin/leccion/editar', {layout: 'layouts/admin', title:"Editar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/leccion/editar', function (req, res, next) {
        res.render('admin/leccion/editar', {layout: 'layouts/admin', title:"Editar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/leccion/eliminar', function (req, res, next) {
        res.render('admin/leccion/eliminar', {layout: 'layouts/admin', title:"Eliminar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/leccion/eliminar/:id', function (req, res, next) {
        res.render('admin/leccion/eliminar', {layout: 'layouts/admin', title:"Eliminar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/leccion/eliminar', function (req, res, next) {
        res.render('admin/leccion/eliminar', {layout: 'layouts/admin', title:"Eliminar una leccion", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
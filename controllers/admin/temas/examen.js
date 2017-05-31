exports.examen = function (router, ExamenModel, moment, Entities, wCharacter) {

    /**
     * Buscar
     */
    router.get('/examen/buscar', function (req, res, next) {
        res.render('admin/examen/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/examen/buscar', function (req, res, next) {
        res.render('admin/examen/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/examen/crear', function (req, res, next) {
        res.render('admin/examen/crear', {layout: 'layouts/admin', title:"Crear una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/examen/crear', function (req, res, next) {

        var temas = req.body.temas;
        var tipos = req.body.tipos;
        var descr = req.body.descripcion;

        if(temas == null || tipos == null || descr == null){
            res.end('error');

        }else{
            if(temas.match(/([0-9])/)&& tipos.match(/([0-9])/) && wCharacter(descr)){
                //res.end('ok');
                
                ExamenModel.save(req, res, function (status, msg) {
                    if(status){
                        console.log(msg);
                        res.end('ok');

                    }else{
                        console.log(msg);
                        res.end('fail');
                    }
                });
            }else{

                res.end('error');
            }
        }
    });

    /**
     * Editar
     */

    router.get('/examen/editar', function (req, res, next) {
        res.render('admin/examen/editar', {layout: 'layouts/admin', title:"Editar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/examen/editar/:id', function (req, res, next) {
        res.render('admin/examen/editar', {layout: 'layouts/admin', title:"Editar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/examen/editar', function (req, res, next) {
        res.render('admin/examen/editar', {layout: 'layouts/admin', title:"Editar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/examen/eliminar', function (req, res, next) {
        res.render('admin/examen/eliminar', {layout: 'layouts/admin', title:"Eliminar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/examen/eliminar/:id', function (req, res, next) {
        res.render('admin/examen/eliminar', {layout: 'layouts/admin', title:"Eliminar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/examen/eliminar', function (req, res, next) {
        res.render('admin/examen/eliminar', {layout: 'layouts/admin', title:"Eliminar una examen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
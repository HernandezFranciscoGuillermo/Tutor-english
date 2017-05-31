exports.speaking = function (router, SpekingModel, moment, Entities, wCharacter) {

    /**
     * Buscar
     */
    router.get('/speaking/buscar', function (req, res, next) {
        res.render('admin/speaking/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/speaking/buscar', function (req, res, next) {
        res.render('admin/speaking/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/speaking/crear', function (req, res, next) {
        res.render('admin/speaking/crear', {layout: 'layouts/admin', title:"Crear una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/speaking/crear', function (req, res, next) {

        var temas         = req.body.temas;
        var descripcion   = req.body.descripcion;
        var palabra       = req.body.palabra;
        var pronunciacion = req.body.pronunciacion;

        if(temas == null || descripcion == null || palabra == null || pronunciacion == null){
            res.end('error');
        }else{
            if(temas.match(/([0-9])/) && descripcion.length>5 && palabra.length > 1 && pronunciacion.length >1){
                //res.end('ok');

                SpekingModel.save(req, res, function (status, msg) {
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

    router.get('/speaking/editar', function (req, res, next) {
        res.render('admin/speaking/editar', {layout: 'layouts/admin', title:"Editar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/speaking/editar/:id', function (req, res, next) {
        res.render('admin/speaking/editar', {layout: 'layouts/admin', title:"Editar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/speaking/editar', function (req, res, next) {
        res.render('admin/speaking/editar', {layout: 'layouts/admin', title:"Editar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/speaking/eliminar', function (req, res, next) {
        res.render('admin/speaking/eliminar', {layout: 'layouts/admin', title:"Eliminar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/speaking/eliminar/:id', function (req, res, next) {
        res.render('admin/speaking/eliminar', {layout: 'layouts/admin', title:"Eliminar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/speaking/eliminar', function (req, res, next) {
        res.render('admin/speaking/eliminar', {layout: 'layouts/admin', title:"Eliminar una speaking", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
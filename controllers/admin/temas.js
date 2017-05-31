exports.temas = function(router, temasModel, moment){
    /**
     *
     */

    router.get('/tema/buscar', function(req, res, next){
        temasModel.getTemas(req, res, moment,function (temas) {
            //res.header("Content-Type", "application/json; charset=utf-8");
            //res.end(JSON.stringify(data));
            res.render('admin/temas/buscar', {layout: 'layouts/admin.hbs', title:"Buscar un tema", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:temas});
        });
    });

    router.post('/tema/buscar', function (req, res, next) {
        res.end('');
    });

    /**
     *
     */

    router.get('/tema/crear', function(req, res, next){
        res.render('admin/temas/crear', {layout: 'layouts/admin.hbs', title:"Crear un tema", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/tema/crear', function (req, res, next) {
        res.end('');
    });

    /**
     *
     */

    router.get('/tema/editar', function(req, res, next){
        res.render('admin/temas/editar', {layout: 'layouts/admin.hbs', title:"Editar un tema", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/tema/editar', function (req, res, next) {
        res.end('');
    });

    /**
     *
     */

    router.get('/tema/eliminar', function(req, res, next){
        res.render('admin/temas/eliminar', {layout: 'layouts/admin.hbs', title:"Eliminar un tema", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/tema/eliminar', function (req, res, next) {
       res.end('');
    });
};
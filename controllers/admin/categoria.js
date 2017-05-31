exports.categorias = function (router, CategoriasModel, moment, Entities) {
    /**
     * Buscar
     */
    router.get('/categoria/buscar', function (req, res, next) {
        CategoriasModel.getCategoria(req, res, moment, function (categoria) {
            //res.end(categorias);
            //res.end('f');
            //res.header("Content-Type", "application/json; charset=utf-8");
            //res.end(JSON.stringify(categoria));
            if(req.query.categoria == null){
                res.render('admin/categorias/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:categoria});
                
            }else {
                
                if(req.query.categoria !== ""){
                    
                    CategoriasModel.search(req, res, moment, Entities, function (data) {
                        //res.header("Content-Type", "application/json; charset=utf-8");
                        //res.end(JSON.stringify(data));
                        res.render('admin/categorias/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:data});
                    });
                    
                }else {
                    res.render('admin/categorias/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:categoria});
                }
            }
        });
    });

    router.post('/categoria/buscar', function (req, res, next) {
        res.render('admin/categorias/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/categoria/crear', function (req, res, next) {
        res.render('admin/categorias/crear', {layout: 'layouts/admin', title:"Crear una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/categoria/crear', function (req, res, next) {
        //res.render('admin/categorias/crear', {layout: 'layouts/admin', title:"Crear una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
        if(req.body.nombre == null  || req.body.descripcion == null){

        }else{

            if(req.body.nombre.length >= 4 && req.body.descripcion.length >= 5){

                CategoriasModel.save(req, res, function (status, msg) {
                    if(status){
                        res.end('ok');

                    }else{
                        res.end('fail');
                    }
                });

            }else {
                res.end('error');
            }
        }
    });
    
    /**
     * Editar
     */

    router.get('/categoria/editar', function (req, res, next) {
        res.render('admin/categorias/editar', {layout: 'layouts/admin', title:"Editar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/categoria/editar/:id', function (req, res, next) {
        res.render('admin/categorias/editar', {layout: 'layouts/admin', title:"Editar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/categoria/editar', function (req, res, next) {
        res.render('admin/categorias/editar', {layout: 'layouts/admin', title:"Editar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/categoria/eliminar', function (req, res, next) {
        res.render('admin/categorias/eliminar', {layout: 'layouts/admin', title:"Eliminar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/categoria/eliminar/:id', function (req, res, next) {
        res.render('admin/categorias/eliminar', {layout: 'layouts/admin', title:"Eliminar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/categoria/eliminar', function (req, res, next) {
        res.render('admin/categorias/eliminar', {layout: 'layouts/admin', title:"Eliminar una categoria", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};

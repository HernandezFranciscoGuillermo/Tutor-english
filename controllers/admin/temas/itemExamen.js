var kindOf = require('kind-of');
exports.item = function (router, ItemModel, moment, Entities, wCharacter) {

    /**
     * Buscar
     */
    router.get('/itemExamen/buscar', function (req, res, next) {
        res.render('admin/itemExamen/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/itemExamen/buscar', function (req, res, next) {
        res.render('admin/itemExamen/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/itemExamen/crear', function (req, res, next) {
        res.render('admin/itemExamen/crear', {layout: 'layouts/admin', title:"Crear una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/itemExamen/crear', function (req, res, next) {
        //res.end(JSON.stringify(req.body));

        var examen    = req.body.examen;
        var pregunta  = req.body.pregunta;
        var respuesta = req.body.respuesta;


        if(examen == null || pregunta == null || respuesta == null){
            res.end('error');

        }else{

            if(examen.match(/([0-9])/) && wCharacter(pregunta) && pregunta.length> 5){

                //console.log(req.body);
                //console.log(kindOf(respuesta));
                res.end('ok');
                ItemModel.save(req, res, function (status, msg) {
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

    router.get('/itemExamen/editar', function (req, res, next) {
        res.render('admin/itemExamen/editar', {layout: 'layouts/admin', title:"Editar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/itemExamen/editar/:id', function (req, res, next) {
        res.render('admin/itemExamen/editar', {layout: 'layouts/admin', title:"Editar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/itemExamen/editar', function (req, res, next) {
        res.render('admin/itemExamen/editar', {layout: 'layouts/admin', title:"Editar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/itemExamen/eliminar', function (req, res, next) {
        res.render('admin/itemExamen/eliminar', {layout: 'layouts/admin', title:"Eliminar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/itemExamen/eliminar/:id', function (req, res, next) {
        res.render('admin/itemExamen/eliminar', {layout: 'layouts/admin', title:"Eliminar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/itemExamen/eliminar', function (req, res, next) {
        res.render('admin/itemExamen/eliminar', {layout: 'layouts/admin', title:"Eliminar una itemExamen", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
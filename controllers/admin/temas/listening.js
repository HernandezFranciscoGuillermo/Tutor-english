exports.listening = function (router, ListeningModel, moment, Entities) {

    /**
     * Buscar
     */
    router.get('/listening/buscar', function (req, res, next) {
        res.render('admin/listening/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/listening/buscar', function (req, res, next) {
        res.render('admin/listening/buscar', {layout: 'layouts/admin', title:"Buscar", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Crear
     */
    router.get('/listening/crear', function (req, res, next) {
        res.render('admin/listening/crear', {layout: 'layouts/admin', title:"Crear una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/listening/crear', function (req, res, next) {
        var temaId      = req.body.temas;
        var descripcion = req.body.descripcion;
        var audioFile   = req.body.audioFile;

        if(temaId == null || descripcion == null || audioFile == null){
            res.end('error');
        }else{

            if(temaId > 0 && descripcion.length > 5 && audioFile.length > 2){
                //res.end('ok');

                ListeningModel.save(req, res, function (status, msg) {
                    if(status){
                        console.log(msg);
                        res.end('ok');

                    }else{
                        console.log(msg);
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

    router.get('/listening/editar', function (req, res, next) {
        res.render('admin/listening/editar', {layout: 'layouts/admin', title:"Editar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/listening/editar/:id', function (req, res, next) {
        res.render('admin/listening/editar', {layout: 'layouts/admin', title:"Editar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/listening/editar', function (req, res, next) {
        res.render('admin/listening/editar', {layout: 'layouts/admin', title:"Editar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    /**
     * Eliminar
     */

    router.get('/listening/eliminar', function (req, res, next) {
        res.render('admin/listening/eliminar', {layout: 'layouts/admin', title:"Eliminar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.get('/listening/eliminar/:id', function (req, res, next) {
        res.render('admin/listening/eliminar', {layout: 'layouts/admin', title:"Eliminar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });

    router.post('/listening/eliminar', function (req, res, next) {
        res.render('admin/listening/eliminar', {layout: 'layouts/admin', title:"Eliminar una listening", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
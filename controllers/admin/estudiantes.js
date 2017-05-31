exports.estudiantes = function (router, csrfProtection, form, field, StudentModel,password, moment) {

    /**
     *  Mostrar perfil
     */

    router.get('/profile', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/estudiantes/profile', {layout: 'layouts/admin.hbs', title:"Perfil", username: req.session.username, userType: req.session.usertype, img:req.session.userimg});
        }
    });

    /**
     * Buscar
     */

    router.get('/estudiante/buscar' ,function(req, res, next){
        StudentModel.student(req, res, moment, function (students) {
            if(!req.session.username){
                res.redirect('/admin');
            }else {
                res.render('admin/estudiantes/buscar', {layout: 'layouts/admin.hbs', title:"Buscar un estudiante", username: req.session.username, userType: req.session.usertype, img:req.session.userimg, data:students});
            }
        });
    });

    router.post('estudiante/buscar', function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.end('');
        }
    });

    /**
     *  Crear
     */

    router.get('/estudiante/crear',  function (req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            password.Maker(function (data) {
                res.render('admin/estudiantes/crear', {layout: 'layouts/admin.hbs', title:"Crear un estudiante", username: req.session.username, userType: req.session.usertype, img:req.session.userimg, password:data});
            });
        }
    });

    router.post('/estudiante/crear', form(field("nombre").trim().required(),
                                          field("apellido").trim().required(),
                                          field("username").trim().required(),
                                          field("email").trim().required(),
                                          field("password").trim().required(),
                                          field("genero").trim().required(),
                                          field("userTypes").trim().required(),
                                          field("status").trim().required()), function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {

            //var password = req.body.password;
            if (!req.form.isValid) {

                //res.end(JSON.stringify({error:req.form}));
                res.end('error');
            }else {
                //res.end(req.form.nombre);
                //res.end(JSON.stringify(req.body));
                //res.end(JSON.stringify(req.form));
                //res.end(JSON.stringify({message:'el formulario se proceso correctamente'}));
                res.end('ok');
            }
        }
    });

    /**
     *  Editar
     */

    router.get('/estudiante/editar', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/estudiantes/editar', {layout: 'layouts/admin.hbs', title:"Editar un estudiante", username: req.session.username, userType: req.session.usertype, img:req.session.userimg});
        }
    });

    router.post('/estudiante/editar', function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.end('');
        }
    });

    /**
     *  Eliminar
     */

    router.get('/estudiante/eliminar', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/estudiantes/eliminar', {layout: 'layouts/admin.hbs', title:"Eliminar un estudiante", username: req.session.username, userType: req.session.usertype, img:req.session.userimg});
        }
    });

    router.post('/estudiante/eliminar', function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.end('');
        }
    });
};
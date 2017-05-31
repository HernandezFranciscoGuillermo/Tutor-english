exports.users = function(hash, router, csrfProtection, form, field, UsersModel, password, moment, Entities){

    /**
     *  Invoca el perfil del usuario
     */

    router.get('/profile', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/usuarios/profile', {layout: 'layouts/admin', title:"Perfil", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
        }
    });

    /**
     *  Buscar
     */

    router.get('/usuarios/buscar', function(req, res, next){
        UsersModel.users(req, res, moment, function (users) {
            if(!req.session.username){
                res.redirect('/admin');

            }else {

                if(req.query.username ==null){
                    res.render('admin/usuarios/buscar', {layout: 'layouts/admin', title:"Buscar usuarios", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:users});

                }else {

                    if (req.query.username !== ""){

                      UsersModel.search(req, res, moment, Entities, function (data) {
                          res.render('admin/usuarios/buscar', {layout: 'layouts/admin', title:"Buscar usuarios", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:data});
                      });

                    }else {
                        res.render('admin/usuarios/buscar', {layout: 'layouts/admin', title:"Buscar usuarios", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:users});
                    }
                }
            }
        });
    });

    router.post('/usuarios/buscar', function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.end('hola');
        }
    });

    /**
     *
     */
    //csrfProtection, , csrfToken: req.csrfToken()
    router.get('/usuarios/crear', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            password.Maker(function (data) {
                res.render('admin/usuarios/crear', {layout: 'layouts/admin', title:"Crear un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, password:data});
            });
        }
    });

    router.post('/usuarios/crear', form(field("nombre").trim().required(),
                                                        field("username").trim().required(),
                                                        field("email").trim().isEmail(),
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
                UsersModel.save(req, hash, Entities, function (status, msg) {
                    if(!status){
                        res.end('fail');
                    }else {
                        res.end('ok');
                        //console.log(req.body.excerptImage);
                    }
                });
                //res.end('ok');
            }
        }
    });

    /**
     *
     */

    router.get('/usuarios/editar', function(req, res, next){
        /*if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/usuarios/editar', {layout: 'layouts/admin', title:"Editar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
        }*/

        UsersModel.users(req, res, moment, function (users) {
            if(!req.session.username){
                res.redirect('/admin');

            }else {

                if(req.query.username == null){
                    res.render('admin/usuarios/editar', {layout: 'layouts/admin', title:"Editar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:users});

                }else {

                    if (req.query.username !== ""){

                        UsersModel.search(req, res, moment, Entities, function (data) {
                            res.render('admin/usuarios/editar', {layout: 'layouts/admin', title:"Editar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:data});

                        });

                    }else {
                        res.render('admin/usuarios/editar', {layout: 'layouts/admin', title:"Editar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, data:users});
                    }
                }
            }
        });
    });

    router.get('/usuarios/editar/:id', function(req, res, next){
        UsersModel.searchById(req, res, moment, Entities, function (user) {
            //res.end(req.params.id);
            //res.json(user);
            res.render('admin/usuarios/modificar', {layout: 'layouts/admin', title:"Modificar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg, user:user});
        });
    });

    router.post('/usuarios/editar', function (req, res, next) {
       res.end('');
    });

    /**
     *
     */

    router.get('/usuarios/eliminar', function(req, res, next){
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.render('admin/usuarios/eliminar', {layout: 'layouts/admin', title:"Eliminar un usuario", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
        }
    });

    router.post('/usuarios/eliminar', function (req, res, next) {
        if(!req.session.username){
            res.redirect('/admin');
        }else {
            res.end('');
        }
    });
};
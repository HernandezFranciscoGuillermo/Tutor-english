exports.UploadApk = function(router){

    /**
     *
     */

    router.get('/apk', function(req, res, next){
        res.render('admin/upload', {layout: 'layouts/admin.hbs', title:"Subir .apk", username: req.session.username, userType:req.session.usertype, img:req.session.userimg});
    });
};
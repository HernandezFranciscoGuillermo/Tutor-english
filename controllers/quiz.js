var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    res.header('Cache-Control','nocache, no-store, max-age=0, must-revalidate');
    res.header('X-Frame-Options','deny');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Pragma','no-cache');
    res.header('Expires','Fri, 01 Jan 1990 00:00:00 GMT');
    res.header('x-powered-by','Tutor-app');
    res.header('Server','Tutor-app Server');
    //res.header('Access-Control-Expose-Headers','Access-Control-Allow-Origin');
    //res.header('Access-Control-Allow-Origin', '*');//Access-Control-Allow-Origin
    res.header('X-XSS-Protection','1; mode=block');

    next();

});

router.get('/', function(req, res, next) {
    //res.header('Cache-Control', 'public, max-age=31557600');
    //res.removeHeader("Expires");
    res.render('quiz/quiz', {layout: false, title: 'Tutor app quiz' });

});

module.exports = router;

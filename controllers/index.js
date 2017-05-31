var express = require('express');
var router = express.Router();
//var transfer = require('transfer-rate');
//var finished  = require('on-finished');

//var rate = transfer();

router.get('/', function(req, res, next) {
    //var start = process.hrtime();
    //rate(req, res, start);

    res.header('Cache-Control', 'public, max-age=31557600');
    res.removeHeader("Expires");
    res.render('landing/index', {layout: false, title: 'Tutor app' });
    //console.log(transfer(req.transferRate, res, start));
    //console.log(req.transferRate);

    // finished(res, function(err) {
    //
    //     if (!err) {
    //         console.log(res.transferRate);
    //     }
    // });

});

module.exports = router;

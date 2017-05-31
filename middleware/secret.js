/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 64;

/**
 *
 * @param callback
 */

//exports.Maker = function (callback) {
    crypto.randomBytes(len, function(err, secret){
        if (err) return fn(err);
        secret = secret.toString('base64');
        //callback(secret);
        console.log(secret);
    });
//};

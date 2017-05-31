/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 10;

/**
 *
 * @param callback
 */

exports.Maker = function (callback) {
    crypto.randomBytes(len, function(err, salt){
        if (err) return fn(err);
        salt = salt.toString('base64');
        callback(salt);
    });
};

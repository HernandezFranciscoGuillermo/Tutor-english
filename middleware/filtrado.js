const isHtml     = require('is-html');
const Entities   = require('html-entities').AllHtmlEntities;

exports.filtradoHTML = function (data, callback) {
    if(data == null){
        callback('Error no se han enviado datos');
    }else{
        if(isHtml(data)){

            callback('Error se contro ');

        }else {

            callback(Entities.encode(data));
        }
    }
};

function mysql_real_escape_string(s) {
    return (s + '').replace(/\0/g, '\\x00')
                   .replace(/\n/g, '\\n')
                   .replace(/\r/g, '\\r')
                   .replace(/\\/g, '\\\\')
                   .replace(/'/g, '\\\'')
                   .replace(/"/g, '\\"')
                   .replace(/\x1a/g, '\\\x1a')
}


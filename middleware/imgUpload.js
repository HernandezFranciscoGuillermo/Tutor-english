var shell = require('shelljs');

exports.imgUpload = function (upload, resizeConf, dirs) {

// jquery-file-upload helper
    
//req.app.locals.tmp
// bind event
    upload.on('end', function (fileInfo) {
        // insert file info
        console.log("files upload complete");
        console.log(fileInfo.name);
        if(ftype(fileInfo.name) == 'apk'){
            console.log('is apk');
        }

    });

    upload.on('delete', function (fileName) {
        // remove file info
        console.log("files remove complete");
        console.log(fileName);
    });

    upload.on('error', function (e) {
        console.log(e.message);
    });

    function ftype(file) {
        var result = file.split("."),
            name = result[1];
        return name;
    }
};
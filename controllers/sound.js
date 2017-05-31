var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var mime    = require('mime-types');
util        = require('util');

router.get('/', function(req, res, next) {

    var resource = req.query['resource'];
    if (resource == null) {

        soundFile = path.join(req.app.locals.soundfolder , 'error.mp3');
        stat      = fs.statSync(soundFile);
        mimeType  = setFormat(soundFile);

        res.writeHead(404, {
            'Content-Type': mimeType,
            'Content-Length': stat.size
        });
		
        fs.createReadStream(soundFile).pipe(res);
    }

    if(resource !== ""){

        try {

            if (fs.existsSync(req.app.locals.soundfolder + resource)) {

                var soundFile = req.app.locals.soundfolder + resource;

				if(resource.match(/([.]+\w)/) || resource.match(/\b(\w+[.]\w+)/)){

					if(resource.match(/([.])(.+)([./])/)){
						var soundFile = req.app.locals.soundfolder + 'error.mp3';
						stat      = fs.statSync(soundFile);
						mimeType  = setFormat(soundFile);

						res.writeHead(404, {
							'Content-Type': mimeType,
							'Content-Length': stat.size
						});

						fs.createReadStream(soundFile).pipe(res);

					}else{

						if (soundFile.match(/^(.+)([^//\\]+)$/)) {
							//archivo en subfolder
							stat      = fs.statSync(soundFile);
							mimeType  = setFormat(soundFile);

							res.writeHead(200, {
								'Content-Type': mimeType,
								'Content-Length': stat.size
							});
							//res.status(200);

							fs.createReadStream(soundFile).pipe(res);

						}else{

							/**
							 * Expresion invalida para un directorio
							 * @type {string}--->
							 */
							var soundFile = req.app.locals.soundfolder + 'error.mp3';
							stat      = fs.statSync(soundFile);
							mimeType  = setFormat(soundFile);

							res.writeHead(404, {
								'Content-Type': mimeType,
								'Content-Length': stat.size
							});
							//res.status(404);

							fs.createReadStream(soundFile).pipe(res);
						}
					}

				}else{

					var soundFile = req.app.locals.soundfolder + 'error.mp3';
					stat      = fs.statSync(soundFile);
					mimeType  = setFormat(soundFile);

					res.writeHead(404, {
						'Content-Type': mimeType,
						'Content-Length': stat.size
					});
					//res.status(404);

					fs.createReadStream(soundFile).pipe(res);
				}
				
                  

            }else{
                /**
                 * El archivo no existe
                 * @type {string}
                 */
                var soundFile = req.app.locals.soundfolder + 'error.mp3';
                stat      = fs.statSync(soundFile);
                mimeType  = setFormat(soundFile);

                res.writeHead(404, {
                    'Content-Type': mimeType,
                    'Content-Length': stat.size
                });

                fs.createReadStream(soundFile).pipe(res);
            }
        } catch (error) {

        }

    }else{
        /**
         * Expresion invalida
         * @type {string}
         */
        var soundFile = req.app.locals.soundfolder + 'error.mp3';
        stat      = fs.statSync(soundFile);
        mimeType  = setFormat(soundFile);

        res.writeHead(404, {
            'Content-Type': mimeType,
            'Content-Length': stat.size
        });

        fs.createReadStream(soundFile).pipe(res);
    }

    function setFormat(soundFile){
        return mimeType = mime.lookup(soundFile);
    }
});

module.exports = router;

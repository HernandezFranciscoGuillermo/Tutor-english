var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var mime    = require('mime-types');

router.get('/', function(req, res, next) {

	var resource = req.query['archivo'];
	//var token    = req.query['token'];
	if (resource == null) {
		var apk = fs.readFileSync(req.app.locals.imgfolder + '/save.png');
		res.writeHead(404, {
			'Content-Type' : 'image/png'
		});

		res.end(apk, 'binary');
	}

	if(resource !== ""){

		try {

			if (fs.existsSync(req.app.locals.apkfolder + resource)) {

				var apkFile = req.app.locals.apkfolder + resource;

				if(resource.match(/([.]+\w)/) || resource.match(/\b(\w+[.]\w+)/)){

					if(resource.match(/([.])(.+)([./])/)){
						apkFile = req.app.locals.imgfolder + 'expr_inv.png';
						apk = fs.readFileSync(apkFile);
						mimeType = setapk(apkFile);
						res.writeHead(404, {'Content-Type' : mimeType});
						res.end(apk, 'binary');

					}else {
						if (apkFile.match(/^(.+)([^//\\]+)$/)) {
							//archivo en subfolder
							apk = fs.readFileSync(apkFile);
							mimeType = setapk(apkFile);
							res.writeHead(200, {'Content-Disposition' : 'attachment; filename=Tutor.apk'});
							res.end(apk, 'binary');

						}else {
							/**
							 * Expresion invalida para un directorio
							 * @type {string}
							 */
							apkFile = req.app.locals.imgfolder + 'expr_inv.png';
							apk = fs.readFileSync(apkFile);
							mimeType = setapk(apkFile);
							res.writeHead(404, {'Content-Type' : mimeType});
							res.end(apk, 'binary');

						}
					}

				}else {

					apkFile = req.app.locals.imgfolder + 'expr_inv.png';
					apk = fs.readFileSync(apkFile);
					mimeType = setapk(apkFile);
					res.writeHead(404, {'Content-Type' : mimeType});
					res.end(apk, 'binary');
				}

			}else{

				/**
				 * El archivo no existe
				 * @type {string}
                 */
				apkFile = req.app.locals.imgfolder + 'error-404-dribble.png';
				apk = fs.readFileSync(apkFile);
				mimeType = setapk(apkFile);
				res.writeHead(404, {'Content-Type' : mimeType});

				res.end(apk, 'binary');
			}

		} catch (error) {
			console.log(error);
		}

	}else{

		apkFile = req.app.locals.imgfolder + 'expr_inv.png';
		apk = fs.readFileSync(apkFile);
		mimeType = setapk(apkFile);
		res.writeHead(404, {'Content-Type' : mimeType});
		res.end(apk, 'binary');
	}

	function setapk(apkFile){
		return mimeType = mime.lookup(apkFile);
	}
});

module.exports = router;

var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var mime    = require('mime-types');

router.get('/', function(req, res, next) {

	var resource = req.query['resource'];
	//var token    = req.query['token'];
	if (resource == null) {
		//data = {"error" : "falta la token de acceso"};
		//res.status(403);
		//res.end(JSON.stringify(data));
		//res.redirect('/images/logoUtec.png')

		//var img = fs.readFileSync(__dirname + '/logoUtec.png');
		var img = fs.readFileSync(req.app.locals.imgfolder + '/graphics.png');
		res.writeHead(404, {
			'Content-Type' : 'image/png'
		});

		res.end(img, 'binary');
	}

	if(resource !== ""){

		try {

			if (fs.existsSync(req.app.locals.imgfolder + resource)) {

				var imgFile = req.app.locals.imgfolder + resource;

				if(resource.match(/([.]+\w)/) || resource.match(/\b(\w+[.]\w+)/)){

					if(resource.match(/([.])(.+)([./])/)){
						imgFile = req.app.locals.imgfolder + 'expr_inv.png';
						img = fs.readFileSync(imgFile);
						mimeType = setImg(imgFile);
						res.writeHead(404, {'Content-Type' : mimeType});
						res.end(img, 'binary');

					}else {
						if (imgFile.match(/^(.+)([^//\\]+)$/)) {
							//archivo en subfolder
							img = fs.readFileSync(imgFile);
							mimeType = setImg(imgFile);
							res.writeHead(200, {'Content-Type' : mimeType});
							res.end(img, 'binary');

						}else {
							/**
							 * Expresion invalida para un directorio
							 * @type {string}
							 */
							imgFile = req.app.locals.imgfolder + 'expr_inv.png';
							img = fs.readFileSync(imgFile);
							mimeType = setImg(imgFile);
							res.writeHead(404, {'Content-Type' : mimeType});
							res.end(img, 'binary');

						}
					}

				}else {

					imgFile = req.app.locals.imgfolder + 'expr_inv.png';
					img = fs.readFileSync(imgFile);
					mimeType = setImg(imgFile);
					res.writeHead(404, {'Content-Type' : mimeType});
					res.end(img, 'binary');
				}

			}else{

				/**
				 * El archivo no existe
				 * @type {string}
                 */
				imgFile = req.app.locals.imgfolder + 'error-404-dribble.png';
				img = fs.readFileSync(imgFile);
				mimeType = setImg(imgFile);
				res.writeHead(404, {'Content-Type' : mimeType});

				res.end(img, 'binary');
			}

		} catch (error) {
			console.log(error);
		}

	}else{

		imgFile = req.app.locals.imgfolder + 'expr_inv.png';
		img = fs.readFileSync(imgFile);
		mimeType = setImg(imgFile);
		res.writeHead(404, {'Content-Type' : mimeType});
		res.end(img, 'binary');
	}

	function setImg(imgFile){
		return mimeType = mime.lookup(imgFile);
	}
});

module.exports = router;

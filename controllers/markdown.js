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

		//var md = fs.readFileSync(__dirname + '/logoUtec.png');
		mdFile = req.app.locals.markDownFolder + 'expresion-invalida.md';
		md = fs.readFileSync(mdFile);
		mimeType = setFormat(mdFile);
		res.writeHead(404, {'Content-Type' : mimeType});
		res.end(md, 'binary');
	}

	if(resource !== ""){

		try {

			if (fs.existsSync(req.app.locals.markDownFolder + resource)) {

				var mdFile = req.app.locals.markDownFolder + resource;

				if(resource.match(/([.]+\w)/) || resource.match(/\b(\w+[.]\w+)/)){

					if(resource.match(/([.])(.+)([./])/)){
						mdFile = req.app.locals.markDownFolder + 'expresion-invalida.md';
						md = fs.readFileSync(mdFile);
						mimeType = setFormat(mdFile);
						res.writeHead(404, {'Content-Type' : mimeType});
						res.end(md, 'binary');

					}else {
						if (mdFile.match(/^(.+)([^//\\]+)$/)) {
							//archivo en subfolder
							md = fs.readFileSync(mdFile);
							mimeType = setFormat(mdFile);
							res.writeHead(200, {'Content-Type' : mimeType});
							res.end(md, 'binary');

						}else {
							/**
							 * Expresion invalida para un directorio
							 * @type {string}
							 */
							mdFile = req.app.locals.markDownFolder + 'expresion-invalida.md';
							md = fs.readFileSync(mdFile);
							mimeType = setFormat(mdFile);
							res.writeHead(404, {'Content-Type' : mimeType});
							res.end(md, 'binary');

						}
					}

				}else {

					mdFile = req.app.locals.markDownFolder + 'expresion-invalida.md';
					md = fs.readFileSync(mdFile);
					mimeType = setFormat(mdFile);
					res.writeHead(404, {'Content-Type' : mimeType});
					res.end(md, 'binary');
				}

			}else{

				/**
				 * El archivo no existe
				 * @type {string}
                 */
				mdFile = req.app.locals.markDownFolder + 'no-existe.md';
				md = fs.readFileSync(mdFile);
				mimeType = setFormat(mdFile);
				res.writeHead(404, {'Content-Type' : mimeType});

				res.end(md, 'binary');
			}

		} catch (error) {
			console.log(error);
		}

	}else{

		mdFile = req.app.locals.markDownFolder + 'expresion-invalida.md';
		md = fs.readFileSync(mdFile);
		mimeType = setFormat(mdFile);
		res.writeHead(404, {'Content-Type' : mimeType});
		res.end(md, 'binary');
	}

	function setFormat(mdFile){
		return mimeType = mime.lookup(mdFile);
	}
});

module.exports = router;

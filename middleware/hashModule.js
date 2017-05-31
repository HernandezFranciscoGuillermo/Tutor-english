var passwrd = require('password-hash-and-salt');



exports.hashPasswd = function(password, callback){
	 
	passwrd(password).hash(function(error, hash) {
		if(error)
		throw new Error('Something went wrong!');
	
		callback(hash);
	});
}

exports.verifyHash = function(password, hash, callback){
	passwrd(password).verifyAgainst(hash, function(error, verified) {
		if(error)
			throw new Error('Something went wrong!');
		if(!verified) {
			//console.log("Don't try! We got you!");
			callback('faluire');
		} else {
			//console.log("The secret is...");
			callback('verified');
		}
	});
}

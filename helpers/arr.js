var kindOf = require('kind-of');

var arr = [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 3, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 4, 40, 41, 42, 43, 44, 45, 5, 6, 7, 8, 9, null];


function clean(array){
	
	array = array.filter(function(entry) { return entry.trim() != ''; });
	return array;
}

function formater(array){
		
	if (array.match('[,]')) {

		return array.split(/[,]+/);
	}
	
	return 'err';
}

function parser(array){
	
	return JSON.stringify({audios:clean(formater(array.join('.mp3,')))});
}

//console.log(parser(arr));


//var art = ['', 'heloo'];



//console.log(clean(art));
//respuesta: [ 'jnjnjnj', 'hbhbhbhbhbhhb' ]
//var respuesta =[ 'jnjnjnj', 'hbhbhbhbhbhhb' ];
//if(kindOf(respuesta) == 'array'){
//	console.log(formater(respuesta));
//}

var s = '@, a, b,c';
console.log(formater(s));
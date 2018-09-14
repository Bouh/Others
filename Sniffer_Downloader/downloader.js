var http = require('http');
var fs = require('fs');

var target = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg";



var download = function (target, folder, name, ext){
	
	file = fs.createWriteStream(folder + name + "." + ext );
	
	http.get( target, function(response) {
		response.pipe(file);
	});	
};





download(target, "Tutorials/", file, "mp4");





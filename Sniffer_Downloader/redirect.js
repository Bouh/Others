require('events').EventEmitter.prototype._maxListeners = 1000;

var http = require('http');
var fs = require('fs');
var async = require('async');
var https = require('https');
var request = require('request');

var writeisrunning = false;

var dir = './Tutorials';

var ID_arr_to_dl = 0;
var arr_to_dl = [];
var arr_folder = [];
var arr_title = [];
var vawait = false;

var createFolder = function(dir){
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
};


function saveData(arg1, arg2, arg3, callback){
	
	arr_to_dl.push(arg1);
	arr_folder.push(arg2);
	arr_title.push(arg3);
	callback();
	//console.log("CALLBACK");
}

function download(){

	 //EMPTY WHYYYYYYYYYYYYYYYYYYY >.<

	 if(vawait === false){
		var file =  fs.createWriteStream(arr_folder[ID_arr_to_dl] + arr_title[ID_arr_to_dl] + ".mp4" );
		https.get( arr_to_dl[ID_arr_to_dl], function(response) {
			response.pipe(file);
		});		
	
	file.on('open', function() {
		console.log('File :');
		console.log(arr_title[ID_arr_to_dl]); // undefined
		//console.log(arr_to_dl[ID_arr_to_dl]);
		//console.log('downloading ...');
		vawait = true;

	});
	
	file.on('error', function (err) {
		console.log("Error : ");
		console.log(err);
		console.log("Download FAIL !");
		
		ID_arr_to_dl = ID_arr_to_dl + 1;
		if (arr_to_dl.length >= ID_arr_to_dl) {
			vawait = false;		
			download();
		}
		
		
	});
  
	file.on('finish', function() {
            ID_arr_to_dl = ID_arr_to_dl + 1;
            if (arr_to_dl.length >= ID_arr_to_dl) {
				vawait = false;		
				download();
            }
	});
	 }
};


obj_tutorials = JSON.parse(fs.readFileSync('output.js', 'utf8'));

/*

async.each(obj_tutorials, function (element, callback) {
}

*/	
obj_tutorials.forEach(function(element, e) {

	element['title'].forEach(function(title,i) {

		sqd = obj_tutorials[e]['folder'];
	
	

		folder = sqd;
		title2 = i + "_" + title;
		id = element['id'][i];

		file_to_dl = 'https://fast.wistia.com/embed/medias/' + id + '.json?callback=wistiajson1';

	
		request({
			uri: file_to_dl,
			headers: 
			{
				'Referer': 'https://cgcookie.com/course/the-perspective-course/'
			}
		}, function (err, res, body) {
		
			data = body.slice(16, body.length-1);
			dataJSON = JSON.parse(data);
			
			file_for_download = dataJSON["media"]["assets"][0]["url"];
			
			createFolder(dir);
			createFolder(dir + '/' + obj_tutorials[e]['folder'] + '/');
		
			saveData(file_for_download, dir + '/' + obj_tutorials[e]['folder'] + '/', (i+1) + "_" + title ,function(){
				download();
			});
		});
		
	});
	
});


var scrapy = require('node-scrapy');
var fs = require('fs');
var async = require('async');
var url = 'https://cgcookie.com/courses/?fwp_library_search=blender';
var data;
var output_data = new Array();
var model = 
	{
		item:  { 
			selector: '.facetwp-template > li > a',
			get: 'href'
		}
	}

var fakedata = {
	item : ['https://cgcookie.com/course/shader-forge/','https://cgcookie.com/course/fundamentals-of-virtual-reality/']
}

var fs = require('fs');
var dir = './Tutorials';

var createFolder = function(dir){
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
};

createFolder(dir);


/*

{ 
	selector: '.lesson-list--wrap > .lesson-list > li[data-lesson-type="lesson"]',
	get: 'data-video-id'
}


*/

scrapy.scrape(url, model, function(err, data) {
    if (err) return console.error(err)

	console.log("----------")
	
	
	
	data['item'].forEach(function(element) {
		//console.log(element);
	
		url = element;
		model = 
		{
			folder: { 
				selector: 'h2.object--mast__title',
				get: 'text'
			},
			title : { 
				selector: '.lesson-list--wrap > .lesson-list > li[data-lesson-type="lesson"] > a',
				get: 'text'
			},
			id : { 
				selector: '.lesson-list--wrap > .lesson-list > li[data-lesson-type="lesson"]',
				get: 'data-video-id'
			}

		};
		
		scrapy.scrape(url, model, function(err, data) {
			data["folder"] = data["folder"].replace(":","");
			
			console.log(data["folder"]);
		
			if(data['id'] != null){
				output_data.push(data);
			}
			//output_data.reverse();

			fs.writeFile("output.js", JSON.stringify(output_data, null, 4), function(err) {
				if(err) {
					return console.log(err);
				}

				//console.log("The file was saved!");
			}); 
		});
		
		
	});

});

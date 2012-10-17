var getSize = function(fileName) {

	var ret = fs.statSync(fileName);
	return ret.size;
}

var compressor = require('node-minify'),
	fs = require('fs'),
	util = require('util'),
	oSize = getSize("../scmlib.min.js"),
	build, version = "0.0.2";

fs.readFile("../scmlib.min.js", function(err, data){
	data = data.toString();
	data = data.split("\n")[1];

	var regex = /([0-9]){5,}/
	var result = data.match(regex);
	build = parseInt(result[0], 10);
	build += 1;

	var date = new Date();

	new compressor.minify({
	    type: 'yui-js',
	    fileIn: ['../scmlib/utils.js', '../scmlib/core.js', '../scmlib/layer.js', '../scmlib/events.js', '../scmlib/drawable.js'],
	    fileOut: '../scmlib.min.js',
	    callback: function(err){
			  fs.appendFileSync("../scmlib.min.js", "\n/*! Simple Canvas Manager " + version + " | build " + formatBuild(build) + " | " + date.toDateString() + " */");
			  console.log("\nDone !\n\nInformations :\n--------------\n\nVersion : " + version
			  		+ "\n" + "Build : " + formatBuild(build) + "\nSize : " + oSize + " => " + getSize("../scmlib.min.js"));
	    }
	});
});

var formatBuild = function(build) {

	var ret = "";
	for (var i = 0; i != (5 - build.toString().length); i++)
		ret += "0";
	ret += build.toString();

	return ret;
}

/*
* Thank you node-minify
* https://github.com/srod/node-minify
*/
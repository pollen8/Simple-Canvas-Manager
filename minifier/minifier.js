var compressor = require('node-minify'),
	fs = require('fs');

new compressor.minify({
    type: 'yui-js',
    fileIn: ['../scmlib/utils.js', '../scmlib/core.js', '../scmlib/layer.js', '../scmlib/events.js', '../scmlib/drawable.js'],
    fileOut: '../scmlib.min.js',
    callback: function(err){
		  fs.appendFileSync("../scmlib.min.js", "\n/*! Simple Canvas Manager : scm-library.olympe.in | scm-library.olympe.in/MIT-LICENSE.txt */");
		  console.log("Minifier : done !");
    }
});

/*
* Thank you node-minify
* https://github.com/srod/node-minify
*/
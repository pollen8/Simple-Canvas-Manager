/**
Provides ScmCore and ScmLayer.

@module Major Objects
**/

var Scm = Scm || {}; // Namespace

/**
* Create an instance of the SCM lib.
*
* @namespace Scm
* @class Core
* @constructor
* @param node {String} This is the html div where SCM will work.
* @param [updateInterval=10] {Integer} Update intervals (in milliseconds).
*/

var GLOBAL_UPDATE_INTERVAL = 10;

Scm.Core = function(node, updateInterval){
	
	if ((this.node = document.getElementById(node)))
	{
		var scmContent = document.createElement('div');
		
		scmContent.setAttribute("id", "scmContent");
		scmContent.setAttribute("width", this.node.clientWidth);
		scmContent.setAttribute("height", this.node.clientHeight);
		scmContent.setAttribute("style", "position: absolute;");
		this.node.appendChild(scmContent);
		
		this.width = this.node.clientWidth;
		this.height = this.node.clientHeight;
		this.content = document.getElementById("scmContent");
		this.layers = [];
		this.updateInterval = updateInterval || 10;
		GLOBAL_UPDATE_INTERVAL = this.updateInterval;

		// ensure that bind is available
		if (!('bind' in Function.prototype)) {
			Function.prototype.bind = function(owner) {
			    var that = this;
			    var args = Array.prototype.slice.call(arguments, 1);
			    return function() {
			        return that.apply(owner,
			            args.length === 0 ? arguments : arguments.length === 0 ? args :
			            args.concat(Array.prototype.slice.call(arguments, 0))
			        );
			    };
			};
		}

		// run updateLoop
		window.setInterval(this.update.bind(this), this.updateInterval);
	}	
	else
		console.error("SCM : #" + node + " doesn't exist !");
}

/**
* Push a layer in the Scm.Core.
*
* @method push
* @param obj {Object} An Scm.Layer object
*/

Scm.Core.prototype.push = function(obj) { // TODO : verifier qu'il n'existe pas
	
	var canvas = document.createElement('canvas');
	
	canvas.setAttribute("id", "scm" + obj.name.charAt(0).toUpperCase() + obj.name.slice(1));
	canvas.setAttribute("width", this.width);
	canvas.setAttribute("height", this.height);
	canvas.setAttribute("style", "z-index: " + obj.zindex + "; position: absolute;");
	this.content.appendChild(canvas);
	this.layers.push(obj);
}

/**
* Get a layer previously created.
* 
* @method getLayer
* @param name {String} Name of the Layer.
* @return {Object} Return an Scm.Layer Object.
*/

Scm.Core.prototype.getLayer = function(name) {
	
	for (var i = 0; i != this.layers.length; i++)
		if (this.layers[i].name == name)
			return this.layers[i];
				
	console.error("Simple Canvas Manager : undefined reference to " + name + " layer !");	
}

/**
* Update all the layers.<br />
* This method is called periodically by the core.<br />
* This method is callable normally too.
* 
* @method update
*/

Scm.Core.prototype.update = function() {

	// Clear all layers
	for (var i = 0; i != this.layers.length; i++)
		if (typeof(this.layers[i]) != "undefined" && !this.layers[i].locked)
			this.layers[i].clear();
			
	// Draw all objects
	for (var i = 0; i != this.layers.length; i++)
		this.layers[i].drawAll();
}
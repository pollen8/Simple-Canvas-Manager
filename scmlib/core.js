/**
Provides ScmCore and ScmLayer.

@module Major Objects
**/

/**
* Create an instance of the SCM lib.
*
* @namespace Scm
* @class Core
* @constructor
* @param node {String} This is the html div where SCM will work.
* @param [updateInterval=10] {Integer} Update intervals (in milliseconds).
*/

var GLOBAL_UPDATE_INTERVAL = 10,
	GLOBAL_SCM_WIDTH = 0,
	GLOBAL_SCM_HEIGHT = 0;

Scm.Core = function(node, updateInterval){
	
	if ((this.node = document.getElementById(node)))
	{
		var style = "position: absolute;";
		Scm.Utils.createDomElement("div", node, "scmContent", this.node.clientWidth, this.node.clientHeight, style);

		style += " display: block;";
		Scm.Utils.createDomElement("div", "scmContent", "a", this.node.clientWidth, this.node.clientHeight, style); // first buffer
		Scm.Utils.createDomElement("div", "scmContent", "b", this.node.clientWidth, this.node.clientHeight, style, false); // second buffer
		
		this.width = this.node.clientWidth;
		this.height = this.node.clientHeight;
		this.layers = [];
		this.displayedBuffer = "a";
		this.hiddenBuffer = "b";
		GLOBAL_UPDATE_INTERVAL = updateInterval || 10;
		GLOBAL_SCM_WIDTH = this.width;
		GLOBAL_SCM_HEIGHT = this.height;

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
		window.setInterval(this.update.bind(this), GLOBAL_UPDATE_INTERVAL);
	}	
	else
		console.error("SCM : #" + node + " doesn't exist !");
};

/**
* Push a layer in the Scm.Core.
*
* @method push
* @param obj {Object} One Scm.Layer object at least
*/

Scm.Core.prototype.push = function() { // TODO : verifier qu'il n'existe pas
	
	var canvas, obj, elementNumber, style;
	
	if (arguments.length == 0)
		console.error("Scm : push needs at least 1 argument.");
	else
	{
		for (var i = 0; i != arguments.length; i++)
		{
			obj = arguments[i];
			elementNumber = ((this.layers.length > 0) ? (this.layers.length + 1) : (i + 1));
			
			// set new infos for the new Layer
			arguments[i].htmlName += elementNumber;
			arguments[i].elementNumber = elementNumber;

			// create the 2 canvas (double buffer)
			style = "z-index: " + elementNumber + "; position: absolute;";
			Scm.Utils.createDomElement("canvas", "a", "scmLayer"+elementNumber+"a", this.width, this.height, style);
			Scm.Utils.createDomElement("canvas", "b", "scmLayer"+elementNumber+"b", this.width, this.height, style, false);

			this.layers.push(obj);
		}
	}
}

/**
* Update all the layers.<br />
* This method is called periodically by the core.<br />
* This method is callable normally too.
* 
* @method update
*/

Scm.Core.prototype.update = function() {

	// Draw all objects on hidden buffer
	for (var i = 0; i != this.layers.length; i++)
		if (!this.layers[i].locked)
			this.layers[i].drawAll(this.hiddenBuffer);

	// flip
	document.getElementById(this.hiddenBuffer).style.display = 'block';
	document.getElementById(this.displayedBuffer).style.display = 'none';

	// Clear all layers of the new hidden buffer
	for (var i = 0; i != this.layers.length; i++)
		if (typeof(this.layers[i]) != "undefined" && !this.layers[i].locked)
			this.layers[i].clear(this.displayedBuffer);

	// change buffer
	this.hiddenBuffer = ((this.hiddenBuffer == "a") ? ("b") : ("a"));
	this.displayedBuffer = ((this.hiddenBuffer == "a") ? ("b") : ("a"));

	Scm.Event.fire("coreUpdate"); // fire an coreUpdate event
}

Scm.Core.prototype.moveLayer = function(layer, pos) {

	pos = ((pos == "top") ? (this.layers.length - 1) : (pos));
	pos = ((pos == "bottom") ? (0) : (pos));

	if (pos >= 0 && pos < this.layers.length)
	{
		// change pos in the core array
		this.layers.splice(this.layers.indexOf(layer), 1);
		this.layers.splice(pos, 0, layer);

		// update all pos in html
		for (var i = 0; i != this.layers.length; i++)
		{
			document.getElementById(this.layers[i].htmlName+this.displayedBuffer).setAttribute("style", "z-index: " + i + "; position: absolute;");
			document.getElementById(this.layers[i].htmlName+this.hiddenBuffer).setAttribute("style", "z-index: " + i + "; position: absolute;");
			this.layers[i].elementNumber = i;
		}
	}
	else
		console.error("Scm : undefined reference to pos " + pos);
} 
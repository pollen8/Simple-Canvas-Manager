/**
Provides ScmCore and ScmLayer.

@module Major Objects
**/

/**
* Create an instance of the SCM lib.
*
* @class ScmCore
* @constructor
* @param node {String} This is the html div where SCM will work.
* @param [{auto: false, interval: 50}] <b>autoUpdate</b> : Run (or not) SCM with auto update.
*/

function ScmCore(node, updateMode){
	
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
		this.updateMode = getValidObject(updateMode, {auto: false, interval: 50});
		
		// run updateLoop
		if (this.updateMode.auto)
			window.setInterval(this.update, this.updateMode.interval);
	}	
	else
		console.error("Simple Canvas Manager : #" + node + " doesn't exist !");
}

/**
* Add a layer.
*
* @method addLayer
* @deprecated soon
* @param name {String}
* @param zindex {Integer}
*/

ScmCore.prototype.addLayer = function(name, zindex) { // TODO : verifier qu'il n'existe pas
	
	var canvas = document.createElement('canvas');
	canvas.setAttribute("id", "scm" + name.charAt(0).toUpperCase() + name.slice(1));
	canvas.setAttribute("width", this.width);
	canvas.setAttribute("height", this.height);
	canvas.setAttribute("style", "z-index: " + zindex + "; position: absolute;");
	
	var newLayer = new ScmLayer(this, name, zindex);
	this.layers.push();
	this.content.appendChild(canvas);
	
	return newLayer;
}

/**
* Get a layer previously created.
* 
* @method getLayer
* @param name {String} Name of the Layer.
* @return {Object} Return a ScmLayer Object.
*/

ScmCore.prototype.getLayer = function(name) {
	
	for (var i = 0; i != this.layers.length; i++)
		if (this.layers[i].name == name)
			return this.layers[i];
				
	console.error("Simple Canvas Manager : undefined reference to " + name + " layer !");	
}

/**
* Update all the layers.<br />
* This method is called periodically if the ScmCore has been configured for (see above : updateMode).<br />
* This method is callable normally too.
* 
* @method update
*/

ScmCore.prototype.update = function() {
	console.log("Update !");
	
	// Some stuff !!!!
}

/* ScmLayer TODO setAutoUpdate */

/**
* Create a layer.<br />
* ScmLayer are unlimited and can be stacked on top / bottom of another.
*
* @class ScmLayer
* @constructor
* @deprecated soon
*/

function ScmLayer(lib, name, zindex) {
	
	this.name = name;
	this.zindex = zindex;
	this.lib = lib;
	this.htmlName = "scm" + name.charAt(0).toUpperCase() + name.slice(1);
	
	// Text Config
	this.textFont = "sans-serif";
	this.textSize = 10;
}

/**
* Return the html element of the layer. <br />
* Can be very usefull for ensure compatibility with other canvas.
* 
* @method getHtmlElement
* @return {Object} An Html object
*/

ScmLayer.prototype.getHtmlElement = function() {
	return document.getElementById(this.htmlName);
}

/**
* Return the canvas context of the layer.<br />
* Can be very usefull for ensure compatibility with other canvas.
* 
* @method getContext
* @param type {String} Context type (often : "2d").
* @return {Object} Provides methods and properties for natively drawing on the canvas.
*/

ScmLayer.prototype.getContext = function(type) {
	return this.getHtmlElement().getContext(type);
}

/**
* Set the layer's Background color.
* 
* @method setBackgroundColor
* @param color {String} A CSS color value (ex: #FF00FF).
*/

ScmLayer.prototype.setBackgroundColor = function(color) { // autoUpdate = false;
	var ctx = this.getContext("2d");
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, this.lib.width, this.lib.height);
}

/**
* Set the layer's Background image.
* 
* @method setBackgroundImg
* @param src {String} Relative or absolute url of an image.
*/

ScmLayer.prototype.setBackgroundImg = function(src) {	// autoUpdate = false;
	var ctx = this.getContext("2d"),
		img = new Image();
		
 	img.src = src;
	ctx.drawImage(img, 0, 0);
}

/**
* Set the layer's global Alpa.<br />
* Warning : this medthod provides unexpected behavior. 
* @beta
* 
* @method setAlpha
* @param value {Integer} Alpha value : between 0 and 1.
*/

ScmLayer.prototype.setAlpha = function(value) { // TODO : comportement inattendu
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

/**
* Draw an SCM drawable object (Circle, Text, Img ...)
* 
* @method draw
* @param drawable {Object} Need a <a href="../modules/Drawable%20Objects.html">drawable object</a>.
*/


ScmLayer.prototype.draw = function(object) {
	
	var ctx = this.getContext("2d");
	
	if (object.alpha)
	{
		ctx.save();
		ctx.globalAlpha = object.alpha;
	}
	
	if (object.color) 
		ctx.fillStyle = object.color;
	object.draw(ctx); // call the object's draw method
	
	if (object.alpha)
		ctx.restore();
}

/**
* Clear the layer to transparent (each pixel's RGBA value is equal to zero).
* 
* @method clear
*/

ScmLayer.prototype.clear = function() { // TODO : avec arguments
	
	var ctx = this.getContext("2d");
	ctx.clearRect(0, 0, this.lib.width, this.lib.height);
}

ScmLayer.prototype.getTextConfig = function() {
	return {font: this.textFont, size: this.textSize};
}

ScmLayer.prototype.setTextConfig = function(font, size) {
	this.textFont = font;
	this.textSize = size;
	
	// Set Canvas font
	this.getContext("2d").font = size + "px " + font;
}

/*
 * SCM UTILS
 */

function getValidObject(object, def){
	
	// Transform a missing object key to his default key
	// If the object not exist, the function return the default object
	// TODO : check key type (bool, string, integer ...)

	var ret = def;
	
	if (typeof(object) != "undefined")
		for (key in def)
			ret[key] = ((!object.hasOwnProperty(key)) ? (def[key]) : (object[key]));
	
	return ret;
}
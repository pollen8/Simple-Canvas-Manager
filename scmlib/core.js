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
* @param [updateMode={auto: false, interval: 50}] <b>autoUpdate</b> : Run (or not) SCM with auto update.
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
		if (this.updateMode.auto)
			window.setInterval(this.update.bind(this), this.updateMode.interval);
	}	
	else
		console.error("Simple Canvas Manager : #" + node + " doesn't exist !");
}

/**
* Push a layer in the ScmCore.
*
* @method push
* @param obj {Object} An ScmLayer object
*/

ScmCore.prototype.push = function(obj) { // TODO : verifier qu'il n'existe pas
	
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
* @return {Object} Return an ScmLayer Object.
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

	// Clear all layers
	for (var i = 0; i != this.layers.length; i++)
		if (typeof(this.layers[i]) != "undefined" && !this.layers[i].locked)
			this.layers[i].clear();
			
	// Draw all objects
}

/**
* Create a layer.<br />
* ScmLayer are unlimited and can be stacked on top / bottom of another.
*
* @class ScmLayer
* @constructor
* @param name {String} Name of the layer.
* @param zindex {Integer} Just a simple CSS z-index (the larger it is, the highest layer is)
* @param [locked=false] {Boolean} Is the layer is locked ? If true, the layer can't be automaticly updated by the ScmCore.
*/

function ScmLayer(name, zindex, locked) {
	
	this.name = name;
	this.zindex = zindex;
	this.htmlName = "scm" + name.charAt(0).toUpperCase() + name.slice(1);
	this.locked = locked || false;
	
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
	var ctx = this.getContext("2d"),
		width = ctx.canvas.clientWidth,
		height = ctx.canvas.clientHeight;
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);
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
	
	var ctx = this.getContext("2d"),
		width = ctx.canvas.clientWidth,
		height = ctx.canvas.clientHeight;
		
	ctx.clearRect(0, 0, width, height);
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

/**
* Lock the layer.<br />
* Now, the layer can't be automaticly updated by the ScmCore.
*
* @method lock
*/

ScmLayer.prototype.lock = function() {
	this.locked = true;
}

/**
* Unlock the layer.<br />
* Now, the layer can be automaticly updated by the ScmCore.
*
* @method unlock
*/

ScmLayer.prototype.unlock = function() {
	this.locked = false;
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
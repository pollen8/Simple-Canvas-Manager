// TODO : getALlObjects, undraw, fichier layer ?

/**
* Create a layer.<br />
* ScmLayer are unlimited and can be stacked on top / bottom of another.
*
* @namespace Scm
* @class Layer
* @constructor
* @param name {String} Name of the layer.
* @param zindex {Integer} Just a simple CSS z-index (the larger it is, the highest layer is)
* @param [locked=false] {Boolean} Is the layer is locked ? If true, the layer can't be automaticly updated by the ScmCore.
*/

Scm.Layer = function (name, zindex, locked) {
	
	this.name = name;
	this.zindex = zindex;
	this.htmlName = "scm" + name.charAt(0).toUpperCase() + name.slice(1);
	this.locked = locked || false;
	this.objects = [];
	
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

Scm.Layer.prototype.getHtmlElement = function() {
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

Scm.Layer.prototype.getContext = function(type) {
	return this.getHtmlElement().getContext(type);
}

/**
* Set the layer's Background color.<br />
* When setBackgroundColor is called, the layer is automaticly locked (see below)
* 
* @method setBackgroundColor
* @param color {String} A CSS color value (ex: #FF00FF).
*/

Scm.Layer.prototype.setBackgroundColor = function(color) { // autoUpdate = false;
	var ctx = this.getContext("2d"),
		width = ctx.canvas.clientWidth,
		height = ctx.canvas.clientHeight;
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);
	this.locked = true;
}

/**
* Set the layer's Background image.<br />
* When setBackgroundImg is called, the layer is automaticly locked (see below)
* 
* @method setBackgroundImg
* @param src {String} Relative or absolute url of an image.
*/

Scm.Layer.prototype.setBackgroundImg = function(src) {	// autoUpdate = false;
	var ctx = this.getContext("2d"),
		img = new Image();
		
 	img.src = src;
	ctx.drawImage(img, 0, 0);
	this.locked = true;
}

/**
* Set the layer's global Alpa.<br />
* Warning : this medthod provides unexpected behavior. 
* @beta
* 
* @method setAlpha
* @param value {Integer} Alpha value : between 0 and 1.
*/

Scm.Layer.prototype.setAlpha = function(value) { // TODO : comportement inattendu
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

Scm.Layer.prototype.exist = function(object) {
	
	for (var i = 0; i != this.objects.length; i++)
		if (this.objects[i] == object)
			return true;
			
	return false;
}

/**
* Draw an SCM drawable object (Circle, Text, Img ...)
* 
* @method draw
* @param drawable {Object} Need a <a href="../modules/Drawable%20Objects.html">drawable object</a>.
*/

Scm.Layer.prototype.draw = function(object) {
	
	if (!this.exist(object))
		this.objects.push(object);
	
	// var ctx = this.getContext("2d");
// 	
	// if (object.alpha)
	// {
		// ctx.save();
		// ctx.globalAlpha = object.alpha;
	// }
// 	
	// if (object.color) 
		// ctx.fillStyle = object.color;
	// object.draw(ctx); // call the object's draw method
	// //console.log(object);
// 	
	// if (object.alpha)
		// ctx.restore();
}

Scm.Layer.prototype.drawAll = function() {

	var ctx = this.getContext("2d"),
		object;
	
	for (var i = 0; i != this.objects.length; i++)
	{
		object = this.objects[i];
		if (object.alpha > 0 || object.currentEffect.property == "alpha") // optimization
		{
			ctx.save();
			ctx.globalAlpha = object.alpha;
			
			if (object.currentEffect.duration - GLOBAL_UPDATE_INTERVAL >= 0)
				{
					object[object.currentEffect.property] += object.currentEffect.variation;
					
					// reset limit
					if ((object.currentEffect.variation < 0 && object.currentEffect.limit > object[object.currentEffect.property]) ||
						(object.currentEffect.variation >= 0 && object[object.currentEffect.property] > object.currentEffect.limit))
						object[object.currentEffect.property] = object.currentEffect.limit;
						
					object.currentEffect.duration = object.currentEffect.duration - GLOBAL_UPDATE_INTERVAL;
					if (object.currentEffect.duration == 0) // the effect is finished
						Scm.Event.fire("effectDone");
				}
			
			if (object.color) 
				ctx.fillStyle = object.color;
			object.draw(ctx); // call the object's draw method
			
			ctx.restore();
		}
	}
}

/**
* Clear the layer to transparent (each pixel's RGBA value is equal to zero).
* 
* @method clear
*/

Scm.Layer.prototype.clear = function() { // TODO : voir pour le locked
	
	var ctx = this.getContext("2d"),
		width = ctx.canvas.clientWidth,
		height = ctx.canvas.clientHeight;
		
	ctx.clearRect(0, 0, width, height);
}

Scm.Layer.prototype.getTextConfig = function() {
	return {font: this.textFont, size: this.textSize};
}

Scm.Layer.prototype.setTextConfig = function(font, size) {
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

Scm.Layer.prototype.lock = function() {
	this.locked = true;
}

/**
* Unlock the layer.<br />
* Now, the layer can be automaticly updated by the ScmCore.
*
* @method unlock
*/

Scm.Layer.prototype.unlock = function() {
	this.locked = false;
}
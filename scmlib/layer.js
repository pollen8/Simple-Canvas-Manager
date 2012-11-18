/**
Provides ScmCore and ScmLayer.

@module Major Objects
**/

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

Scm.Layer = function (locked) {
	
	this.htmlName = "scmLayer";
	this.elementNumber;
	this.currentBuffer = null;
	this.locked = locked || false;
	this.objects = [];
	
	// Text Config
	this.textFont = "sans-serif";
	this.textSize = 10;
};

/**
* Return the html element of the layer. <br />
* Can be very usefull for ensure compatibility with other canvas.
* 
* @method getHtmlElement
* @deprecated
* @return {Object} An Html object
*/

Scm.Layer.prototype.getHtmlElement = function() {
	return document.getElementById(this.htmlName+this.currentBuffer);
}

/**
* Return the canvas context of the layer.<br />
* Can be very usefull for ensure compatibility with other canvas.
* 
* @method getContext
* @deprecated
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
	var ctxA = document.getElementById(this.htmlName+"a").getContext("2d"),
		ctxB = document.getElementById(this.htmlName+"b").getContext("2d"),
		widthA = ctxA.canvas.width,
		heightA = ctxA.canvas.height,
		widthB = ctxB.canvas.width,
		heightB = ctxB.canvas.height;
	
	// draw on the 2 canvas (double buffer)
	ctxA.fillStyle = color;
	ctxB.fillStyle = color;
	ctxA.fillRect(0, 0, widthA, heightA);
	ctxB.fillRect(0, 0, widthB, heightB);
	this.locked = true;
}

/**
* Set the layer's Background image.<br />
* When setBackgroundImg is called, the layer is automaticly locked (see below)
* 
* @method setBackgroundImg
* @param src {String} Relative or absolute url of an image.
*/

Scm.Layer.prototype.setBackgroundImg = function(src) {

	var img = new Image(),
		htmlName = this.htmlName;
		
 	img.onload = function() {

 		// draw on the 2 canvas (double buffer)
		document.getElementById(htmlName+"a").getContext("2d").drawImage(img, 0, 0);
		document.getElementById(htmlName+"b").getContext("2d").drawImage(img, 0, 0);
	}
	img.src = src;
	this.locked = true;
}

/**
*
* @beta
* @method setParallaxScrolling
*/

Scm.Layer.prototype.setParallaxScrolling = function() {

	var directions = {
		"left": {property: "x", variation: -1},
		"up": {property: "y", variation: -1},
		"right": {property: "x", variation: 1},
		"down": {property: "y", variation: 1},
	}

	if (arguments.length < 4)
		console.error("Scm : setParallaxScrolling needs at least 3 arguments.");
	else if (typeof(directions[arguments[0]]) == "undefined")
		console.error("Scm : setParallaxScrolling : Undefined reference to this direction");
	else
	{
		// define some usefull variable
		var nbSlides = 0,
			property = directions[arguments[0]].property,
			variation = arguments[1] * directions[arguments[0]].variation,
			width = GLOBAL_SCM_WIDTH * directions[arguments[0]].variation,
			height = GLOBAL_SCM_HEIGHT * directions[arguments[0]].variation,
			finalState = 0,
			date = new Date();

		for (var i = 2; i != arguments.length; i++)
		{
			var slide;
			if (arguments[0] == "left" || arguments[0] == "right")
			{
				slide = new Scm.Image(arguments[i], (i - 2) * -width, 0);
				finalState = width;
			}
			else
			{
				slide = new Scm.Image(arguments[i], 0, (i - 2) * -height);
				finalState = height;
			}
			
			// when a slide is finished an PSDone event is fired
			slide.createCustomEffect(property, variation, finalState, null, "PSDone" + date.getTime());
			this.draw(slide);
			nbSlides++;
		}

		// reset the finished slide at the good place to make a perfect loop
		Scm.Event.on("PSDone" + date.getTime(), function(e) {
			if (e.currentEffect.property == "y")
				e.y = (nbSlides - 1) * -height;
			else if (e.currentEffect.property == "x")
				e.x = (nbSlides - 1) * -width;
			e.createCustomEffect(property, variation, finalState, null, "PSDone" + date.getTime());
		});
	}
}

/**
* Set the layer's global Alpa.<br />
* Warning : this medthod provides unexpected behavior. 
* @beta
* 
* @method setGlobalAlpha
* @param value {Integer} Alpha value : between 0 and 1.
*/

Scm.Layer.prototype.setGlobalAlpha = function(value) { // TODO : comportement inattendu
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

/**
* Check if an object exist in this layer.
* 
* @method exist
* @param object {Object} Need a <a href="../modules/Drawable%20Objects.html">drawable object</a>.
*/

Scm.Layer.prototype.exist = function(object) {
	
	for (var i = 0; i != this.objects.length; i++)
		if (this.objects[i] == object)
			return true;
			
	return false;
}

/**
* Get all drawn object in this layer.
* 
* @method getAllObjects
* @beta
* @return {Array} An Array of <a href="../modules/Drawable%20Objects.html">drawable objects</a>.
*/

Scm.Layer.prototype.getAllObjects = function(filter, objects, justOne) { // TODO

	justOne = justOne || false;
	objects = objects || this.objects;
	
	if (!filter)
	{
		if (justOne)
			return objects[0];
		return objects;
	}

	var parser = new Scm.Utils.DrawableParser(filter),
		tokens = parser.getTokens(),
		ret = [],
		evalStr, next = false, idx = 3;

	for (var j = 0; j != objects.length; j++)
	{
		evalStr = "";
		for (var i = 0; i != tokens.length; i++)
		{
			if (next)
			{
				evalStr += " '" + objects[j][tokens[i]] + "'";
				next = false;
			}
			else if (i % idx == 0)
			{
				if (tokens[i] != "&&" && tokens[i] != "||")
					evalStr += " '" + objects[j][tokens[i]] + "'";
				else
				{
					evalStr += " " + tokens[i]
					next = true;
					idx += 1;
				}
			}
			else
				evalStr += " " + tokens[i];
		}
		//console.log(evalStr);
		if (eval(evalStr))
		{
			if (!justOne)
				ret.push(objects[j]);
			else
				return objects[j];
		}
	}
	return ret;
}

Scm.Layer.prototype.getOneObject = function(filter, objects) {

	return this.getAllObjects(filter, objects, true);
}

Scm.Layer.prototype.getClosestObject = function(filter, obj, objects) {

	var objs = this.getAllObjects(filter, objects),
		best = null, bestNbMoves = GLOBAL_SCM_WIDTH + GLOBAL_SCM_HEIGHT,
		x, y;

	for (var i = 0; i != objs.length; i++)
	{
		if (objs[i] != obj)
		{
			x = Math.abs(obj.x - objs[i].x);
			y = Math.abs(obj.y - objs[i].y);

			if (x == y && x < bestNbMoves)
			{
				bestNbMoves = x;
				best = objs[i];
			}
			else if ((x + y) < bestNbMoves)
			{
				bestNbMoves = x + y;
				best = objs[i];
			}
		}
	}

	return best;
}

/**
* Draw an SCM drawable object (Circle, Text, Img ...)
* 
* @method draw
* @param drawable {Object} Need one or more <a href="../modules/Drawable%20Objects.html">drawable object(s)</a>.
*/

Scm.Layer.prototype.draw = function () { // TODO : test
	
	if (arguments.length == 0)
		console.error("Scm : You should pass one or more drawable object for the method draw.");

	for (var i = 0; i < arguments.length; ++i)
		if (!this.exist(arguments[i]))
			this.objects.push(arguments[i]);
}

Scm.Layer.prototype.erase = function (object) { // BETA

	var found = false;

	for (var i = 0; i != this.objects.length && !found; i++)
	{
		if (this.objects[i] == object)
		{
			if (this.objects.length == 1)
				this.objects = [];
			else
				this.objects.splice(i, 1);
			found = true;
		}
	}

	if (!found)
		console.error("Scm : Undefined reference to object.");
} 

Scm.Layer.prototype.drawAll = function(buffer) {

	var ctx = document.getElementById(this.htmlName+buffer).getContext("2d"),
		object;
	
	// update scene if keys are down
	Scm.Event.keysHandler();

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
					if (object.currentEffect.duration == 0) // if the effect is finished
					{
						Scm.Event.fire(object.currentEffect.fireEventName, object); // fire an event (if defined)
						if (typeof(object.currentEffect.callback) != "undefined" && object.currentEffect.callback != null)
							(object.currentEffect.callback)(object); // call the callback (if defined)
					}
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

Scm.Layer.prototype.clear = function(buffer) { // TODO : voir pour le locked
	
	var ctx = document.getElementById(this.htmlName+buffer).getContext("2d"),
		width = ctx.canvas.width,
		height = ctx.canvas.height;

	ctx.clearRect(0, 0, width, height);
}

Scm.Layer.prototype.getTextConfig = function() { // TODO : doc
	return {font: this.textFont, size: this.textSize};
}

Scm.Layer.prototype.setTextConfig = function(font, size) { // TODO : doc
	this.textFont = font;
	this.textSize = size;
	
	// Set Canvas font
	this.getContext("2d").font = size + "px " + font;
}

/**
* Lock the layer.<br />
* Now, the layer can't be automaticly updated by the Scm.Core.
*
* @method lock
*/

Scm.Layer.prototype.lock = function() {
	this.locked = true;
}

/**
* Unlock the layer.<br />
* Now, the layer can be automaticly updated by the Scm.Core.
*
* @method unlock
*/

Scm.Layer.prototype.unlock = function() {
	this.locked = false;
}
/**
Provides some drawable objects.

@module Drawable Objects
**/

var Scm = Scm || {}; // Namespace

/**
* This is the Drawable object.
* All Class in this module should inherit of this object !
*
* @class Drawable
*/

var constructEvent = false;

var Drawable = function(x, y, color, alpha) { // TODO type
	
	this.x = x;
	this.y = y;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
	this.currentEffect = {
		duration: 0,
		property: null,
		variation: 0,
		limit: 0,
		fireEventName: null,
	};
	
	// construct all Drawable Events
	// When an effect is done Drawable.currentEffect will be reset
	// Using a boolean is an ugly method. I am looking for a good way ... 
	if (!constructEvent)
	{
		Scm.Event.on("effectDone", function(e) {
			this.currentEffect = {
				duration: 0,
				property: null,
				variation: 0,
				limit: 0,
				fireEventName: null,
			};
		});
		constructEvent = true;
	}
}

/**
* Set horizontal and vertical position.
*
* @method setPos
* @param x {Integer} New horizontal position.
* @param y {Integer} New vertical position.
*/

Drawable.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

/**
* Set color.
*
* @method setColor
* @param color {String} A CSS Color Value (like #00FF00).
*/

Drawable.prototype.setColor = function(color) {
	this.color = color;
}

/**
* Set an alpha value (between 0 and 1).
*
* @method setAlpha
* @param value {Integer} An alpha value (between 0 and 1).
*/

Drawable.prototype.setAlpha = function(value) {
	this.alpha = value;
}

Drawable.prototype.fadeIn = function(duration) {

	duration = duration || GLOBAL_UPDATE_INTERVAL;
	if (duration < GLOBAL_UPDATE_INTERVAL)
		console.error("SCM : the duration of the fadeIn event is lower than the Scm.Core Update Interval (" + GLOBAL_UPDATE_INTERVAL + " ms)");

	this.currentEffect = {
		duration: duration,
		property: "alpha",
		variation: ((1 - this.alpha) / (duration / GLOBAL_UPDATE_INTERVAL)),
		limit: 1,
		fireEventName: "effectDone",
	};
}

Drawable.prototype.fadeOut = function(duration) {

	duration = duration || GLOBAL_UPDATE_INTERVAL;
	if (duration < GLOBAL_UPDATE_INTERVAL)
		console.error("SCM : the duration of the fadeOut event is lower than the Scm.Core Update Interval (" + GLOBAL_UPDATE_INTERVAL + " ms)");
		
	this.currentEffect = {
		duration: duration,
		property: "alpha",
		variation: -((this.alpha - 0) / (duration / GLOBAL_UPDATE_INTERVAL)),
		limit: 0,
		fireEventName: "effectDone",
	};
}

Drawable.prototype.createCustomEffect = function(property, variation, finalState, eventName) {

	//check if the effect is possible
	var step1 = Math.abs(finalState - this[property]),
		step2 = Math.abs(finalState - (this[property] + variation)),
		duration;

	eventName = eventName || "effectDone";

	if (step2 >= step1)
	{
		console.log(property, variation, finalState);
		console.log("Scm : invalid customEffect (never ends)");
	}
	else
	{
		if (finalState < this[property])
			duration = Math.abs((this[property] - finalState) / variation) * GLOBAL_UPDATE_INTERVAL;
		else
			duration = Math.abs((finalState - this[property]) / variation) * GLOBAL_UPDATE_INTERVAL;

		// create effect
		this.currentEffect = {
			duration: duration,
			property: property,
			variation: variation,
			limit: finalState,
			fireEventName: eventName,
		};
	}
}

Drawable.prototype.hide = function() {
	this.alpha = 0;
}

Drawable.prototype.show = function() {
	this.alpha = 1;
}

Drawable.prototype.draw = function(ctx) {
	console.error("SCM : Error ! You should implement a draw method in your own object.");
}

/**
* Create a drawable pixel
*
* @namespace Scm
* @class Pixel
* @extends Drawable
* @constructor
* @param x {Integer} Vertical position.
* @param y {Integer} Horizontal position.
* @param color {String} A CSS Color value (like #00FF00).
* @param [alpha=1] {Integer} An alpha value (between 0 and 1).
*/

Scm.Pixel = function(x, y, color, alpha) {
	
	// inherit from Drawable
	Drawable.call(this, x, y, color, alpha);
}

// inherit from Drawable
Scm.Utils.constructInheritance(Scm.Pixel, Drawable);

Scm.Pixel.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, 1, 1);
}

/**
* Create a drawable rectangle
*
* @namespace Scm
* @class Rect
* @extends Drawable
* @constructor
* @param x {Integer} Vertical position.
* @param y {Integer} Horizontal position.
* @param width {Integer} Width value.
* @param height {Integer} Height value.
* @param color {String} A CSS Color value (like #00FF00).
* @param [alpha=1] {Integer} An alpha value (between 0 and 1).
*/

Scm.Rect = function(x, y, width, height, color, alpha) {

	// inherit from Drawable
	Drawable.call(this, x, y, color, alpha);
	
	this.width = width;
	this.height = height;
}

// inherited from DRAWABLE
Scm.Utils.constructInheritance(Scm.Rect, Drawable);

/**
* Set the width and height of the rectangle.
*
* @method setSize
* @param width {Integer} New width value.
* @param height {Integer} New height value.
*/

Scm.Rect.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
}

Scm.Rect.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

/**
* Create a drawable circle
*
* @namespace Scm
* @class Circle
* @extends Drawable
* @constructor
* @param x {Integer} Vertical position.
* @param y {Integer} Horizontal position.
* @param radius {Integer} The circle's radius.
* @param color {String} A CSS Color value (like #00FF00).
* @param [alpha=1] {Integer} An alpha value (between 0 and 1).
*/

Scm.Circle = function(x, y, radius, color, alpha) {
	
	// inherit from Drawable
	Drawable.call(this, x, y, color, alpha);
	
	this.radius = radius;
	this.diameter = radius * 2;
}

// inherit from Drawable
Scm.Utils.constructInheritance(Scm.Circle, Drawable);

Scm.Circle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

/**
* Create a drawable text object
*
* @namespace Scm
* @class Text
* @extends Drawable
* @constructor
* @param str {String} Text to display.
* @param x {Integer} Vertical position.
* @param y {Integer} Horizontal position.
* @param [color=#000000] {String} A CSS Color value (like #00FF00).
* @param [alpha=1] {Integer} An alpha value (between 0 and 1).
*/

Scm.Text = function(str, x, y, color, alpha) {

	// inherit from Drawable
	color = ((typeof(color) != "undefined") ? (color) : ("#000000"));
	Drawable.call(this, x, y, color, alpha);
	
	/**
	* @property str
	* @type String
	*/
	this.str = str;
}

// inherit from Drawable
Scm.Utils.constructInheritance(Scm.Text, Drawable);

Scm.Text.prototype.draw = function(ctx) {
	ctx.fillText(this.str, this.x, this.y);
}

/**
* Create a drawable image object
*
* @namespace Scm
* @class Image
* @extends Drawable
* @constructor
* @param src {String} Relative or absolute image url.
* @param x {Integer} Vertical position.
* @param y {Integer} Horizontal position.
* @param [alpha=1] {Integer} An alpha value (between 0 and 1).
*/

Scm.Image = function(src, x, y, alpha) {
	
	// inherit from Drawable
	Drawable.call(this, x, y, null, alpha);
	
	this.src = src;
}

// inherit from Drawable
Scm.Utils.constructInheritance(Scm.Image, Drawable);

/**
* Set the Image url 
*
* @method setSrc
* @param src {String} Relative or absolute url.
*/

Scm.Image.prototype.setSrc = function(src) {
	this.src = src;
}

Scm.Image.prototype.draw = function(ctx) {
	
	var img = new Image(),
		x = this.x,
		y = this.y;
	
	img.onload = function(){
 		ctx.drawImage(img, x, y);
	};
	img.src = this.src;
}
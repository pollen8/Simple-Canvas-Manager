/**
Provides some drawable objects.

@module Drawable Objects
**/

var Scm = Scm || {}; // Namespace

/**
* Create a drawable pixel
*
* @namespace Scm
* @class Pixel
* @constructor
*/

Scm.Pixel = function(x, y, color) { // TODO alpha
	this.x = x;
	this.y = y;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

Scm.Pixel.prototype.setAlpha = function(value) {
	this.alpha = value;
}

Scm.Pixel.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, 1, 1);
}

/**
* Create a drawable rectangle
*
* @namespace Scm
* @class Rect
* @constructor
*/

Scm.Rect = function(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

/**
* Set the Rectangle position
*
* @method setPos
* @param {Integer} x New horizontal position
* @param {Integer} y New vertical position
*/

Scm.Rect.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

Scm.Rect.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
}

Scm.Rect.prototype.setWidth = function(width) {
	this.width = width;
}

Scm.Rect.prototype.setHeight = function(height) {
	this.height = height;
}

Scm.Rect.prototype.setColor = function(color) {
	this.color = color;
}

Scm.Rect.prototype.setAlpha = function(value) {
	this.alpha = value;
}

Scm.Rect.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

/**
* Create a drawable circle
*
* @namespace Scm
* @class Circle
* @constructor
*/

Scm.Circle = function(x, y, diameter, color) {
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

/**
* Set the Circle position
*
* @method setPos
* @param {Integer} x New horizontal position
* @param {Integer} y New vertical position
*/

Scm.Circle.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

Scm.Circle.prototype.setDiameter = function(diameter) {
	this.diameter = diameter;
}

Scm.Circle.prototype.setColor = function(color) {
	this.color = color;
}

Scm.Circle.prototype.setAlpha = function(value) {
	this.alpha = value;
}

Scm.Circle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

/**
* Create a drawable text object
*
* @namespace Scm
* @class Text
* @constructor
*/

Scm.Text = function(str, x, y, color, alpha) {

	/**
	* @property str
	* @type String
	*/
	this.str = str;
	
	/**
	* @property x
	* @type Integer
	*/
	this.x = x;
	
	/**
	* @property y
	* @type Integer
	*/
	this.y = y;
	
	/**
	* @property color
	* @type String
	*/
	this.color = ((typeof(color) != "undefined") ? (color) : ("#000000"));
	
	/**
	* @property alpha
	* @type Integer
	*/
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

/**
* Set the Text position
*
* @method setPos
* @param {Integer} x New horizontal position
* @param {Integer} y New vertical position
*/

Scm.Text.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

Scm.Text.prototype.setAlpha = function(value) {
	this.alpha = value;
}

Scm.Text.prototype.draw = function(ctx) {
	ctx.fillText(this.str, this.x, this.y);
}

/**
* Create a drawable image object
*
* @namespace Scm
* @class Image
* @constructor
*/

Scm.Image = function(src, x, y, alpha) {
	
	this.src = src;
	this.x = x;
	this.y = y;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

/**
* Set the Image url 
*
* @method setSrc
* @param {String} src Relative or absolute url
*/

Scm.Image.prototype.setSrc = function(src) {
	this.src = img;
}

/**
* Set the Image position
*
* @method setPos
* @param {Integer} x New horizontal position
* @param {Integer} y New vertical position
*/

Scm.Image.prototype.setPos = function(x, y){	
	this.x = x;
	this.y = y;
}

Scm.Image.prototype.setX = function(y){	
	this.x = x;
}

Scm.Image.prototype.setY = function(y){	
	this.y = y;
}

Scm.Image.prototype.setAlpha = function(value) {
	this.alpha = value;
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
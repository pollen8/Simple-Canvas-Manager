/**
Provides some drawable objects.

@module Drawable Objects
**/

/**
* Create a drawable pixel
*
* @class ScmPixel
* @constructor
*/

function ScmPixel(x, y, color) { // TODO alpha
	this.x = x;
	this.y = y;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

ScmPixel.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmPixel.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, 1, 1);
}

/**
* Create a drawable rectangle
*
* @class ScmRect
* @constructor
*/

function ScmRect(x, y, width, height, color) {
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

ScmRect.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

ScmRect.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
}

ScmRect.prototype.setWidth = function(width) {
	this.width = width;
}

ScmRect.prototype.setHeight = function(height) {
	this.height = height;
}

ScmRect.prototype.setColor = function(color) {
	this.color = color;
}

ScmRect.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmRect.prototype.draw = function(ctx) {
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

/**
* Create a drawable circle
*
* @class ScmCircle
* @constructor
*/

function ScmCircle(x, y, diameter, color) {
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

ScmCircle.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

ScmCircle.prototype.setDiameter = function(diameter) {
	this.diameter = diameter;
}

ScmCircle.prototype.setColor = function(color) {
	this.color = color;
}

ScmCircle.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmCircle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

/**
* Create a drawable text object
*
* @class ScmText
* @constructor
*/

function ScmText(str, x, y, color, alpha) {

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

ScmText.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
}

ScmText.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmText.prototype.draw = function(ctx) {
	ctx.fillText(this.str, this.x, this.y);
}

/**
* Create a drawable image object
*
* @class ScmImage
* @constructor
*/

function ScmImage(src, x, y, alpha) {
	
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

ScmImage.prototype.setSrc = function(src) {
	this.src = img;
}

/**
* Set the Image position
*
* @method setPos
* @param {Integer} x New horizontal position
* @param {Integer} y New vertical position
*/

ScmImage.prototype.setPos = function(x, y){	
	this.x = x;
	this.y = y;
}

ScmImage.prototype.setX = function(y){	
	this.x = x;
}

ScmImage.prototype.setY = function(y){	
	this.y = y;
}

ScmImage.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmImage.prototype.draw = function(ctx) {
	
	var img = new Image(),
		x = this.x,
		y = this.y;
	
	img.onload = function(){
 		ctx.drawImage(img, x, y);
	};
	img.src = this.src;
}
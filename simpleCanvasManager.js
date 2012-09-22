
function SimpleCanvasManager(node, updateMode){
	
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

SimpleCanvasManager.prototype.addLayer = function(name, zindex, options) { // TODO : verifier qu'il n'existe pas
	
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

SimpleCanvasManager.prototype.getLayer = function(name) {
	
	for (var i = 0; i != this.layers.length; i++)
		if (this.layers[i].name == name)
			return this.layers[i];
				
	console.error("Simple Canvas Manager : undefined reference to " + name + " layer !");	
}

SimpleCanvasManager.prototype.update = function() {
	console.log("Update !");
	
	// Some stuff !!!!
}

/* ScmLayer TODO setAutoUpdate */

function ScmLayer(lib, name, zindex) {
	
	this.name = name;
	this.zindex = zindex;
	this.lib = lib;
	this.htmlName = "scm" + name.charAt(0).toUpperCase() + name.slice(1);
	
	// Text Config
	this.textFont = "sans-serif";
	this.textSize = 10;
}

// ScmLayer.getHtmlElement() : very usefull for compatibility

ScmLayer.prototype.getHtmlElement = function() {
	return document.getElementById(this.htmlName);
}

// ScmLayer.getContext() : very usefull for compatibility

ScmLayer.prototype.getContext = function(type) {
	return this.getHtmlElement().getContext(type);
}

ScmLayer.prototype.setBackgroundColor = function(color) { // autoUpdate = false;
	var ctx = this.getContext("2d");
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, this.lib.width, this.lib.height);
}

ScmLayer.prototype.setBackgroundImg = function(src) {	// autoUpdate = false;
	var ctx = this.getContext("2d"),
		img = new Image();
		
 	img.src = src;
	ctx.drawImage(img, 0, 0);
}

// Not documented yet

ScmLayer.prototype.setAlpha = function(value) { // TODO : comportement inattendu
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

// ScmLayer.draw() : Draw an SCM Object

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
 * SCM OBJECT : ScmPixel ScmRect ScmCircle ScmText
 */

/* ScmPixel */

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

/* ScmRect */

function ScmRect(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

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

/* ScmCircle */

function ScmCircle(x, y, diameter, color) {
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.color = color;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

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

// ScmText

function ScmText(str, x, y, color, alpha) {

	this.str = str;
	this.x = x;
	this.y = y;
	this.color = ((typeof(color) != "undefined") ? (color) : ("#000000"));
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

ScmText.prototype.setAlpha = function(value) {
	this.alpha = value;
}

ScmText.prototype.draw = function(ctx) {
	ctx.fillText(this.str, this.x, this.y);
}

// ScmImage

function ScmImage(src, x, y, alpha) {
	
	this.src = src;
	this.x = x;
	this.y = y;
	this.alpha = ((typeof(alpha) != "undefined") ? (alpha) : (1));
}

ScmImage.prototype.setSrc = function(src) {
	this.src = img;
}

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
	
	var img = new Image();
	
	img.src = this.src;
	ctx.drawImage(img, this.x, this.y);
}

/*
 * SCM UTILS
 */

// Transform a missing object key to his default key
// If the object not exist, the function return the default object
// TODO : check key type (bool, string, integer ...)

function getValidObject(object, def){
	
	var ret = def;
	
	if (typeof(object) != "undefined")
		for (key in def)
			ret[key] = ((!object.hasOwnProperty(key)) ? (def[key]) : (object[key]));
	
	return ret;
}



// TODO : ScmArc ScmTriangle ScmCustom ScmLine fade in fade out

function SimpleCanvasManager(node){
	
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

/* ScmLayer */

function ScmLayer(lib, name, zindex) {
	
	this.name = name;
	this.zindex = zindex;
	this.lib = lib;
	this.htmlName = "scm" + name.charAt(0).toUpperCase() + name.slice(1);
}

ScmLayer.prototype.getHtmlElement = function() {
	return document.getElementById(this.htmlName);
}

ScmLayer.prototype.getContext = function(type) {
	return this.getHtmlElement().getContext(type);
}

ScmLayer.prototype.setBackgroundColor = function(color) {	
	var ctx = this.getContext("2d");
	
	ctx.fillStyle = color;
	this.update(ctx);
}

ScmLayer.prototype.setBackgroundImg = function(src) {	
	var ctx = this.getContext("2d"),
		img = new Image();
		
 	img.src = src;
	ctx.drawImage(img, 0, 0);
}

ScmLayer.prototype.setAlpha = function(value) {
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

ScmLayer.prototype.update = function(ctx) {
	ctx.fillRect(0, 0, this.lib.width, this.lib.height);
}

ScmLayer.prototype.drawShape = function(shape) {
	
	var ctx = this.getContext("2d");
	
	ctx.fillStyle = shape.color;
	if (shape.scmFormType == "ScmPixel")
  		ctx.fillRect(shape.x, shape.y, 1, 1);
	else if (shape.scmFormType == "ScmRect")
  		ctx.fillRect(shape.x, shape.y, shape.width, shape.height);	
}

ScmLayer.prototype.clear = function() { // TODO : avec arguments
	
	var ctx = this.getContext("2d");
	ctx.clearRect(0, 0, this.lib.width, this.lib.height);
}

/* ScmPixel */

function ScmPixel(x, y, color) { // TODO alpha
	this.x = x;
	this.y = y;
	this.color = color;
	this.scmFormType = "ScmPixel";
}

/* ScmRect */

function ScmRect(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.scmFormType = "ScmRect";
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

// TODO : drawImg, drawShape, clear, resize, intern update
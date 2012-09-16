
function SimpleCanvasManager(node){
	
	if ((this.node = document.getElementById(node)))
	{
		this.node.setAttribute("style", "position: relative;");
		this.width = this.node.clientWidth;
		this.height = this.node.clientHeight;
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
	canvas.setAttribute("style", "z-index: " + zindex + ";");
	canvas.setAttribute("style", "position: absolute;");
	
	var newLayer = new ScmLayer(this, name, zindex);
	this.layers.push();
	this.node.appendChild(canvas);
	
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

ScmLayer.prototype.setAlpha = function(value) {
	var ctx = this.getContext("2d");
	
	ctx.globalAlpha = value;
	this.update(ctx);
}

ScmLayer.prototype.update = function(ctx) {
	ctx.fillRect(0, 0, this.lib.width, this.lib.height);
}

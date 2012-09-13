
function SimpleCanvasManager(node){
	
	if ((this.node = document.getElementById(node)))
	{
		this.width = this.node.clientWidth;
		this.height = this.node.clientHeight;
	}	
	else
		console.error("Simple Canvas Manager : #" + node + " doesn't exist !");
}

SimpleCanvasManager.prototype.addLayer = function(name, zindex) {
	
	var canvas = document.createElement('canvas');
	canvas.setAttribute("id", "scm" + name.charAt(0).toUpperCase() + name.slice(1));
	canvas.setAttribute("width", this.width);
	canvas.setAttribute("height", this.height);
	canvas.setAttribute("style", "z-index: " + zindex + ";");
	
	this.node.appendChild(canvas);
}


/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new SimpleCanvasManager("node");


	var one = scm.addLayer("one", 1),
		pixel = new ScmPixel(0, 0, "#FF0000");
	
	one.drawShape(pixel);
	
	one.drawShape(new ScmPixel(25, 25, "#000000"));
	one.drawShape(new ScmRect(50, 50, 200, 100, "#000000"));
	//one.clear();
}

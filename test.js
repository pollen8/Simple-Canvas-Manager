
/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new SimpleCanvasManager("node", {auto: true, interval: 1500});


	var one = scm.addLayer("one", 1),
		pixel = new ScmPixel(0, 0, "#FF0000");
	
	one.draw(pixel);
	
	//one.setAlpha(0); 
	one.draw(new ScmPixel(25, 25, "#000000"));
	one.draw(new ScmRect(50, 50, 200, 100, "#000000"));
	one.draw(new ScmCircle(200, 200, 20, "#FF0000"));
	one.draw(new ScmImage("http://s3.amazonaws.com/image.blingee.com/images17/content/output/000/000/000/042/635321387_1266394.gif?4", 300, 300));
	
	var text = new ScmText("Hello", 250, 250, "#008800");
	one.setTextConfig("Arial", 140);
	one.draw(text);
	//one.clear();
}

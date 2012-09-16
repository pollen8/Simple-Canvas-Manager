
/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new SimpleCanvasManager("node");


	var one = scm.addLayer("one", 1),
		two = scm.addLayer("two", 2),
		three = scm.addLayer("three", 3);
		
	one.setAlpha(0.1);
	one.setBackgroundColor("#FF0000");
	two.setAlpha(0.1);
	two.setBackgroundColor("#00FF00");
	three.setBackgroundImg("http://www.pimero.com/en/images/menu_features/cloud.png");
}

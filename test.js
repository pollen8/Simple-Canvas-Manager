
/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new SimpleCanvasManager("node");


	var one = scm.addLayer("one", 2);
		//two = scm.getLayer("two");
		
	one.setBackgroundColor("#FF0000");
	//two.setBackgroundColor("#00FF00");
	//one.setAlpha(0);
	
	// for (alpha = 10; alpha != 0; alpha--) {
// 		
		// one.setAlpha(alpha / 10);
		// two.setAlpha((10 - alpha) / 10);		
	// }
}
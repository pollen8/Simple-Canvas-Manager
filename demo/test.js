
/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new ScmCore("node"),
		ballLayer = new ScmLayer("ball", 2),
		bg = new ScmLayer("bg", 1),
		ball = new ScmCircle(200, 200, 20, "#FF0000");
		
	scm.push(ballLayer);
	scm.push(bg);
	
	bg.setBackgroundColor("#0000FF");
	ballLayer.draw(ball);
	
	scm.events.on("UP_ARROW", function(){
		ball.setPos(ball.x, ball.y - 10);
	}).on("DOWN_ARROW", function(){
		ball.setPos(ball.x, ball.y + 10);
	}).on("RIGHT_ARROW", function(){
		ball.setPos(ball.x + 10, ball.y);
	}).on("LEFT_ARROW", function(){
		ball.setPos(ball.x - 10, ball.y);
	});
	
	// document.onkeydown = function(e) {
	 	// var e = window.event || e;
// 	
		// console.log(e.keyCode);
			// if (e.keyCode == 38)
				// ball.setPos(ball.x, ball.y - 10);
			// if (e.keyCode == 40)
				// ball.setPos(ball.x, ball.y + 10);
	// }
}



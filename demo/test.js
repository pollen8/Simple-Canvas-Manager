
/*
 * This is a test file
 */

window.onload = function() {
	
	var scm = new Scm.Core("node"),
		ballLayer = new Scm.Layer("ball", 2),
		bg = new Scm.Layer("bg", 1),
		ball = new Scm.Circle(200, 200, 20, "#FF0000", 0),
		ball1 = new Scm.Circle(20, 20, 20, "#FF0000", 0)
		ball2 = new Scm.Circle(78, 250, 30, "#00FF00", 0);
		ball3 = new Scm.Circle(400, 250, 50, "#00FF00", 0);
		pixel = new Scm.Pixel(10, 10, "#000000", 0);
		
	scm.push(ballLayer);
	scm.push(bg);
	
	bg.setBackgroundColor("#0000FF");
	ballLayer.draw(ball);
	ballLayer.draw(ball1);
	ballLayer.draw(ball2);
	ballLayer.draw(ball3);
	ballLayer.draw(pixel);
		
	Scm.Event.on("a", function(){
		ball.fadeIn();
		ball1.fadeIn(2000);
		ball2.fadeIn(3000);
		ball3.fadeIn(10000);
	}).on("b", function(){
		ball.fadeOut(3000);
		ball1.fadeOut(2000);
		ball2.fadeOut(1000);
		ball3.fadeOut(100);
	}).on("up_arrow", function(){
		ball.setPos(ball.x, ball.y - 10);
	}).on("down_arrow", function(){
		ball.setPos(ball.x, ball.y + 10);
	}).on("right_arrow", function(){
		ball.setPos(ball.x + 10, ball.y);
	}).on("left_arrow", function(){
		ball.setPos(ball.x - 10, ball.y);
	});
	
	Scm.Event.on("click", function(e) {
		ballLayer.draw(new Scm.Circle(e.x, e.y, 20, "#FF00FF"));
	});
}



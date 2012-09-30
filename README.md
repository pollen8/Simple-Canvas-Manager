#Simple Canvas Manager

Simple Canvas Manager (SCM) is a javascript library that offers you methods to work easily with the HTML5 canvas element.

Local Documentation
-------------------

1) Download and install Node.js<br />
2) Run npm -g install yuidocjs.<br />
3) Run yuidoc . at the top of SCM source tree.<br /><br />
<a target="_blank" href="http://yui.github.com/yuidoc/"><I>More informations</I></a>

Online Documentation
--------------------

soon


Why SCM is powerfull ?
----------------------

Assuming a simple example (live demo <a href="#">here</a>).
This is how you can implement it with native js code :

```js
window.onload = function() {
	
	var ballCtx = document.getElementById("cBall").getContext("2d"),
		bgCtx = document.getElementById("cBg").getContext("2d"),
		ballx = 200,
		bally = 200;
	
	function update(){

		// clear
		bgCtx.clearRect(0, 0, bgCtx.canvas.clientWidth, bgCtx.canvas.clientHeight);
		ballCtx.clearRect(0, 0, ballCtx.canvas.clientWidth, ballCtx.canvas.clientHeight);
		
		// draw background
		bgCtx.fillStyle = "#0000FF";
		bgCtx.fillRect(0, 0, bgCtx.canvas.clientWidth, bgCtx.canvas.clientHeight);
	
		// draw ball
		ballCtx.beginPath();
		ballCtx.fillStyle = "#FF0000";
		ballCtx.arc(ballx, bally, 20, 0, Math.PI * 2, true);
		ballCtx.closePath();
		ballCtx.fill();
	}
	
	document.onkeydown = function(e) {
	 	var e = window.event || e;
		
		if (e.keyCode == 37)
			ballx -= 10;
		else if (e.keyCode == 38)
			bally -= 10;
		else if (e.keyCode == 39)
			ballx += 10;
		else if (e.keyCode == 40)
			bally += 10;
	}
	
	window.setInterval(update, 10);
}
```

Now, this how you can implement it with SCM :

```js
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
}
```
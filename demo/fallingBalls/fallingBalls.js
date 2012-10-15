var scm = new Scm.Core("node"),
	one = new Scm.Layer("one", 2),
	bg = new Scm.Layer("bg", 1);

scm.push(one);
scm.push(bg);

bg.setBackgroundImg("fallingBalls/bg.gif");

Scm.Event.on("click", function(e) {
	one.draw(new fallingBall(e.x, e.y));
});

Scm.Event.on("coreUpdate", function(e) {
	var all = one.getAllObjects(),
		testPos;

	for (var i = 0; i != all.length; i++)
	{
		testPos = all[i].y + all[i].radius + (1 * (all[i].cycle / 10));
		if (testPos <= scm.height)
		{
			all[i].y = testPos - all[i].radius;
			all[i].cycle++;
		}
		else
		{
			all[i].y = scm.height - all[i].radius;
			all[i].fadeOut(2000);
		}
	}
});

var fallingBall = function(x, y) {
	
	this.cycle = 0;
	Scm.Circle.call(this, x, y, 15, "#279bd6", 0.75); // call the Circle constructor
}

Scm.Utils.constructInheritance(fallingBall, Scm.Circle); // say that fallingBall inherit of Scm.Circle
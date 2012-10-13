window.onload = function() {
	
	var scm = new Scm.Core("node"),
		one = new Scm.Layer("one", 2), // TODO auto z-index
		bg = new Scm.Layer("bg", 1);

	scm.push(one); // TODO multiple layer && auto z-index
	scm.push(bg);
	
	bg.setBackgroundColor("#0000FF");

	Scm.Event.on("click", function(e) {

		var test = new fallingBall(e.x, e.y);
		one.draw(test);
	});

	Scm.Event.on("coreUpdate", function(e) {
		var all = one.getAllObjects(), // TODO filter "WHERE field = something"
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
				all[i].y = scm.height - all[i].radius;
		}
	});
}

var fallingBall = function(x, y) {
	
	this.cycle = 0;
	Scm.Circle.call(this, x, y, 10, "#FF00FF", 0.9); // call the Circle constructor
}

Scm.Utils.constructInheritance(fallingBall, Scm.Circle); // say that fallingBall inherit of Scm.Circle
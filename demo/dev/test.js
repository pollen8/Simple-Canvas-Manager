window.onload = function() {

	var scm = new Scm.Core("node"),
		one = new Scm.Layer("one", 2), // TODO auto z-index
		bg = new Scm.Layer("bg", 1);

	scm.push(one); // TODO multiple layer && auto z-index
	scm.push(bg);

	bg.setBackgroundImg("bg.gif");
	//var  i = 0;

	Scm.Event.on("click", function(e) {
		one.draw(new fallingBall(e.x, e.y));
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
			{
				all[i].y = scm.height - all[i].radius;
				all[i].fadeOut(2000);
				//one.erase(all[i]);
			}
		}
	});
}

var fallingBall = function(x, y) {
	
	this.cycle = 0;
	Scm.Circle.call(this, x, y, 15, "#279bd6", 0.75); // call the Circle constructor
}

Scm.Utils.constructInheritance(fallingBall, Scm.Circle); // say that fallingBall inherit of Scm.Circle
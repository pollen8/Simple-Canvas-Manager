var scm = new Scm.Core("node"),
	bg = new Scm.Layer("bg", 1),
	psM = new Scm.Layer("two", 3),
	ship = new Scm.Layer("ship", 4),
	psB = new Scm.Layer("three", 5);

scm.push(bg);
scm.push(psM);
scm.push(psB);
scm.push(ship);

bg.setBackgroundImg("parallaxScrolling/bg.jpg");
psB.setParallaxScrolling("left", 5, "parallaxScrolling/psBig1.png", "parallaxScrolling/psBig2.png", "parallaxScrolling/psBig3.png");
psM.setParallaxScrolling("left", 3, "parallaxScrolling/psMid1.png", "parallaxScrolling/psMid2.png", "parallaxScrolling/psMid3.png");
ship.draw(new Scm.Image("parallaxScrolling/ship.gif", 200, 180));
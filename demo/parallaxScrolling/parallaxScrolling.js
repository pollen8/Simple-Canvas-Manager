var scm = new Scm.Core("node"),
	bg = new Scm.Layer("bg", 1),
	psM = new Scm.Layer("two", 3),
	ship = new Scm.Layer("ship", 4),
	psB = new Scm.Layer("three", 5);

scm.push(bg);
scm.push(psM);
scm.push(psB);
scm.push(ship);

var path = "parallaxScrolling/misc/";

bg.setBackgroundImg(path+"bg.jpg");
psB.setParallaxScrolling("left", 5, path+"psBig1.png", path+"psBig2.png", path+"psBig3.png");
psM.setParallaxScrolling("left", 3, path+"psMid1.png", path+"psMid2.png", path+"psMid3.png");
ship.draw(new Scm.Image(path+"ship.gif", 200, 180));
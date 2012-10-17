var scm = new Scm.Core("node"),
	bg = new Scm.Layer(),
	psM = new Scm.Layer(),
	ship = new Scm.Layer(),
	psB = new Scm.Layer();

scm.push(bg, psM, ship, psB);

var path = "parallaxScrolling/misc/";

bg.setBackgroundImg(path+"bg.jpg");
psB.setParallaxScrolling("left", 5, path+"psBig1.png", path+"psBig2.png", path+"psBig3.png");
psM.setParallaxScrolling("left", 3, path+"psMid1.png", path+"psMid2.png", path+"psMid3.png");
ship.draw(new Scm.Image(path+"ship.gif", 200, 180));

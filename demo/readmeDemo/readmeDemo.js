var scm = new Scm.Core("node"),
    ballLayer = new Scm.Layer(),
    bg = new Scm.Layer(),
    ball = new Scm.Circle(200, 200, 20, "#ff5a18");

scm.push(bg, ballLayer);

bg.setBackgroundColor("#4cb7ee");
ballLayer.draw(ball);

Scm.Event.on("up_arrow", function(){
    ball.setPos(ball.x, ball.y - 10);
}).on("down_arrow", function(){
    ball.setPos(ball.x, ball.y + 10);
}).on("right_arrow", function(){
    ball.setPos(ball.x + 10, ball.y);
}).on("left_arrow", function(){
    ball.setPos(ball.x - 10, ball.y);
});
var Actor = function(color) {
                this.initialize(color);
            }
var p = Actor.prototype = new createjs.Shape();
p.pixelsPerSecond = 100;
p.initialize = function(color) {
    var width = 50;
    var height = 50;
    p.graphics.beginFill(color).drawRoundRect(0,0,width,height, 10);
}
p.movementCalculation = function(delta) {
    return (delta)/1000*p.pixelsPerSecond;
}
p.moveUp = function(delta) {
    this.y -= this.movementCalculation(delta);
}
p.moveDown = function(delta) {
    this.y += this.movementCalculation(delta);
}
p.moveLeft = function(delta) {
    this.x -= this.movementCalculation(delta);
}
p.moveRight = function(delta) {
    this.x += this.movementCalculation(delta);
}
window.Actor = Actor;



function init() {
    var stage = new createjs.Stage("demoCanvas");
    var myActor = stage.addChild(new Actor("#000"));
    myActor.x = 100;
    myActor.y = 100;
    var up = false;
    var down = false;
    var left = false;
    var right = false;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
        if (key.isPressed('up') || key.isPressed('w')) {
            myActor.moveUp(event.delta);
        }
        if (key.isPressed('down') || key.isPressed('s')) {
            myActor.moveDown(event.delta);
        }
        if (key.isPressed('left') || key.isPressed('a')) {
            myActor.moveLeft(event.delta);
        }
        if (key.isPressed('right') || key.isPressed('d')) {
            myActor.moveRight(event.delta);
        }
    }
}

/*
function init() {
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();

    circle.addEventListener("click", function(e){
        console.log("hello")
        circle.x += 50
        stage.update()
    })
}
*/




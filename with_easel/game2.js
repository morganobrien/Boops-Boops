
var Actor = function(color, w, h) {
                this.initialize(color, w, h);
            }

var p = Actor.prototype = new createjs.Shape();
p.pixelsPerSecond = 100;

p.initialize = function(color, w, h) {
    p.width = w;
    p.height = h;
    p.graphics.beginFill(color).drawRect(0,0,w,h);
}
p.movementCalculation = function(delta) {
    return (delta)/1000*p.pixelsPerSecond;
}
p.moveUp = function(delta) {
    if(this.y-this.movementCalculation(delta) > 0)
        this.y -= this.movementCalculation(delta);
}
p.moveDown = function(delta) {
    if(this.y+this.movementCalculation(delta)+this.height < 500)
        this.y += this.movementCalculation(delta);
}
p.moveLeft = function(delta) {
    if(this.x-this.movementCalculation(delta)> 0)
        this.x -= this.movementCalculation(delta);
}
p.moveRight = function(delta) {
    if(this.x+this.movementCalculation(delta)+this.height < 500)
        this.x += this.movementCalculation(delta);
}
//window.Actor = Actor;


function checkCollision(rect1, rect2){
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}



function init() {

    var stage = new createjs.Stage("demoCanvas");
    var myActor = stage.addChild(new Actor("#000000",50,50));
    myActor.x = 100;
    myActor.y = 100;

    var target = stage.addChild(new Actor("#FF0000",50,50));
    target.x = 400;
    target.y = 400;


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
        if (checkCollision(myActor, target)){
            console.log("hit")
            target.x = Math.random()*500
            target.y = Math.random()*500
        }

    }
}





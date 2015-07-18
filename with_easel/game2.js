
var Actor = function(color, w, h) {
    this.pixelsPerSecond = 100;

    this.width = w;
    this.height = h;
    this.graphics.beginFill(color).drawRect(0,0,w,h);

    this.movementCalculation = function(delta) {
        return (delta)/1000*this.pixelsPerSecond;
    }
    this.moveUp = function(delta) {
        if(this.y-this.movementCalculation(delta) > 0)
            this.y -= this.movementCalculation(delta);
    }
    this.moveDown = function(delta) {
        if(this.y+this.movementCalculation(delta)+this.height < 500)
            this.y += this.movementCalculation(delta);
    }
    this.moveLeft = function(delta) {
        if(this.x-this.movementCalculation(delta)> 0)
            this.x -= this.movementCalculation(delta);
    }
    this.moveRight = function(delta) {
        if(this.x+this.movementCalculation(delta)+this.height < 500)
            this.x += this.movementCalculation(delta);
    }
}

function move(shape){

}

Actor.prototype = new createjs.Shape();

//window.Actor = Actor;


function checkCollision(rect1, rect2){
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}

function checkCollisionWithCircle(rect, circle){
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.r)) { return false; }
    if (distY > (rect.height/2 + circle.r)) { return false; }

    if (distX <= (rect.width/2)) { return true; }
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

function init() {

    var stage = new createjs.Stage("demoCanvas");
    var myActor = stage.addChild(new Actor("#000000",50,50));
    myActor.x = 100;
    myActor.y = 100;

    target = stage.addChild(new createjs.Shape());
    target.r = 45;
    target.graphics.beginFill("red").drawCircle(0,0,target.r)
            .beginFill("white").drawCircle(0,0,30)
            .beginFill("red").drawCircle(0,0,15);
    target.x = 300;
    target.y = 380;


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
        if (checkCollisionWithCircle(myActor, target)){
            console.log("hit")
            target.x = Math.random()*500
            target.y = Math.random()*500
        }

    }
}





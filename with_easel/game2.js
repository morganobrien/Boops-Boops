
/*
function Actor(color, w, h) {
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


Actor.prototype = new createjs.Shape();
*/

//window.Actor = Actor;

pixelsPerSecond = 100;
movementCalculation = function(delta) {
    return (delta)/1000*pixelsPerSecond;
}
moveUp = function(s, delta) {
    if(s.y-movementCalculation(delta) > 0)
        s.y -= movementCalculation(delta);
}
moveDown = function(s, delta) {
    if(s.y+ movementCalculation(delta)+s.height < 500)
        s.y += movementCalculation(delta);
}
moveLeft = function(s, delta) {
    if(s.x-movementCalculation(delta)> 0)
        s.x -= movementCalculation(delta);
}
moveRight = function(s,delta) {
    if(s.x+movementCalculation(delta)+s.height < 500)
        s.x += movementCalculation(delta);
}


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

    var stage = new createjs.Stage("mainCanvas");
    var myActor = stage.addChild(new createjs.Shape());
    myActor.width=50
    myActor.height=50
    myActor.graphics.beginFill("#000000").drawRect(0,0,myActor.width,myActor.height);
    myActor.x = 100;
    myActor.y = 100;
    score1 = 0

    var s2 = stage.addChild(new createjs.Shape());
    s2.width=50
    s2.height=50
    s2.graphics.beginFill("#FF0000").drawRect(0,0,s2.width,s2.height);
    s2.x = 200;
    s2.y = 200;
    score2 =0

    timer = 30

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

    setInterval(function (){
        if(timer>0){
            timer -= 1
        }
    }, 1000);

	function tick(event) {

        if(timer==0){
            $("#score").remove()
            if (score1 > score2){
                header = "<h1>Team 1 is the winner</h1><br>"
            }
            else if (score2 > score1){
                header = "<h1>Team 2 is the winner</h1><br>"
            }
            else{
                header = "<h1>It's a tie</h1>"
            }
            $("#Body").html(header + "<h4>Team 1 Final Score: " + score1 + "<br>Team 2 Final Score: " + score2 +"</h4>")
            return
        }
        if (key.isPressed('up')) {
            moveUp(myActor, event.delta);
        }
        if (key.isPressed('down')) {
            moveDown(myActor,event.delta);
        }
        if (key.isPressed('left')) {
            moveLeft(myActor,event.delta);
        }
        if (key.isPressed('right')) {
            moveRight(myActor,event.delta);
        }
        if (key.isPressed('w')) {
            moveUp(s2, event.delta);
        }
        if (key.isPressed('s')) {
            moveDown(s2,event.delta);
        }
        if (key.isPressed('a')) {
            moveLeft(s2,event.delta);
        }
        if (key.isPressed('d')) {
            moveRight(s2,event.delta);
        }

        if (checkCollisionWithCircle(myActor, target)){
            console.log("hit")

            target.x = Math.random()*500
            target.y = Math.random()*500
            score1 += 1
        }
        if (checkCollisionWithCircle(s2, target)){
            console.log("hit")

            target.x = Math.random()*500
            target.y = Math.random()*500
            score2 += 1
        }

    $("#score").html("Team 1 Score: " + score1 + "<br> Team 2 Score: " + score2 + "<br> Time Left: " + timer);

    }
}





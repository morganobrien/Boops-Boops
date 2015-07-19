
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
function reorderHighScores(score){
    if (score > parseInt(localStorage.getItem("High Score 1"))){
        localStorage.setItem("High Score 2", localStorage.getItem("High Score 1"));
        localStorage.setItem("High Score 3", localStorage.getItem("High Score 2"));
        localStorage.setItem("High Score 1", String(score));
    }
    else if (score > parseInt(localStorage.getItem("High Score 2"))){
        localStorage.setItem("High Score 3", localStorage.getItem("High Score 2"));
        localStorage.setItem("High Score 2", String(score));
    }
    else{
        localStorage.setItem("High Score 3", String(score));
    }
}

function init() {

    var stage = new createjs.Stage("mainCanvas");
    var myActor = stage.addChild(new createjs.Shape());
    myActor.width=50
    myActor.height=50
    myActor.graphics.beginFill("#000000").drawRect(0,0,myActor.width,myActor.height);
    myActor.x = 100;
    myActor.y = 100;
    score = 0

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
            body = ""
            header = "<h1> Game Over </h1><br>"
            body += header
            body += "<h4>Final Score: " + score + "</h4>"
            if (score > parseInt(localStorage.getItem("High Score 3"))){
                reorderHighScores(score)
                body += "<br> <h2>!! New High Score !!</h2>"
            }
            body += "<br> High Score 1: " + localStorage.getItem("High Score 1") + "<br>"
            body += "<br> High Score 2: " + localStorage.getItem("High Score 2") + "<br>"
            body += "<br> High Score 3: " + localStorage.getItem("High Score 3") + "<br>"
            $("#Body").html(body)
            return 0
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

        if (checkCollisionWithCircle(myActor, target)){
            console.log("hit")
            empty = false
            while (empty == false){
                target.x = Math.random()*500
                target.y = Math.random()*500
                if ((! checkCollisionWithCircle(myActor, target))){
                    empty = true
                }
            }
            score += 1
        }
    if (timer < 10){
        $("#score").html("Score: " + score + "<br> Time Left: 0" + timer);
    }
    else{
        $("#score").html("Score: " + score + "<br> Time Left: " + timer);
    }

    }
}





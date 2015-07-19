
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
function reorderHighScores(name, score){
    if (score > parseInt(JSON.parse(localStorage.getItem("High Score 1"))[1])){
        console.log("Changed all")
        localStorage.setItem("High Score 3", localStorage.getItem("High Score 2"));
        localStorage.setItem("High Score 2", localStorage.getItem("High Score 1"));
        localStorage.setItem("High Score 1", JSON.stringify([name, score]));
    }
    else if (score > parseInt(JSON.parse(localStorage.getItem("High Score 2"))[1])){
        console.log("Replaced 2nd and 3rd")
        localStorage.setItem("High Score 3", localStorage.getItem("High Score 2"));
        localStorage.setItem("High Score 2", JSON.stringify([name, score]));
    }
    else{
        console.log("Changed 3rd")
        localStorage.setItem("High Score 3", JSON.stringify([name, score]));
    }
}

function init1player() {

    $("#Body").append("<h1><div id= score class = label label-default></div></h1>");
    $("#Body").append("<canvas id=mainCanvas width=500 height=500></canvas>");

    $(".centered").remove();
    $(".btn").remove();

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

    countdown = setInterval(function (){
        if(timer>0){
            timer -= 1
        }
    }, 1000);

    setTimeout(function(){
        $("#score").remove()
        $("#mainCanvas").remove()
        $("#Body").append("<div id = gameOver class=centered></div>");
        $("#gameOver").append("<h1 class=centered> Game Over </h1>")
        $("#gameOver").append("<h4 class=centered>Final Score: " + score + "</h4>")
        if (score > parseInt(JSON.parse(localStorage.getItem("High Score 3"))[1])){
            var newName = prompt("Please enter your team name", "New Name");
            if (newName != null) {
                reorderHighScores(newName, score)
            }
            else {
                reorderHighScores("Name", score)
            }
            $("#gameOver").append("<br> <h2>!! New High Score !!</h2>")
        }
        $("#gameOver").append("<br>" + JSON.parse(localStorage.getItem("High Score 1"))[0] + ": " + JSON.parse(localStorage.getItem("High Score 1"))[1] + "<br>")
        $("#gameOver").append("<br>" + JSON.parse(localStorage.getItem("High Score 2"))[0] + ": " + JSON.parse(localStorage.getItem("High Score 2"))[1] + "<br>")
        $("#gameOver").append("<br>" + JSON.parse(localStorage.getItem("High Score 3"))[0] + ": " + JSON.parse(localStorage.getItem("High Score 3"))[1] + "<br>")
        playAgain = "<button class = centered onclick = init1player();> Play Again? </button>"
        $(playAgain).addClass("btn-default");
        $(playAgain).addClass("btn");
        $(playAgain).addClass("centered")


        $("#gameOver").append(playAgain)
        clearInterval(countdown)

        setTimeout(function(){
            $("#Body").attr("onkeydown","init(event)")
        }, 3000)
        return
    }, 1000*timer)

    function tick(event) {

        /*if(timer==0){
            $("#score").remove()
            header = "<h1 class=centered> Game Over </h1><br>"
            $("#Body").html(header + "<h4 class=centered>Final Score: " + score + "</h4>")
            return
        }*/
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



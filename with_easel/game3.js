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

function checkRectCollision(rect1, rect2) {
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}

function randrange(min, max) {
    return Math.random() * (max - min) + min;
}

function init1playerboops() {

    $("#Body").append("<h1><div id= score class = label label-default></div></h1>");
    $("#Body").append("<canvas id=mainCanvas width=500 height=500></canvas>");

    $(".centered").remove();
    $(".btn").remove();

    var stage = new createjs.Stage("mainCanvas");
    var plankton = stage.addChild(new createjs.Bitmap("cropped_plankton.jpg"));
    plankton.scaleX = 0.15;
    plankton.scaleY = 0.15;
    plankton.crossOrigin = "Anonymous";
    plankton.width = 67;
    plankton.height = 68;
    plankton.x = 100;
    plankton.y = 100;

    score = 0;

    timer = 30;

    boopstarget = stage.addChild(new createjs.Bitmap("boopsboops.png"));
    boopstarget.scaleX = 0.3;
    boopstarget.scaleY = 0.3;
    boopstarget.crossOrigin = "Anonymous";
    boopstarget.width = 146;
    boopstarget.height = 117;
    boopstarget.x = 300;
    boopstarget.y = 380;

    var up = false;
    var down = false;
    var left = false;
    var right = false;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick);

    countdown = setInterval(function (){
        if(timer>0){
            timer -= 1;
        }
    }, 1000);

    setTimeout(function(){
        $("#score").remove()
        $("#mainCanvas").remove()
        $("#Body").append("<div id = gameOver class=centered></div>");
        $("#gameOver").append("<h1 class=centered> Game Over </h1>")
        $("#gameOver").append("<h4 class=centered>Final Score: " + score + "</h4>")
        if (score > parseInt(localStorage.getItem("High Score 3"))){
            reorderHighScores(score)
            $("#gameOver").append("<br> <h2>!! New High Score !!</h2>")
        }
        $("#gameOver").append("<br> High Score 1: " + localStorage.getItem("High Score 1") + "<br>")
        $("#gameOver").append("High Score 2: " + localStorage.getItem("High Score 2") + "<br>")
        $("#gameOver").append("High Score 3: " + localStorage.getItem("High Score 3") + "<br>")
        playAgain = "<button class = centered onclick = init1playerboops();> Play Again? </button>"
        $(playAgain).addClass("btn-default");
        $(playAgain).addClass("btn");
        $(playAgain).addClass("centered")


        $("#gameOver").append(playAgain)
        clearInterval(countdown)
        return
    }, 1000*timer)

    function tick(event) {
        if (key.isPressed('up')) {
            moveUp(plankton, event.delta);
        }
        if (key.isPressed('down')) {
            moveDown(plankton,event.delta);
        }
        if (key.isPressed('left')) {
            moveLeft(plankton,event.delta);
        }
        if (key.isPressed('right')) {
            moveRight(plankton,event.delta);
        }
        if (checkRectCollision(plankton, boopstarget)) {
            console.log("hit");
            empty = false;
            while (empty == false) {
                boopstarget.x = randrange(20, 450);
                boopstarget.y = randrange(20, 450);
                if ((! checkRectCollision(plankton, boopstarget))) {
                    empty = true;
                }
            }
            score++;
        }
    if (timer < 10){
        $("#score").html("Score: " + score + "<br> Time Left: 0" + timer);
    }
    else{
        $("#score").html("Score: " + score + "<br> Time Left: " + timer);
    }

    }
}





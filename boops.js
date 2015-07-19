var stage;
// var boopsmap;
var movesq;

function randrange(min, max) {
    return Math.random() * (max - min) + min;
}

function boops(argument) {
    var score = 0
    stage = new createjs.Stage("demoCanvas");
    var sq = new createjs.Shape();
    movesq = new createjs.Shape();
    stage.enableMouseOver(120);
    sq.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 50, 50);
    movesq.graphics.beginFill("red").drawRect(0, 0, 20, 20);
    sq.x = 400;
    sq.y = 300;
    movesq.x = randrange(0, 800);
    movesq.y = randrange(0, 600);
    stage.canvas.style.cursor = "none";
    stage.addEventListener("stagemousemove", moveHandler)
    // boopsmap = new createjs.Bitmap("boops.png")
    // boopsmap.x = -9999;
    // boopsmap.y = -9999;
    // boopsmap.scaleX = 0.2;
    // boopsmap.scaleY = 0.2;
    stage.addChild(sq);
    // stage.addChild(boopsmap);
    stage.addChild(movesq);
    // sq.setBounds(0, 0, 50, 50);
    // movesq.setBounds(0, 0, 20, 20);
    createjs.Ticker.addEventListener("tick", tick);
    sq.on("mouseover", function() {
        score++;
        console.log(score);
        sq.x = randrange(20, 750);
        sq.y = randrange(20, 550);
    })
    // movesq.on("pressmove", function(evt) {
    //     evt.target.x = evt.stageX;
    //     evt.target.y = evt.stageY;
    // });
}

// this.checkIntersection = function(rect1,rect2) {
//     if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
//     return true;
// }
function moveHandler() {
    movesq.x = stage.mouseX;
    movesq.y = stage.mouseY;
}

function tick(event) {
    stage.update();
}

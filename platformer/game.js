var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;
var GRAVITY = 0.3;
var player;
var JUMP = -5;
var obstacleSprites;
var isGameOver;
var score;
var playerImage;
var backgroundImage;
var groundImage;
var gamebackgroundImage;
var backgroundsprite;

function setup() {
    isGameOver = false;
    score = 0;
    createCanvas(1300, 600);
    background(150, 200, 250);
    groundSprites = new Group();

    numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n * 50, height - 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprite.shapeColor = color(150, 200, 250);
        groundSprites.add(groundSprite)
    }
    backgroundsprite = createSprite(width / 2, height / 2, 30, 30);
    backgroundsprite.addImage(gamebackgroundImage);

    player = createSprite(100, height - 75, 50, 50);
    player.addImage(playerImage);

    obstacleSprites = new Group();

}

function draw() {
    if (isGameOver) {
        console.log(camera.position.x);
        camera.position.x = width / 2;
        background(backgroundImage);
        textAlign(CENTER);
        fill("#FF0000");
        textSize(50);
        textFont(specialfont);
        text("GAME OVER !", camera.position.x, camera.position.y - 100);
        text("CLICK FOR TRY AGAIN!", camera.position.x, camera.position.y);
        text("Your score was: " + score, camera.position.x, camera.position.y + 80);
        textFont(specialfont);
        textSize(30)
        text("Score:" + score, 90, 30);

    }
    else {

        player.position.x = player.position.x + 5;
        backgroundsprite.position.x = camera.position.x;
        camera.position.x = player.position.x + (width / 4);
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x = firstGroundSprite.position.x + numGroundSprites * firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        player.velocity.y = player.velocity.y + GRAVITY;

        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height - 50) - (player.height / 2);
        }

        if (keyDown(UP_ARROW)) {
            player.velocity.y = JUMP;
        }

        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height - 50) - 15), 30, 30);
            
            obstacleSprites.add(obstacle);
        }

        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width / 2 + firstObstacle.width / 2)) {
            removeSprite(firstObstacle);
        }

        obstacleSprites.overlap(player, endGame);


        background(gamebackgroundImage);

        drawSprites();

        score = score + 1;
        textFont(specialfont);
        textSize(30);
        text("Score:" + score, camera.position.x - 590, 30);
    }
}

function endGame() {
    isGameOver = true;
    haha();

}

function mouseClicked() {
    if (isGameOver) {
        score = 0;
        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n];
            groundSprite.position.x = n * 50;
        }
        player.position.x = 100;
        player.position.y = height - 75;
        obstacleSprites.removeSprites();

        isGameOver = false;
    }
}

function preload() {
    playerImage = loadImage("ILLU.png");
    backgroundImage = loadImage("HAHA.jpg");
    specialfont = loadFont("font.ttf");
    groundImage = loadImage("NOIR.jpg");
    gamebackgroundImage = loadImage("BCKGRD.jpg");
}

function haha() {
    var haha = new Audio("Nelson.mp3");
    haha.play();
}
var boy, boy_running;

var invisibleGround

var scene, sceneImage;

var score;

var gameOver, gameOverImage, gameOverSound;
var restart, restartImage;

var jumpSound;

var stone, stone_1, stone_2, stoneGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  boy_running = loadAnimation("Boy 1.png", "Boy 2.png", "Boy 3.png");
  sceneImage = loadImage("Background.png");


  gameOverImage = loadImage("gameOver.png");
  gameOverSound = loadSound("gameOverSound.mp3");
  restartImage = loadImage("restart.png");

  stone_1 = loadImage("stone_1.png");
  stone_2 = loadImage("stone_2.png");

  jumpSound = loadSound("jumpSound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  scene = createSprite(width / 2, height / 2);
  scene.addImage(sceneImage);
  scene.scale = 2.2;
  scene.velocityX = -7;

  boy = createSprite(width / 2 - 800, height - 100, 20, 20);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.6;
  // boy.debug = true;
  boy.setCollider("rectangle", 0, 0, 100, 300)

  invisibleGround = createSprite(width / 2 - 800, height - 60, 100, 3);
  invisibleGround.visible = false;

  gameOver = createSprite(width / 2 - 100, height / 2 - 150, 20, 20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(width / 2 - 100, height / 2 + 20, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.25;
  restart.visible = false;

  score = 0;

  stoneGroup = new Group();
}

function draw() {
  background(255);
  drawSprites();

  fill("navy");
  textSize(30);
  text("Score: " + score, width - 250, height - 900);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    boy.visible = true;

    gameOver.visible = false;
    restart.visible = false;

    if (scene.x < 400) {
      scene.x = scene.width / 2;
    }

    if (keyDown("space") && boy.y >= 800) {
      boy.velocityY = -18;
    }
    boy.velocityY = boy.velocityY + 0.8;

    if (stoneGroup.isTouching(boy)) {
      gameState = END;
      gameOverSound.play();
    }

    spawnStones();

    boy.collide(invisibleGround);
  } else if (gameState === END) {

    scene.velocityX = 0;
    stoneGroup.setVelocityXEach(0);

    gameOver.visible = true;
    restart.visible = true;

    boy.visible = false;


    if (mousePressedOver(restart)) {
      reset();
    }
  }
}

function reset() {
  gameState = PLAY;

  scene.velocityX = -7;

  boy.x = width / 2 - 800;
  boy.y = height - 100;

  score = 0;

  boy.visible = true;

  gameOver.visible = false;
  restart.visible = false;

  stoneGroup.setLifetimeEach(-1);
  stoneGroup.setVelocityXEach(-7);
  stoneGroup.destroyEach();
}


function spawnStones() {
  if (frameCount % 200 === 0) {
    stone = createSprite(width / 2 + 1000, Math.round(random(height - 90, height - 100)));
    stone.velocityX = -7;
    stone.scale = 0.3;
    var rand = Math.round(random(1, 2));

    switch (rand) {
      case 1:
        stone.addImage(stone_1);
        break;
      case 2:
        stone.addImage(stone_2);
    }
    stoneGroup.add(stone);
  }
}
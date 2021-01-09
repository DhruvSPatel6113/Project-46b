var player , Virus , BackGround , BackGround2 , InvisibleGround , sanitizer;

var enemy , sanitizers , players;

var gameState = "play";
var life = 3;
var score = 0;

var virusImage , sanitizerimg , playerAnimation , BackGroundImg , BackGroundImg2;

function preload() {

  virusImage = loadImage("images/coronavirus.png");

  playerAnimation = loadAnimation("images/sprite1.png", "images/sprite2.png",
  "images/sprite3.png", "images/sprite4.png", "images/sprite5.png", 
  "images/sprite6.png", "images/sprite7.png", "images/sprite8.png");

  BackGroundImg = loadImage("images/Background.jpg");

  BackGroundImg2 = loadImage("images/Background2.jpg");

  sanitizerimg = loadImage("images/sanitizer.png");

}

function setup() {
  createCanvas(600, 600);

  enemy = new Group();
  sanitizers = new Group();
  players = new Group();

  BackGround = createSprite(300, 300, 600, 600);
  BackGround2 = createSprite(1120, 300, 600, 600);

  InvisibleGround = createSprite(300 , 550 , 600 , 5);

  player = createSprite(200, 490, 20, 20);
  player.addAnimation("animation", playerAnimation);
  player.scale = 0.5;

}

function draw() {

  //imageMode(CENTER);

  players.add(player);

  InvisibleGround.visible = false;

  player.collide(InvisibleGround);

  if (gameState === "play") {

    BackGround.addImage(BackGroundImg);
    BackGround.scale = 0.7;

    BackGround2.addImage(BackGroundImg2);
    BackGround2.scale = 0.7;

    BackGround.velocityX = -2;
    BackGround2.velocityX = -2;

    player.setCollider("rectangle", 0, 0, 160 , 280);

    if(BackGround.x <= -600){

      BackGround.x = 1120;

    }

    if(BackGround2.x <= -600){

      BackGround2.x = 1120;

    }

    virus();
    Sanitizer();
    distroyCorona();
    movingPlayer();
    drawSprites();

    stroke("black");
    fill("white");
    textSize(15);
    text("score:" + score, 400, 30);

    for(var i = 0; i< enemy.length; i++){

      if(players.isTouching(enemy.get(i))){

        gameState="end";
        text("Attacked by corona virus", 300 , 300);

      }
    }

    if(score === 20){

      gameState="end";
      text("you defeated corona virus" , 300 , 300);

    }    

  }

  if(gameState === "end"){

    BackGround.fill("red");
    BackGround2.fill("red");

  }

}

function virus() {

  var rand = Math.round(random(80 , 150));

  if (frameCount % rand === 0) {

    var ran = Math.round(random(250, 500));
    Virus = createSprite(700, ran, 10, 10);
    Virus.addImage(virusImage);
    Virus.scale = 0.5;
    Virus.velocityX = -2;
    Virus.lifetime = 700;
    Virus.setCollider("rectangle" , 0 , 0 , 205 , 160);

    enemy.add(Virus);

  }

}

function Sanitizer(){

  if(keyWentDown("S")){
  
    sanitizer = createSprite(player.x , player.y , 10 , 15);
    sanitizer.addImage(sanitizerimg);
    sanitizer.scale = 0.3;
    sanitizer.velocityX = 4;
    sanitizer.lifetime = 105;
    sanitizer.setCollider("rectangle" , 0 , 0 , 100 , 175);

    sanitizers.add(sanitizer);

  }
}

function distroyCorona(){

  for(var k = 0; k < sanitizers.length; k++){

    for(var i = 0; i < enemy.length; i++){

    if(enemy.get(i).isTouching(sanitizers.get(k))){

      enemy.get(i).destroy();
      score = score+1;
      sanitizers.get(k).lifetime = 5;

    }

    }

  }

}

function movingPlayer(){

  if(keyDown("up")){

    player.y = player.y-4;

  }

  player.y = player.y+1

}
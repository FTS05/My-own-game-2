var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var killCount = 0;
var database;

var form, player, game;

var shooters, shooter1, shooter2, shooter3, shooter4;

var enemy, enemy_img;

var track, shooter1_img, shooter2_img, shooter3_img, shooter4_img;

function preload(){
  enemy_img = loadImage("human_front.png");
  shooter1_img = loadImage("gun.jpg");
  shooter2_img = loadImage("gun2.jpg");
  shooter3_img = loadImage("gun.jpg");
  shooter4_img = loadImage("gun2.jpg");
  jungle = loadImage("Jungle.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

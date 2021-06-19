class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    shooter1 = createSprite(100,200);
    shooter1.addImage("gun",shooter1_img);
    shooter1.scale = 0.35;
    shooter2 = createSprite(300,200);
    shooter2.addImage("gun2",shooter2_img);
    shooter2.scale = 0.35;
    shooter3 = createSprite(500,200);
    shooter3.addImage("car3",shooter3_img);
    shooter4 = createSprite(700,200);
    shooter4.addImage("car4",shooter4_img);
    shooters = [shooter1, shooter2, shooter3, shooter4];

      enemy = createSprite(50, 400);
      enemy.scale = 0.45;
      enemy.velocityY = 2;
      enemy.addImage(enemy_img)
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //background(rgb(198,135,103));
      image(jungle, 0,0,displayWidth - 20, displayHeight-30);

      
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y=displayHeight-100;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        //y = displayHeight - allPlayers[plr].distance;
        shooters[index-1].x = x;
        shooters[index-1].y = y;

        if (index === player.index){
          shooters[index - 1].shapeColor = "red";
          
          //camera.position.x = displayWidth/2;
          //camera.position.y = shooters[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyDown("LEFT_ARROW") && player.index !== null){
      player.velocityX -=10
      //player.update();
    }

    if(player.killCount === 25){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}

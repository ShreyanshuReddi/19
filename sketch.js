var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var edges
var jump
var score

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  jumpImg= loadImage('ghost-jumping.png')
 
}

function setup() {
  createCanvas(600, 600);

  edges = createEdgeSprites()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg)
  ghost.scale=0.3

  

 score=0
  
  climbersGroup = new Group()
  doorsGroup = new Group()
  invisibleBlockGroup = new Group()

  
}

function draw() {
  background(200);

  spookySound.play()

 


 






  ghost.debug=false
  ghost.setCollider("rectangle",-20,30,175,250)


  if (gameState === "play") {
    if (ghost.collide(edges)) {
      gameState= "end"
    }
  
    if (ghost.collide(doorsGroup)) {
     gameState = "end"
    }
  
  
    if(keyDown("space")) {
      ghost.velocityY=-12
      ghost.addImage("jump", jumpImg) 
    }
  
    if(keyDown("left")||keyDown("a")) {
      ghost.velocityX=-4
     
    }
  
    if(keyDown("right")||keyDown("d")) {
      ghost.velocityX=4
     
    }
    
    ghost.scale=0.3

    ghost.rotation=360


    ghost.velocityY=ghost.velocityY+0.5
    
    ghost.visible=true

    tower.velocityY=2

    score = score + Math.round(getFrameRate()/60);

    spawnDoors()
  }

  if (gameState === "end") {
    tower.velocityY=0

    ghost.x=300
    ghost.y=300

    ghost.velocityX=0
    ghost.velocityY=0

    ghost.rotation=ghost.rotation+10
    ghost.scale=ghost.scale/1.01


    doorsGroup.setLifetimeEach(0)
    climbersGroup.setLifetimeEach(0)
    invisibleBlockGroup.setLifetimeEach(0)

 

    if(keyDown("r")) {
      gameState="play"
      score=0
    }
  }

 
  

  if(tower.y > 400){
      tower.y = 300
    }

    

  drawSprites()

  if (gameState==="end") {
    text("Restart? Press R",265,250)
  }
   
  text("Score: "+ score, 10,10);

}


function spawnDoors() {
 
  if (frameCount % Math.round(random(10,200))=== 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage('door', doorImg)
    climber.addImage("climber", climberImg)
    
    door.velocityY = Math.round(random(1,10));
    climber.velocityY = door.velocityY;
    invisibleBlock.velocityY = door.velocityY;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    door.lifetime = 900;
    climber.lifetime = 900;
    invisibleBlock.lifetime = 900;

    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
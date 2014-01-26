var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function getRandomInt(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function preload(){
  game.load.image('jumper', 'assets/jumper.png');
  game.load.image('stage', 'assets/stage.png');
}

function create(){
  // add jumper sprite into world
  jumper = game.add.sprite(10, 450, 'jumper');

  // give the jumper some physics
  jumper.body.gravity.y = 6;
  jumper.body.collideWorldBounds = true;

  // make the jumper jump on keypress
  game.input.keyboard.onDownCallback = function(){
    if(jumper.body.touching.down) jumper.body.velocity.y = -350;
  }

  // create stages group
  stages = game.add.group();

  // add stage into world
  var stage = stages.create(0, 500, 'stage');
  stage.width = 800;
  stage.body.immovable = true;
  stage.body.velocity.x = -500;
}

function update(){
  // collide the jumper and the stages
  game.physics.collide(jumper, stages);

  // get most recently created stage
  var lastStage = stages.getAt(stages.total-1);

  // create new stage if the previous stage's rightmost edge is onscreen
  if(lastStage.x + lastStage.width <= 800) {
    var stage = stages.create(800 + getRandomInt(500, 100), 500, 'stage');
    stage.width = getRandomInt(500, 800);
    stage.body.immovable = true;
    stage.body.velocity.x = -500;
  }
}

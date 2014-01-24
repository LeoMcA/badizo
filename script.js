var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
  stage = stages.create(0, 500, 'stage');
  stage.body.immovable = true;
  stage.body.velocity.x = -500;
}

function update(){
  // collide the jumper and the stages
  game.physics.collide(jumper, stages);
}

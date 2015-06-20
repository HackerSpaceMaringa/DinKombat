var Game = new Phaser.Game(950, 540, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update });

function preload() {
    Game.load.image('background', 'sprites/maps/map4.jpg');
    Game.load.image('player1_stand2', 'sprites/ghost/ghost_stand2.png');
}

var Player1;
var Player2;
var platforms;
var Control;

function create() {
    Game.world.setBounds(0, 0, 950, 500);
    Game.physics.startSystem(Phaser.Physics.P2JS);
    Game.physics.p2.defaultRestitution = 0.5;
    Game.physics.p2.gravity.y = 25000;

    background = Game.add.tileSprite(0, 0, 1000, 600, "background");

    Player1 = Game.add.sprite(200, 410, "player1_stand2");
    Player1.scale.x *= 0.1;
    Player1.scale.y *= 0.1;
    Player1.anchor.setTo(.5,.5);
    Game.physics.p2.enable(Player1);
    Player1.body.setZeroDamping();
    Player1.body.fixedRotation = true;
    Player1.body.collideWorldBounds = true;
    Player1.body.setCircle(65);

    Player2 = Game.add.sprite(800, 410, "player1_stand2");
    Player2.scale.x *= 0.1;
    Player2.scale.y *= 0.1;
    Player2.anchor.setTo(.5,.5);
    Game.physics.p2.enable(Player2);
    Player2.body.setZeroDamping();
    Player2.body.fixedRotation = true;
    Player2.body.collideWorldBounds = true;
    Player2.body.setCircle(65);

    Control = Game.input.keyboard.createCursorKeys();
}

function update() {
  Player1.body.setZeroVelocity();
  
  if (Player2.x > Player1.x && Player2.scale.x > 0)
    Player2.scale.x *= -1;
  if (Player2.x < Player1.x && Player2.scale.x < 0)
    Player2.scale.x *= -1;

  if (Player2.x > Player1.x && Player1.scale.x < 0)
    Player1.scale.x *= -1;
  if (Player2.x < Player1.x && Player1.scale.x > 0)
    Player1.scale.x *= -1;

  if (Control.left.isDown) {
    Player1.body.moveLeft(400);
  } else if (Control.right.isDown) {
    Player1.body.moveRight(400);
  } 
  
  if (Control.up.isDown && Player1.body.y > 410) {
    Player1.body.moveUp(18000);
  }
}

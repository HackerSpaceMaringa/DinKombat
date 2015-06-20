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
    Game.physics.startSystem(Phaser.Physics.P2JS);
    Game.physics.p2.defaultRestitution = 0.5;
    Game.physics.p2.gravity.y = 18000;

    background = Game.add.tileSprite(0, 0, 1000, 600, "background");

    Player1 = Game.add.sprite(200, 410, "player1_stand2");
    Player1.scale.x *= 0.1;
    Player1.scale.y *= 0.1;
    Player1.anchor.setTo(.5,.5);
    Game.physics.p2.enable(Player1);
    Player1.body.setZeroDamping();
    Player1.body.fixedRotation = true;
    Player1.body.collideWorldBounds = true;

    Control = Game.input.keyboard.createCursorKeys();
}

function update() {
  Player1.body.setZeroVelocity();

  if (Control.left.isDown) {
    Player1.body.moveLeft(300);
  } else if (Control.right.isDown) {
    Player1.body.moveRight(300);
  } 
  
  if (Control.up.isDown && Player1.body.y > 410) {
    Player1.body.moveUp(8000);
  }

}

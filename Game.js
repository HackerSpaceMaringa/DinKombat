var Game = new Phaser.Game(950, 540, Phaser.AUTO, 'phaser-example', 
    { preload: preload, create: create, update: update });

function preload() {
    Game.load.image('background', 'sprites/maps/map4.jpg');
    Game.load.image('player1_stand2', 'sprites/ghost/ghost_stand2.png');
}

var Player1;
var Player2;

function initControls() {
  var KeyLeft = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);  
  KeyLeft.onDown.add(function(KeyUp) {
    Player1.action = 1;
  }, this);

  KeyLeft.onUp.add(function(KeyUp) {
    Player1.action = 0;
  }, this);


  var KeyRight = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);  
  KeyRight.onDown.add(function(KeyUp) {
    Player1.action = 2;
  }, this);

  KeyRight.onUp.add(function(KeyUp) {
    Player1.action = 0;
  }, this);
}

function create() {
    background = Game.add.tileSprite(0, 0, 1000, 600, "background");
    Player1 = Game.add.sprite(200, 410, "player1_stand2");
    Player1.scale.x *= 0.1;
    Player1.scale.y *= 0.1;
    Player1.anchor.setTo(.5,.5);
    initControls();
}

function update() {
  if (Player1.action == 1) {
    if (Player1.scale.x > 0) 
      Player1.scale.x *= -1;
      Player1.x -= 3;
  } else if (Player1.action == 2) {
    if (Player1.scale.x < 0) 
      Player1.scale.x *= -1;
    Player1.x += 3;
  }
}

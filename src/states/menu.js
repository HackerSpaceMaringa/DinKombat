module.exports = {
  create: function(){
    var music = game.add.audio("soundtrack");
    music.play();
    var background = game.add.tileSprite(0, 0, 1000, 600, "menubackground");
    this.graphics = game.add.graphics(0, 0);
    var keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 
    var keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); 
    var keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); 

    keyLeft.onDown.add(function(key) {
      game.globals.map = (game.globals.map-1)%5
      if (game.globals.map < 0) game.globals.map = 4
    });
    keyRight.onDown.add(function(key){ 
      game.globals.map = (game.globals.map+1)%5
      if (game.globals.map > 4) game.globals.map = 0
    });
    keyEnter.onDown.add(function(key) {
      game.state.start('menu2');
    });

  },

  update: function(){
    this.graphics.lineStyle(5, 0x000000, 5);
    this.graphics.drawRect(20, 10, 305, 165);
    this.graphics.lineStyle(5, 0x000000, 5);
    this.graphics.drawRect(634, 10, 305, 165);
    this.graphics.lineStyle(5, 0x000000, 5);
    this.graphics.drawRect(20, 360, 300, 170);
    this.graphics.lineStyle(5, 0x000000, 5);
    this.graphics.drawRect(634, 365, 300, 170);
    this.graphics.lineStyle(5, 0x000000, 5);
    this.graphics.drawRect(330, 190, 300, 170);

    if (game.globals.map == 0) {
      this.graphics.lineStyle(5, 0x0000ff, 5);
      this.graphics.drawRect(20, 10, 305, 165);
    } else if (game.globals.map == 1) {
      this.graphics.lineStyle(5, 0x0000ff, 5);
      this.graphics.drawRect(634, 10, 305, 165);
    } else if (game.globals.map == 2) {
      this.graphics.lineStyle(5, 0x0000ff, 5);
      this.graphics.drawRect(634, 365, 300, 170);
    } else if (game.globals.map == 3) {
      this.graphics.lineStyle(5, 0x0000ff, 5);
      this.graphics.drawRect(330, 190, 300, 170);
    } else if (game.globals.map == 4) {
      this.graphics.lineStyle(5, 0x0000ff, 5);
      this.graphics.drawRect(20, 360, 300, 170);
    }

  },
};

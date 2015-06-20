//We use window.game because we want it to be accessible from everywhere
window.game = new Phaser.Game(950, 540, Phaser.AUTO);

game.globals = {
  map : 0
};

game.state.add('play', require('./states/play.js'));
game.state.add('load', require('./states/load.js'));
game.state.add('menu', require('./states/menu.js'));
game.state.add('menu2', require('./states/menu2.js'));
game.state.add('boot', require('./states/boot.js'));
game.state.start('boot');

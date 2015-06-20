module.exports = {
  create: function(){
    var background = game.add.tileSprite(0, 0, 1000, 600, "map"+game.globals.map);
    game.state.start('play');
  },

  update: function(){
  },
};

module.exports = {
    loadingLabel: function () {
        this.loading = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);
        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
        this.barBg.anchor.setTo(0.5, 0.5);
        this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
        this.bar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(this.bar);
    },

    preload: function () {
      this.loadingLabel();
      game.load.image('menubackground', 'assets/menubackground.jpg');    
      game.load.image('player1_stand2', 'assets/ghost/ghost_stand2.png');    
      game.load.image('hp', 'assets/hp.png');    
      for(var i = 0; i < 5; i++) 
        game.load.image('map'+i, 'assets/maps/map'+i+'.jpg');
      game.load.audio('soundtrack',    
          ['assets/musics/Flex_Blur_-_Action1.mp3',    
          'assets/musics/Paul_McLellan_-_Speedy_Rides_Again.mp3',    
          'assets/musics/Ralph_Buckley_-_Freedom_Blues.mp3']);
    },

    create: function () {
        game.state.start('menu');
    }
};

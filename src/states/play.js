module.exports = {
    create: function(){
      game.world.setBounds(0, 0, 950, 500);
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.defaultRestitution = 0.5;
      game.physics.p2.gravity.y = 5000;

      var background = game.add.tileSprite(0, 0, 1000, 600, "map"+game.globals.map);
      
      this.hpbar1 = game.add.sprite(70, 10, "hp");
      this.hpbar2 = game.add.sprite(680, 10, "hp");

      var style = { font: "40px Arial", fill: "#ffff00", align: "center" };
      this.roundText = game.add.text(400, 10, 'Round: 1', style);
      this.win1Text = game.add.text(20, 5, '0', style);
      this.win2Text = game.add.text(910, 5, '0', style);

      this.player1 = game.add.sprite(200, 410, "player1_stand2");
      this.player1.scale.x *= 0.1;
      this.player1.scale.y *= 0.1;
      this.player1.anchor.setTo(.5,.5);
      game.physics.p2.enable(this.player1);
      this.player1.body.setZeroDamping();
      this.player1.body.fixedRotation = true;
      this.player1.body.collideWorldBounds = true;
      this.player1.body.setCircle(65);

      this.player2 = game.add.sprite(800, 410, "player1_stand2");
      this.player2.scale.x *= 0.1;
      this.player2.scale.y *= 0.1;
      this.player2.anchor.setTo(.5,.5);
      game.physics.p2.enable(this.player2);
      this.player2.body.setZeroDamping();
      this.player2.body.fixedRotation = true;
      this.player2.body.collideWorldBounds = true;
      this.player2.body.setCircle(65);

      // Player1 Controls
      this.keyLeft1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 
      this.keyRight1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); 
      this.keyUp1 = game.input.keyboard.addKey(Phaser.Keyboard.UP); 
      this.keyDown1 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); 

      // Player1 Controls
      this.keyLeft2 = game.input.keyboard.addKey(Phaser.Keyboard.A); 
      this.keyRight2 = game.input.keyboard.addKey(Phaser.Keyboard.D); 
      this.keyUp2 = game.input.keyboard.addKey(Phaser.Keyboard.W); 
      this.keyDown2 = game.input.keyboard.addKey(Phaser.Keyboard.S); 

      this.round = 1;
      // Status
      this.player1.HP = 100;
      this.player1.win = 0;
      this.player2.HP = 100;
      this.player2.win = 0;
    },

    update: function(){
      if (this.player2.x > this.player1.x && this.player2.scale.x > 0)
        this.player2.scale.x *= -1;
      if (this.player2.x < this.player1.x && this.player2.scale.x < 0)
        this.player2.scale.x *= -1;

      if (this.player2.x > this.player1.x && this.player1.scale.x < 0)
        this.player1.scale.x *= -1;
      if (this.player2.x < this.player1.x && this.player1.scale.x > 0)
        this.player1.scale.x *= -1;

      if (this.keyLeft1.isDown) {
        this.player1.body.moveLeft(400);
      } else if (this.keyRight1.isDown) {
        this.player1.body.moveRight(400);
      } 
      if (this.keyUp1.isDown && this.player1.body.y > 410) {
        this.player1.body.moveUp(1500);
        this.player1.HP -= 10;
      }

      if (this.keyLeft2.isDown) {
        this.player2.body.moveLeft(400);
      } else if (this.keyRight2.isDown) {
        this.player2.body.moveRight(400);
      } 
      if (this.keyUp2.isDown && this.player2.body.y > 410) {
        this.player2.body.moveUp(1500);
      }

      this.hpbar1.scale.x = (this.player1.HP/100);
      this.hpbar2.scale.x = (this.player2.HP/100);
  
      if (this.player1.HP < 0 || this.player2.HP < 0) {
        if (this.player1.HP > this.player2.HP) { 
          this.player1.win += 1;
        } else {
          this.player2.win += 1;
        }
        this.player1.HP = 100;
        this.player2.HP = 100;
        this.round += 1;
        this.roundText.setText("Round: "+this.round);
        this.win1Text.setText(""+this.player1.win);
        this.win2Text.setText(""+this.player2.win);
      }
    },
};

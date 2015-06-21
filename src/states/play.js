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

    this.player1 = game.add.sprite(200, 410, "ghost_s");
    this.player1.anchor.setTo(.5,.5);
    game.physics.p2.enable(this.player1);
    this.player1.body.setZeroDamping();
    this.player1.body.fixedRotation = true;
    this.player1.body.collideWorldBounds = true;
    this.player1.body.setCircle(76);

    this.player2 = game.add.sprite(800, 410, "hacker_s");
    this.player2.anchor.setTo(.5,.5);
    game.physics.p2.enable(this.player2);
    this.player2.body.setZeroDamping();
    this.player2.body.fixedRotation = true;
    this.player2.body.collideWorldBounds = true;
    this.player2.body.setCircle(76);

    // Player1 Controls
    var keyLeft1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 
    var keyRight1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); 
    var keyUp1 = game.input.keyboard.addKey(Phaser.Keyboard.UP); 
    var keyDown1 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); 

    var keyA1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE); 
    var keyB1 = game.input.keyboard.addKey(Phaser.Keyboard.TWO); 
    var keyC1 = game.input.keyboard.addKey(Phaser.Keyboard.THREE); 

    this.player1.controls = {keyLeft : keyLeft1, keyRight: keyRight1,
      keyUp: keyUp1, keyDown: keyDown1, keyA: keyA1, keyB: keyB1, keyC: keyC1};

    // Player1 Controls
    var keyLeft2 = game.input.keyboard.addKey(Phaser.Keyboard.A); 
    var keyRight2 = game.input.keyboard.addKey(Phaser.Keyboard.D); 
    var keyUp2 = game.input.keyboard.addKey(Phaser.Keyboard.W); 
    var keyDown2 = game.input.keyboard.addKey(Phaser.Keyboard.S); 

    var keyA2 = game.input.keyboard.addKey(Phaser.Keyboard.H); 
    var keyB2 = game.input.keyboard.addKey(Phaser.Keyboard.J); 
    var keyC2 = game.input.keyboard.addKey(Phaser.Keyboard.K); 

    this.player2.controls = {keyLeft : keyLeft2, keyRight: keyRight2,
      keyUp: keyUp2, keyDown: keyDown2, keyA: keyA2, keyB: keyB2, keyC: keyC2};

    this.round = 1;
    // Status
    this.player1.HP = 100;
    this.player1.win = 0;
    this.player2.HP = 100;
    this.player2.win = 0;
    this.frame = 0;
    this.tick = 0;
  },

  combat: function(player, tick) {
    var control = player.controls;
    if (control.keyLeft.isDown) {
      player.body.moveLeft(400);
    } else if (control.keyRight.isDown) {
      player.body.moveRight(400);
    }  
    if (control.keyUp.isDown && player.body.y > 410) {
      player.jumping = true;
      player.frame = 6;
      player.body.moveUp(1500);
    } else if (control.keyDown.isDown) {
      player.frame = 6;
      if (control.keyA.isDown) {
        player.frame = 8;
      } else if (control.keyB.isDown) {
        player.frame = 7;
      }
    } else {
      if (control.keyA.isDown) {
        player.frame = 2 + tick;
      } else if (control.keyB.isDown) {
        player.frame = 4;
      } else if (control.keyC.isDown) {
        player.frame = 5;
      }
    }
    if (!player.jumping && player.frame)
      player.body.setZeroVelocity()
  },

  update: function(){
    this.frame += 1;
    if (this.frame == 15) {
      this.frame = 0;
      this.tick = (this.tick + 1) % 2;
    }
    this.player1.frame = -1;
    this.player2.frame = -1;

    if (this.player1.body.y > 410 && this.player1.jumping) {
      this.player1.frame = 0;
      this.player1.jumping = false;
    }
    if (this.player2.body.y > 410 && this.player2.jumping) {
      this.player2.frame = 0;
      this.player2.jumping = false;
    }

    if (this.player2.x > this.player1.x && this.player2.scale.x > 0)
      this.player2.scale.x *= -1;
    if (this.player2.x < this.player1.x && this.player2.scale.x < 0)
      this.player2.scale.x *= -1;

    if (this.player2.x > this.player1.x && this.player1.scale.x < 0)
      this.player1.scale.x *= -1;
    if (this.player2.x < this.player1.x && this.player1.scale.x > 0)
      this.player1.scale.x *= -1;

    this.combat(this.player1, this.tick);
    this.combat(this.player2, this.tick);

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
      this.player1.body.x = 200;
      this.player2.body.x = 800;
    }

    if (!this.player1.frame && !this.player1.jumping) {
      this.player1.frame = 0;
    } if (!this.player2.frame && !this.player2.jumping) {
      this.player2.frame = 0;
    }
  },
};

var game = new Phaser.Game(950, 540, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('background', 'sprites/maps/map4.jpg');
}

function create() {
    background = game.add.tileSprite(0, 0, 1000, 600, "background");
}
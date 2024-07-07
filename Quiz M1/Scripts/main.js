import titlescene from './scenes/titlescene.js';
import gamescene from './scenes/gamescene.js';
import creditscene from './scenes/creditscene.js';
import gameoverscene from './scenes/gameoverscene.js';

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [titlescene, gamescene, creditscene, gameoverscene]
};

new Phaser.Game(config);


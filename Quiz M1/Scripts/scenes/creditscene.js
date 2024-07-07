export default class creditscene extends Phaser.Scene {
    constructor() {
        super("creditscene");
    }

    preload() {
     
        this.load.image('credit', './Assets/sprites/credit.png');
        this.load.image('backButton', './Assets/buttons/back.png');
        this.load.audio('clickSound', 'Assets/audio/point.m4a');
        this.load.audio('bgMusic', 'Assets/audio/bg.m4a');
    }

    create() {

        this.background = this.add.image(0, 0, 'credit').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const backButton = this.add.image(this.cameras.main.width / 7, 100, 'backButton')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('titlescene');
            this.bgMusic.stop();
        })
        .on('pointerover', () => {
            backButton.y -= 5; 
            this.sound.play('clickSound');
            document.body.style.cursor = 'pointer';
        })
        .on('pointerout', () => {
            backButton.y += 5;
            document.body.style.cursor = 'default';
        });
    }
}
export default class gameoverscene extends Phaser.Scene {
    constructor() {
        super("gameoverscene");
    }

    preload() {
        this.load.image('restartButton', './Assets/button/Retry.png');
        this.load.image('mainMenuButton', './Assets/button/Menu.png');
        this.load.audio('clickSound', 'Assets/audio/point.m4a');
        this.load.audio('bge', 'Assets/audio/death.m4a');
        this.load.image('end', './Assets/sprites/end.png');
    }
    
    create(data) {
        const score = data.score; 
        const bgMusic = this.sound.add('bge');
        bgMusic.play();

        this.add.image(0, 0, 'end').setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        // Score
        const scoreText = this.add.text(this.cameras.main.width / 2, 400, 'Star Collected: ' + score, { fontSize: '32px', fontFamily: 'Arial', color: '#ffffff' }).setOrigin(0.5);
        scoreText.setStroke('#000000', 4); 
        
        const scorePointText = this.add.text(this.cameras.main.width / 2, 450, 'Score: ' + score * 100, { fontSize: '32px', fontFamily: 'Arial', color: '#ffffff' }).setOrigin(0.5);
        scorePointText.setStroke('#000000', 4); 

        // Retry
        const restartButton = this.add.image(this.cameras.main.width / 1.50, 600, 'restartButton')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('gamescene');
            bgMusic.stop(); 
        })
        .on('pointerover', () => {
            restartButton.y -= 5; 
            this.sound.play('clickSound');
            document.body.style.cursor = 'pointer';
        })
        .on('pointerout', () => {
            restartButton.y += 5;
            document.body.style.cursor = 'default';
        });

        // Menu 
        const mainMenuButton = this.add.image(this.cameras.main.width / 2.50, 600, 'mainMenuButton')
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('titlescene');
            bgMusic.stop(); 
        })
        .on('pointerover', () => {
            mainMenuButton.y -= 5; 
            this.sound.play('clickSound');
            document.body.style.cursor = 'pointer';
        })
        .on('pointerout', () => {
            mainMenuButton.y += 5;
            document.body.style.cursor = 'default';
        });
    }
}

export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }


preload() {
    this.load.image('playButton', 'Assets/button/Play.png');
    this.load.image('creditsButton', 'Assets/button/Credits.png');
    this.load.image('quitButton', 'Assets/button/Quit.png');
    this.load.image('backButton', 'Assets/button/back.png');
    this.load.image('bg', 'Assets/sprites/bgt.png');
    this.load.image('bgif', 'Assets/sprites/bgif.gif');
    this.load.audio('clickSound', 'Assets/audio/point.m4a');
    this.load.audio('bgMusic', 'Assets/audio/bg.m4a');
}

     create() {
        //background
        this.background = this.add.image(0, 0, 'bgif').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
     
        
//BUTTON
//Start Button
    const startButton = this.add.image(this.cameras.main.width / 2, 400, 'playButton')
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () =>{
        this.scene.start('gamescene');
        this.bgMusic.stop();} )
    .on('pointerover', () => {
        startButton.y -= 5; 
        this.sound.play('clickSound');
        document.body.style.cursor = 'pointer';
    })
    .on('pointerout', () => {
        startButton.y += 5; 
        document.body.style.cursor = 'default';
    });

// Credits Button
    const creditsButton = this.add.image(this.cameras.main.width / 2, 550, 'creditsButton')
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => {
        this.scene.start('creditscene');
        this.bgMusic.stop();
        })
    .on('pointerover', () => {
        creditsButton.y -= 5; 
        this.sound.play('clickSound');
        document.body.style.cursor = 'pointer';
    })
    .on('pointerout', () => {
        creditsButton.y += 5;
        document.body.style.cursor = 'default';
    });

// Quit Button
    const quitButton = this.add.image(this.cameras.main.width / 2, 700, 'quitButton')
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => window.close()) 
    .on('pointerover', () => {
        quitButton.y -= 5;
        this.sound.play('clickSound');
        document.body.style.cursor = 'pointer';
    })
    .on('pointerout', () => {
        quitButton.y += 5; 
        document.body.style.cursor = 'default';
    });

            // Play background music
            this.bgMusic = this.sound.add('bgMusic');
            this.bgMusic.play({
                loop: true,
                volume: 0.5
            });
    

     } 


}
export default class gamescene extends Phaser.Scene {
    constructor() {
        super("gamescene");
        this.scenePaused = false;
    }

    init() {
        this.background;
        this.platforms;
        this.cursors;
        this.jumpKey;
        this.stars;
        this.bombs;
        this.score = 0;
        this.scoreText;
        this.nextStarTimer;
        this.nextBombTimer;
        this.starCounter = 0;
        this.usedStarPositions = new Set();
        this.gameOverText;
        this.rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8A2BE2'];
        this.colorIndex = 0;
    }

    preload() {
        this.load.image('background', 'Assets/sprites/background.png');

        // Platforms
        this.load.image('platform1', 'Assets/sprites/platform1.png');
        this.load.image('platform2', 'Assets/sprites/platform2.png');
        this.load.image('platform3', 'Assets/sprites/platform3.png');

        // Sound Effects
        this.load.audio('death', 'Assets/audio/death.m4a');
        this.load.audio('jump', 'Assets/audio/jump.m4a');
        this.load.audio('star', 'Assets/audio/star.m4a');
        this.load.audio('bg', 'Assets/audio/bg.m4a');

        // Player
        this.load.spritesheet('player', 'Assets/sprites/playerOne.png', { frameWidth: 60, frameHeight: 70 });

        // Star and Bomb
        this.load.image('star', 'Assets/sprites/star.png');
        this.load.image('bomb', 'Assets/sprites/bomb.png');
    }

    create() {
        // Background
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Background music
        this.backgroundMusic = this.sound.add('bg');
        this.backgroundMusic.play({ loop: true, volume: 0.5 });

        // Physics for Platforms
        this.platforms = this.physics.add.staticGroup();

        // Platform Coordinates
        this.platforms.create(190, 560, 'platform1').setScale(0.37).refreshBody();
        this.platforms.create(130, 410, 'platform2').setScale(0.4).refreshBody();
        this.platforms.create(600, 270, 'platform3').setScale(0.4).refreshBody();
        this.platforms.create(200, 800, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(660, 800, 'platform1').setScale(0.4).refreshBody();
        this.platforms.create(810, 650, 'platform2').setScale(0.4).refreshBody();
        this.platforms.create(820, 410, 'platform3').setScale(0.37).refreshBody();

        // Player properties
        this.player = this.physics.add.sprite(200, 715, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);

        // Animations for the player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Stars
        this.stars = this.physics.add.group({ key: 'star', allowGravity: true });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Bombs
        this.bombs = this.physics.add.group({ key: 'bomb', allowGravity: true });
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);

        // Score text
        this.scoreText = this.add.text(650, 20, 'Stars Collected: ' + this.score, { fontSize: '32px', fill: '#000000' });

        // Timers
        this.nextStarTimer = this.time.addEvent({ delay: 3000, callback: this.createNewStar, callbackScope: this, loop: true });
        this.nextBombTimer = this.time.addEvent({ delay: 25000, callback: this.createNewBomb, callbackScope: this, loop: true });
    }

    collectStar(player, star) {
        star.destroy();
        this.sound.play('star');
        this.usedStarPositions.delete(star.x);
        this.score += 1;
        this.scoreText.setText('Stars Collected: ' + this.score);
        player.setTint(Phaser.Display.Color.HexStringToColor(this.rainbowColors[this.colorIndex]).color);
        this.colorIndex = (this.colorIndex + 1) % this.rainbowColors.length;

        this.starCounter++;
        if (this.starCounter % 5 === 0) {
            player.setScale(player.scaleX * 1.1, player.scaleY * 1.1);
            this.starCounter = 0;
        }
    }

    createNewStar() {
        if (this.stars.getChildren().length < 5) {
            var platformsArray = this.platforms.getChildren().filter(platform => platform.y <= 710);
            if (platformsArray.length > 0) {
                var randomPlatform, starX, platformIndex;
                do {
                    platformIndex = Phaser.Math.Between(0, platformsArray.length - 2);
                    randomPlatform = platformsArray[platformIndex];
                    starX = Phaser.Math.Between(randomPlatform.x - randomPlatform.width / 5, randomPlatform.x + randomPlatform.width / 1.5);
                } while (this.usedStarPositions.has(starX));

                this.usedStarPositions.add(starX);

                var newStarY = -5;
                var newStar = this.stars.create(starX, newStarY, 'star');
                newStar.setBounce(0.2);
                newStar.setCollideWorldBounds(true);
                newStar.setVelocityY(15);
            }
        }
    }

    createNewBomb() {
        if (this.bombs.getChildren().length < 3) {
            var platformsArray = this.platforms.getChildren().filter(platform => platform.y <= 710);
            if (platformsArray.length > 0) {
                var randomPlatform, bombX, platformIndex;
                do {
                    platformIndex = Phaser.Math.Between(0, platformsArray.length - 1);
                    randomPlatform = platformsArray[platformIndex];
                    bombX = Phaser.Math.Between(randomPlatform.x - randomPlatform.width / 2, randomPlatform.x + randomPlatform.width / 2);
                } while (this.usedStarPositions.has(bombX));

                var newBombY = -40;
                var newBomb = this.bombs.create(bombX, newBombY, 'bomb');
                newBomb.setBounce(0.2);
                newBomb.setCollideWorldBounds(true);
                newBomb.setVelocityY(5);
            }
        }
    }

    hitBomb(player, bomb) {
        player.setVelocity(0, 0);
        this.backgroundMusic.stop();
        player.setY(this.game.config.height + 100);

        this.scene.start("gameoverscene", { score: this.score }); 
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('walk', true);
            this.player.flipX = false;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.anims.play('walk', true);
            this.player.flipX = true;
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }

        if (this.jumpKey.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
            this.sound.play('jump');
        }
    }
}

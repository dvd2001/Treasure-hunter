class HomeScene extends Phaser.Scene {
    preload() {
        this.load.image('background', 'assets/sprites/background.jpg');
        this.load.image('enemy', 'assets/sprites/dragon.png');
        this.load.image('spike', 'assets/sprites/spike.png');
        this.load.image('treasure', 'assets/sprites/treasure.png');
        this.load.image('wall', 'assets/sprites/wall.png');

        this.load.spritesheet('hunter', 'assets/spritesheets/treasure_hunter.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 1
        });

        this.load.spritesheet('fire', 'assets/spritesheets/fire.png', {
            frameWidth: 28,
            frameHeight: 30,
            margin: 1,
            spacing: 1
        });

        this.load.json('descriptionTexts', 'assets/json/descriptionScene.json');
    }
    create() {
        const bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        const startBtnText = this.add.text(0, 0, 'START GAME', {
            fontFamily: 'Arial',
            fontSize: '30px'
        });
        Phaser.Display.Align.In.Center(startBtnText, bg, 0, -45);

        const startBtnBg = this.add.rectangle(0, 0, startBtnText.width + 40, startBtnText.height + 40, 0);
        startBtnBg.setAlpha(0.5);
        Phaser.Display.Align.In.Center(startBtnBg, bg, 0, -45);
        startBtnBg.setInteractive();
        startBtnBg.on(Phaser.Input.Events.POINTER_DOWN, () => {
            //this.scene.start('game');
            console.log('start game pressed');
        });

        const descriptionBtnText = this.add.text(0, 0, 'GAME DESCRIPTION', {
            fontFamily: 'Arial',
            fontSize: '30px'
        });
        Phaser.Display.Align.In.Center(descriptionBtnText, bg, 0, 45);

        const descriptionBtnBg = this.add.rectangle(0, 0, descriptionBtnText.width + 40, descriptionBtnText.height + 40, 0);
        descriptionBtnBg.setAlpha(0.5);
        Phaser.Display.Align.In.Center(descriptionBtnBg, bg, 0, 45);
        descriptionBtnBg.setInteractive();
        descriptionBtnBg.on(Phaser.Input.Events.POINTER_DOWN, () => {
            console.log('description pressed');
            this.scene.start('description');
        })

        startBtnBg.setDepth(1);
        startBtnText.setDepth(2);

        descriptionBtnBg.setDepth(1);
        descriptionBtnText.setDepth(2);
    }
}
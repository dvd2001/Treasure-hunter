class DescriptionScene extends Phaser.Scene {
    create() {
        this.descriptionTexts = this.cache.json.get('descriptionTexts');

        const bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        const titleText = this.add.text(0, 0, this.descriptionTexts.title, {
            fontFamily: 'Arial',
            fontSize: '50px',
            fontStyle: 'bold'
        });
        Phaser.Display.Align.In.TopCenter(titleText, bg, 0, -20);

        const welcomeText = this.add.text(0, 0, this.descriptionTexts.welcome, {
            fontFamily: 'Arial',
            fontSize: '30px'
        });
        Phaser.Display.Align.In.TopCenter(welcomeText, bg, 0, -100);

        const descriptionText = this.add.text(0, 0, this.descriptionTexts.description, {
            fontFamily: 'Arial',
            fontSize: '20px',
            align: 'center',
            lineSpacing: '20'
        });
        Phaser.Display.Align.In.TopCenter(descriptionText, bg, 0, -150);

        const goodLuckText = this.add.text(0, 0, this.descriptionTexts.goodLuck, {
            fontFamily: 'Arial',
            fontSize: '25px',
            fontStyle: 'bold'
        });
        Phaser.Display.Align.In.TopCenter(goodLuckText, bg, 0, -420);

        const backBtnText = this.add.text(0, 0, 'BACK', {
            fontFamily: 'Arial',
            fontSize: '30px'
        });
        Phaser.Display.Align.In.BottomCenter(backBtnText, bg, 0, -40);

        const backBtnBg = this.add.rectangle(0, 0, backBtnText.width + 40, backBtnText.height + 40, 0);
        backBtnBg.setAlpha(0.5);
        Phaser.Display.Align.In.BottomCenter(backBtnBg, bg, 0, -20);
        backBtnBg.setInteractive();
        backBtnBg.on(Phaser.Input.Events.POINTER_DOWN, () => {
            console.log('back pressed');
            this.scene.start('home');
        });

        backBtnBg.setDepth(1);
        backBtnText.setDepth(2);
    }
}
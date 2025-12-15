/// <reference path="./types/index.d.ts"/>

class GameScene extends Phaser.Scene {
    init() {
        this.playerSpeed = 75;
        this.enemyMinSpeed = 100;
        this.enemyMaxSpeed = 200;
        this.wallWitdh = 30;
        this.wallHeight = 30;
    }
    create() {
        const bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);

        this.anims.create({
            key: 'walk_forward',
            frames: this.anims.generateFrameNames('hunter', {
                frames: [0, 1, 2]
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNames('hunter', {
                frames: [3, 4, 5]
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNames('hunter', {
                frames: [6, 7, 8]
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_backward',
            frames: this.anims.generateFrameNames('hunter', {
                frames: [9, 10, 11]
            }),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNames('fire', {
                frames: [0, 1]
            }),
            frameRate: 4,
            repeat: -1
        });

        this.setupLevel();
        this.setupObsticles();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-this.playerSpeed);
            this.player.anims.play('walk_left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(this.playerSpeed);
            this.player.anims.play('walk_right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-this.playerSpeed);
            this.player.anims.play('walk_backward', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(this.playerSpeed);
            this.player.anims.play('walk_forward', true);
        }
        else {
            this.player.body.setVelocity(0);
            this.player.anims.stop();
            this.player.setFrame(1);
        }
    }

    setupLevel() {
        this.levelData = this.cache.json.get('levelData');

        this.player = this.add.sprite(this.levelData.player.x,
            this.levelData.player.y, 'hunter', 1)
            .setScale(0.75).setOrigin(0, 0);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        const treasure = this.add.sprite(this.levelData.treasure.x,
            this.levelData.treasure.y, 'treasure')
            .setScale(0.7);
        this.physics.add.existing(treasure, true);
        this.physics.add.collider(this.player, treasure, () => {
            console.log('You win!');
            this.sound.play('winSound');
            this.scene.start('home');
        });

        this.walls = this.add.group();

        for (const wall of this.levelData.walls) {
            const wallSprite = this.add.tileSprite(wall.x, wall.y,
                wall.width * this.wallWitdh,
                wall.height * this.wallHeight, 'wall')
                .setTileScale(0.5, 0.5).setOrigin(0, 0);
            this.physics.add.existing(wallSprite, true);
            this.walls.add(wallSprite);
        }

        this.physics.add.collider(this.player, this.walls);

        this.dragons = this.add.group();

        this.physics.add.collider(this.dragons, this.walls);
        this.physics.add.overlap(this.player, this.dragons, () => {
            console.log('You lose!');
            this.sound.play('loseSound');
            this.scene.restart();
        });

        for (const dragon of this.levelData.dragons) {
            const dragonSprite = this.add.sprite(dragon.x, dragon.y, 'enemy')
                .setScale(0.7).setOrigin(0, 0)
                .setFlipX(true);
            this.physics.add.existing(dragonSprite);
            this.dragons.add(dragonSprite);
        }

        this.dragons.getChildren().forEach((dragon) => {
            const direction = Phaser.Math.RND.pick([-1, 1]);
            const speed = Phaser.Math.RND.realInRange(
                this.enemyMinSpeed, this.enemyMaxSpeed);
            dragon.setData('speed', direction * speed);
            dragon.body.setCollideWorldBounds(true);
            dragon.body.setBounce(0, 1);
            dragon.body.setVelocityY(dragon.getData('speed'));
        });
    }

    setupObsticles() {
        this.fires = this.add.group();

        this.time.addEvent({
            delay: this.levelData.fireSpawner.interval,
            repeat: -1,
            callback: () => {
                for (const fire of this.levelData.fires) {
                    const fireSprite = this.add.sprite(fire.x,
                        fire.y, 'fire').setOrigin(0, 0);
                    this.physics.add.existing(fireSprite, true);
                    this.fires.add(fireSprite);
                    fireSprite.anims.play('burn');

                    this.time.addEvent({
                        delay: this.levelData.fireSpawner.lilfespan,
                        repeat: 0,
                        callback: () => fireSprite.destroy()
                    });
                }
            }
        });

        this.spikes = this.add.group();

        this.time.addEvent({
            delay: this.levelData.spikeSpawner.interval,
            repeat: -1,
            callback: () => {
                for (const spike of this.levelData.spikes) {
                    const spikeSprite = this.add.sprite(spike.x,
                        spike.y, 'spike').setScale(0.15).setOrigin(0, 0);
                    this.physics.add.existing(spikeSprite, true);
                    this.spikes.add(spikeSprite);
                    this.time.addEvent({
                        delay: this.levelData.spikeSpawner.lilfespan,
                        repeat: 0,
                        callback: () => spikeSprite.destroy()
                    })
                }
            }
        });

        this.physics.add.overlap(this.player, [this.spikes, this.fires], () => {
            console.log('You lose!');
            this.sound.play('loseSound');
            this.scene.restart();
        });
    }
}
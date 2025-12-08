/// <reference path="./types/index.d.ts"/>

const gameScene = new GameScene('game');
const homeScene = new HomeScene('home');
const descriptionScene = new DescriptionScene('description');

const game = new Phaser.Game({
    width: 1280,
    height: 720,
    scene: [homeScene, descriptionScene, gameScene]
});
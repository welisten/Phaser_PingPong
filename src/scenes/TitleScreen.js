import Phaser from "phaser";
let windowInnerW = window.innerWidth - 20
let windowInnerH = window.innerHeight - 20

export default class TitleScreen extends Phaser.Scene
{
    preload(){

    }

    create() {
        const text = this.add.text( windowInnerW / 2, windowInnerH / 2, 'Hello, World!')
        text.setOrigin(0.5, 0.5)
    }
}
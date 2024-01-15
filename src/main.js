
import Phaser from "phaser";
// Scenes
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";
import GameBackground from "./scenes/gameBackground";

// Screen's height and width information
let windowInnerW = window.innerWidth - 20
let windowInnerH = window.innerHeight - 20

// Phaser's instance setup
const config = {
    width: windowInnerW,
    height: windowInnerH,
    // let phaser automatcaly choose the best render option
    type: Phaser.AUTO,
    backgroundColor: 0x2c3e50,
    // game's physics system
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)
game.scene.add('game-background', GameBackground)

// game.scene.start('titlescreen')
game.scene.start('game')
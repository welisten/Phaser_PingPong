import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";
import GameBackground from "./scenes/gameBackground";

let windowInnerW = window.innerWidth - 20
let windowInnerH = window.innerHeight - 20
const config = {
    width: windowInnerW,
    height: windowInnerH,
    type: Phaser.AUTO,
    backgroundColor: 0x2c3e50,
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
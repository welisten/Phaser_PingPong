
import Phaser from "phaser";

// Scenes
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";
import GameBackground from "./scenes/gameBackground";
import GameOver from "./scenes/GameOver";
import Preload from "./scenes/Preload";

// Conts
import * as SceneKeys from './consts/SceneKeys'
import { gameFullWidth, gameFullHeight } from './consts/Sizes'
import { DarkGray_background } from './consts/Colors'




// Phaser's instance setup
const config = {
    width: gameFullWidth,
    height: gameFullHeight,
    // let phaser automatically choose the best render option
    type: Phaser.AUTO,
    backgroundColor: DarkGray_background,
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

// All the scenes must to be added here
game.scene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.Game, Game)
game.scene.add(SceneKeys.GameBackground, GameBackground)
game.scene.add(SceneKeys.GameOver, GameOver)

// start the first scene(supposing all of them are chained)
game.scene.start(SceneKeys.Preload)
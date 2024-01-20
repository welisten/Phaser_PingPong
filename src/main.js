
import Phaser from "phaser";

// Scenes
import Preload from "./scenes/Preload";
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";
import GameBackground from "./scenes/gameBackground";
import GameOver from "./scenes/GameOver";

// Conts
import * as SceneKeys from './consts/SceneKeys'
import { gameFullWidth, gameFullHeight } from './consts/Sizes'
import { DarkGray_background } from './consts/Colors'




// Phaser's instance setup
const config = {
    width: gameFullWidth,
    height: gameFullHeight,
    type: Phaser.AUTO,                             // let phaser automatically choose the best render option
    backgroundColor: DarkGray_background,
    physics: {                                     // game's physics system
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
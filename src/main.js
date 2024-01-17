
import Phaser from "phaser";
// Scenes
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";
import GameBackground from "./scenes/gameBackground";
import GameOver from "./scenes/GameOver";

import * as SceneKeys from './consts/SceneKeys'
import { gameFullWidth, gameFullHeight } from './consts/Sizes'
import { DarkGray_background } from './consts/Colors'




// Phaser's instance setup
const config = {
    width: gameFullWidth,
    height: gameFullHeight,
    // let phaser automatcaly choose the best render option
    type: Phaser.AUTO,
    backgroundColor: DarkGray_background,
    // game's physics system
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.Game, Game)
game.scene.add(SceneKeys.GameBackground, GameBackground)
game.scene.add(SceneKeys.GameOver, GameOver)

game.scene.start(SceneKeys.TitleScreen)
// game.scene.start(SceneKeys.Game)
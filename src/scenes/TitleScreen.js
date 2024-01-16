import Phaser from "phaser";
import { Game } from '../consts/SceneKeys'
import WebFontFile from "./webFontFile";
import {gameHalfWidth, gameHalfHeight} from '../consts/Sizes'

export default class TitleScreen extends Phaser.Scene
{
    preload(){
        const font =  new WebFontFile(this.load, ['Pixelify Sans'])
        this.load.addFile(font)

    }

    create() {
        const tittle = this.add.text( gameHalfWidth, gameHalfHeight * 0.65, 'Old School Ping Pong', {
            fontSize: gameHalfWidth * 0.15,
            fontStyle: 'bold',
            fontFamily: '"Pixelify Sans"'
        })
        tittle.setOrigin(0.5, 0.5)

        this.add.text(gameHalfWidth, gameHalfHeight * 1.1, 'Press SPACE to Start', {
            fontSize: gameHalfWidth * 0.08,
            fontStyle: 'bold',
            fontFamily: '"Pixelify Sans"',
            color: '#3498db'

        })
        .setOrigin(0.5, 0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(Game)
        })

    }
}
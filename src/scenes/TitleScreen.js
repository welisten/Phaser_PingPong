import Phaser from "phaser";
import WebFontFile from "./webFontFile";
// Scenes
import { Game } from '../consts/SceneKeys'
// Consts
import {gameHalfWidth, gameHalfHeight} from '../consts/Sizes'
import {Pixelify} from '../consts/Fonts'
import { Blue_SubTitle_Str } from '../consts/Colors'
import * as AudioKeys from '../consts/AudioKeys'

export default class TitleScreen extends Phaser.Scene
{
    preload(){
        const font =  new WebFontFile(this.load, ['Pixelify Sans'])
        this.load.addFile(font)

        this.load.audio(AudioKeys.TitleSong, 'assets/titleSong.mp3')

    }

    create() {
        this.sound.play(AudioKeys.TitleSong)
        
        const tittle = this.add.text( gameHalfWidth, gameHalfHeight * 0.65, 'Old School Ping Pong', {
            fontSize: gameHalfWidth * 0.15,
            fontStyle: 'bold',
            fontFamily: Pixelify
        })
        tittle.setOrigin(0.5, 0.5)

        this.add.text(gameHalfWidth, gameHalfHeight * 1.1, 'Press SPACE to Start', {
            fontSize: gameHalfWidth * 0.08,
            fontStyle: 'bold',
            fontFamily: Pixelify,
            color: Blue_SubTitle_Str

        })
        .setOrigin(0.5, 0.5)


        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.stopByKey(AudioKeys.TitleSongs)
            this.sound.play(AudioKeys.PongBeep)
            this.scene.start(Game)
        })

    }
}
//Phaser3.5
import Phaser from "phaser";

// Web Font Loader Library
import WebFontFile from "./webFontFile";

// Scenes
import { Game } from '../consts/SceneKeys'

// Consts
import * as AudioKeys from '../consts/AudioKeys'
import {gameHalfWidth, gameHalfHeight} from '../consts/Sizes'
import {Pixelify} from '../consts/Fonts'
import { Blue_SubTitle_Str } from '../consts/Colors'


export default class TitleScreen extends Phaser.Scene
{
    preload(){
        const font =  new WebFontFile(this.load, ['Pixelify Sans'])
        this.load.addFile(font)
    /* ??? if it wa already loaded on Preload, why is this here */
        this.load.audio(AudioKeys.TitleSong, 'assets/titleSong.mp3')

    }

    create() {
        this.sound.play(AudioKeys.TitleSong)
        
        this.add.text( gameHalfWidth, gameHalfHeight * 0.65, 'Old School Ping Pong', {
            fontSize: gameHalfWidth * 0.15,
            fontStyle: 'bold',
            fontFamily: Pixelify
        })
            .setOrigin(0.5)

        this.add.text(gameHalfWidth, gameHalfHeight * 1.1, 'Press SPACE to Start', {
            fontSize: gameHalfWidth * 0.08,
            fontStyle: 'bold',
            fontFamily: Pixelify,
            color: Blue_SubTitle_Str

        })
            .setOrigin(0.5)


        this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.stopByKey(AudioKeys.TitleSong)
            this.sound.play(AudioKeys.PongBeep)
            // this.time.delayedCall(time, () => {})
            this.scene.start(Game)
        })

    }
}
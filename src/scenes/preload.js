import Phaser from "phaser";

import { TitleScreen } from "../consts/SceneKeys";
import WebFontFile from "./webFontFile";

import * as AudioKeys from '../consts/AudioKeys' 

export default class Preload extends Phaser.Scene
{
    preload(){
        
        const font = new WebFontFile(this.load, 'Pixelify Sans')
        this.load.addFile(font)

        this.load.audio(AudioKeys.PongBeep, 'assets/ping_pong_8bit_beeep.wav')
        this.load.audio(AudioKeys.PongPlop, 'assets/ping_pong_8bit_plop.wav')
    }

    create(){
        this.scene.start(TitleScreen)
    }
}
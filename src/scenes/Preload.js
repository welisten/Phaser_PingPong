//Phaser 3.5
import Phaser from "phaser";

// Web font File API
import WebFontFile from "./WebFontFile";

// Consts
import { TitleScreen } from "../consts/SceneKeys";
import * as AudioKeys from '../consts/AudioKeys' 

export default class Preload extends Phaser.Scene
{
    preload(){
        
        const font = new WebFontFile(this.load, 'Pixelify Sans')
        this.load.addFile(font)

        this.load.audio(AudioKeys.PongBeep, 'assets/ping_pong_8bit_beeep.wav')
        this.load.audio(AudioKeys.PongPlop, 'assets/ping_pong_8bit_plop.wav')
        this.load.audio(AudioKeys.GameOverSound, 'assets/gameover.wav')
        this.load.audio(AudioKeys.WinnerSound, 'assets/win.wav')
        this.load.audio(AudioKeys.TitleSong, 'assets/titleSong.mp3')
    }

    create(){
        this.scene.start(TitleScreen)
    }
}
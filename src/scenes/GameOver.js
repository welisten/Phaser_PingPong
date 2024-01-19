import Phaser from "phaser";

import WebFontFile from "./webFontFile";

// Scenes
import { TitleScreen} from '../consts/SceneKeys'

// Constants
import { Pixelify } from "../consts/Fonts";
import { gameHalfHeight, gameHalfWidth, gameFullHeight, gameFullWidth } from '../consts/Sizes'
import * as Colors from '../consts/Colors'
import * as AudioKeys from '../consts/AudioKeys'


export default class GameOver extends Phaser.Scene{
    init()
    {
        this.Title = {
            title: 'Game over !',
            FontFamily: Pixelify,
            FontSize: gameHalfWidth * 0.3,
            Color: Colors.Red_Score,
            Song: AudioKeys.GameOverSound
        }
    }

    preloade()
    {
        const font = new WebFontFile(this.load, ['Pixelify Sans'])
        this.load.addFile(font)
    }
    
    /**
    * @param {{ leftScore: number, rightScore: number}} data 
    */

    create(data)
    {


        if(data.leftScore > data.rightScore)
        {
            // Player win
            this.Title.title =  ' You Win !'
            this.Title.Color = Colors.Green_Score
            this.Title.Song = AudioKeys.WinnerSound
        } 


        this.add.rectangle(20, 20, (gameFullWidth - 40), (gameFullHeight - 40), Colors.White, 1 )
        .setOrigin(0.0)
        .setStrokeStyle(2, Colors.White, 1)
        .isFilled = false

        this.add.text(gameHalfWidth, gameHalfHeight * 0.65, this.Title.title, {
            fontFamily: this.Title.FontFamily,
            fontSize: this.Title.FontSize,
            fontStyle: 'bold',
            color: this.Title.Color
        })
        .setOrigin(0.5)

        this.add.text(gameHalfWidth, gameHalfHeight * 1.1, 'Press "SPACE" to continue', {
            fontFamily: Pixelify,
            fontSize: gameHalfWidth * 0.08,
            fontStyle: 'bold',
            color: Colors.WhiteStr
        })
        .setOrigin(0.5)

        this.sound.play(this.Title.Song)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(TitleScreen)
        })
    }
}
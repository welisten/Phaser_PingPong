import Phaser from "phaser";

import WebFontFile from "./webFontFile";

import {White, Green_Score, Red_Score} from '../consts/Colors'
import {gameHalfHeight, gameHalfWidth} from '../consts/Sizes'
import { TitleScreen } from '../consts/SceneKeys'

const Title = {
    title: 'Game over !',
    FontFamily: '"Pixelify Sans"',
    FontSize: gameHalfWidth * 0.3,
    Color: Red_Score
}


export default class GameOver extends Phaser.Scene{

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
            // you win
            Title.title =  ' You Win !'
            Title.Color = Green_Score
        }

        this.add.text(gameHalfWidth, gameHalfHeight, Title.title, {
            fontFamily: Title.FontFamily,
            fontSize: Title.FontSize,
            fontStyle: 'bold',
            color: Title.Color
        })
        .setOrigin(0.5)

        this.add.text(gameHalfWidth, gameHalfHeight, 'Press "SPACE" to continue', {
            fontFamily: '"Pixalify Sans"',
            fontSize: gameHalfWidth * 0.2,
            fontStyle: 'bold',
            color: White
        })
        .setOrigin(0.5, 0.5)

        this.input.keybord.once('keybord-SPACE', () => {
            this.Scene.start(TitleScreen)
        })
    }
}
import Phaser from "phaser";

import { White } from '../consts/Colors'
import {gameHalfWidth, gameHalfHeight, gameFullHeight, gameFullWidth} from '../consts/Sizes'

export default class GameBackground extends Phaser.Scene
{
    preload()
    {

    }

    create() 
    {
        this.add.rectangle(20, 20, (gameFullWidth - 40), (gameFullHeight - 40), White, 1 )
            .setOrigin(0.0)
            .setStrokeStyle(2, White, 1)
            .isFilled = false
        
        this.add.line( gameHalfWidth, 0, 0, 20 , 0, (gameFullHeight -20), White, 1)
            .setOrigin(0 ,0)

        this.add.circle(gameHalfWidth, gameHalfHeight, gameHalfHeight * 0.3, White,  1)
            .setStrokeStyle(4, White, 1)
            .isFilled = false
    }
}
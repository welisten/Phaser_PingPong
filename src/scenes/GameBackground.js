import Phaser from "phaser";

let middleWidth = (window.innerWidth - 20) / 2
let midleHeight = (window.innerHeight - 20) / 2 

export default class GameBackground extends Phaser.Scene
{
    preload()
    {

    }

    create() 
    {
        this.add.rectangle(20, 20, (middleWidth *2) -40, (midleHeight * 2) -40, 0xffffff, 1 )
            .setOrigin(0.0)
            .setStrokeStyle(2, 0xffffff, 1)
            .isFilled = false
        
        this.add.line( middleWidth, 0, 0, 20 , 0, (midleHeight*2 -20), 0xffffff, 1)
            .setOrigin(0 ,0)

        this.add.circle(middleWidth, midleHeight, midleHeight * 0.3, 0xffffff,  1)
            .setStrokeStyle(4, 0xffffff, 1)
            .isFilled = false
    }
}
import Phaser from "phaser";

import WebFontFile from "./webFontFile";
import GameBackground from "./gameBackground";


let windowInnerW = window.innerWidth - 20
let windowInnerH = window.innerHeight - 20 

export default class Game extends Phaser.Scene
{

    init()
    {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

        this.leftScore = 0
        this.rightScore = 0
    }
    preload()
    {
        const fonts = new WebFontFile(this.load, 'Pixelify Sans')
        this.load.addFile(fonts)
    }

    create()
    {
        this.scene.run('game-background')
        this.scene.sendToBack('game-background')
        this.physics.world.setBounds(-100, 20, windowInnerW+ 200, windowInnerH - 40)
        
        this.ball = this.add.circle(windowInnerW /2, windowInnerH / 2, 10, 0xffffff, 1)
      
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)

        this.resetBall()
        
        this.ball.body.setCollideWorldBounds(true, 1, 1)
        
        this.paddleLeft = this.add.rectangle( 35, (windowInnerH / 2), 20, 150, 0xffffff)
        this.physics.add.existing(this.paddleLeft, true)
        
        this.paddleRight = this.add.rectangle(windowInnerW - 35, (windowInnerH / 2), 20, 150, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true)
        
        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)
        
        this.leftScoreLabel = this.add.text((windowInnerW / 2 ) * 0.75  , (windowInnerH / 2) * 0.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: windowInnerW * 0.08,
            fontStyle: 'bold',
            color: '#2ecc71'
        })
        .setOrigin(0.5, 0.5)
        
        this.rightScoreLabel = this.add.text((windowInnerW / 2) * 1.25, (windowInnerH / 2) * 1.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: windowInnerW * 0.08,
            fontStyle: 'bold',
            color: '#e74c3c'
        })
        .setOrigin(0.5, 0.5)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(){
        /**@type {Phaser.Physics.Arcade.Body} */
        const body = this.paddleLeft.body
        if (this.cursors.up.isDown){
            this.paddleLeft.y -= 5
            body.updateFromGameObject()
        } else if(this.cursors.down.isDown){
            this.paddleLeft.y += 5
            body.updateFromGameObject()
        }

        const diff = this.ball.y - this.paddleRight.y
        
        if(Math.abs(diff) < 5){
            return
        }

        const aiSpeed = 4
        if( diff < 0){
            // the ball is above the paddle
            this.paddleRightVelocity.y = -aiSpeed
            if(this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y = -10
            }

        } else if ( diff > 0){
            // the ball is below the 
            this.paddleRightVelocity.y = aiSpeed
            if(this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y = 10
            }

        }
        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()

        if(this.ball.x < -30)
        {
            this.resetBall()
            this.incrementRightScore()
        }
        else if (this.ball.x > (windowInnerW + 30))
        {
            this.resetBall()
            this.incrementLeftScore()
        }

    }

    incrementLeftScore() {
        this.leftScore += 1
        this.leftScoreLabel.text = this.leftScore
    }

    incrementRightScore(){
        this.rightScore += 1
        this.rightScoreLabel.text = this.rightScore
    }

    resetBall(){
        const ballVelocity = 300

        this.ball.setPosition((windowInnerW/ 2), (windowInnerH / 2))
        const angle = Phaser.Math.Between(0, 360) 
        const vec =  this.physics.velocityFromAngle(angle, ballVelocity)


        this.ball.body.setVelocity(vec.x, vec.y)
    }
}
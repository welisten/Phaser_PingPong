import Phaser from "phaser";

import WebFontFile from "./webFontFile";
import GameBackground from "./gameBackground";


let windowInnerW = window.innerWidth - 20
let windowInnerH = window.innerHeight - 20 

let middleWidth = windowInnerW / 2
let middleHeight = windowInnerH / 2

export default class Game extends Phaser.Scene
{

    init()
    {
        // variable stored to be used before
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
        // add and setting the background as a background
        this.scene.run('game-background')
        this.scene.sendToBack('game-background')
        
        // setting the game's screen bounds
        this.physics.world.setBounds( -100, 20, windowInnerW + 200, windowInnerH - 40 )
        

        // creating the ball (Game_object)
        this.ball = this.add.circle(middleWidth, middleHeight, 10, 0xffffff, 1)
        
        //adding the ball to be affected by world's physics rules
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1) // -> coefficient of restitution on axio X and Y



        this.resetBall()
        this.ball.body.setCollideWorldBounds(true, 1, 1)
        
        // making paddles
        this.paddleLeft = this.add.rectangle( 35, middleHeight, 20, 150, 0xffffff, 1)
        this.physics.add.existing(this.paddleLeft, true) // -> static
        
        this.paddleRight = this.add.rectangle(windowInnerW - 35, middleHeight, 20, 150, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true)
        
        // adding the collision possibility between the paddle and the ball
        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)
        

        // the score interface / the label
        this.leftScoreLabel = this.add.text(middleWidth * 0.75  , middleHeight * 0.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: windowInnerW * 0.08,
            fontStyle: 'bold',
            color: '#2ecc71' // -> green
        })
        .setOrigin(0.5, 0.5)
        
        this.rightScoreLabel = this.add.text(middleWidth * 1.25, middleHeight * 1.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: windowInnerW * 0.08,
            fontStyle: 'bold',
            color: '#e74c3c' // -> red
        })
        .setOrigin(0.5, 0.5)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(){
        /**@type {Phaser.Physics.Arcade.Body} */
        const body = this.paddleLeft.body


        if (this.cursors.up.isDown)
        {
            this.paddleLeft.y -= 5
            body.updateFromGameObject() // atualiza o corpo do objeto na DOM
        } 
        else if(this.cursors.down.isDown)
        {
            this.paddleLeft.y += 5
            body.updateFromGameObject()
        }

        // diference beetween the vertical position of the ball and the right paddle
        const diff = this.ball.y - this.paddleRight.y
        
        // the updating will only happen if the difference be more than a range of 5 numbers
        if(Math.abs(diff) < 5){
            return
        }

        // the speed of right paddle AI reaction 
        const aiSpeed = 4
        
        // AI LOGIC
        if( diff < 0) // the ball is above the paddle - The paddle must up
        {
            
            this.paddleRightVelocity.y = -aiSpeed
            
            if(this.paddleRightVelocity.y < -10)
            {
                this.paddleRightVelocity.y = -10
            }

        } 
        else if ( diff > 0) // the ball is below the - The paddle must down
        {
            
            this.paddleRightVelocity.y = aiSpeed
        
            if(this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y = 10
            }
        }
        // updating the paddle poition
        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()

        // SCORING LOGIC
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

        // positioning the ball
        this.ball.setPosition(middleWidth, middleHeight)

        // setting a random direction based on an angle
        const angle = Phaser.Math.Between(0, 360) 
        const vec =  this.physics.velocityFromAngle(angle, ballVelocity)
        this.ball.body.setVelocity(vec.x, vec.y)
    }
}
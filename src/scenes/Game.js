import Phaser from "phaser";

import WebFontFile from "./webFontFile";

import { GameBackground, GameOver } from '../consts/SceneKeys'
import { gameFullWidth, gameFullHeight, gameHalfWidth, gameHalfHeight } from '../consts/Sizes'
import { White, Green_Score, Red_Score } from '../consts/Colors'

const GameState = {
    Running: 'running',
    PlayerWon: 'player-won',
    AIWon: 'ai-won'
}
export default class Game extends Phaser.Scene
{

    init(){
        // variable stored to be used before
        this.gameState = GameState.Running
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)
        
        this.leftScore = 0
        this.rightScore = 0

        // there is other ways to do this
        this.paused = false
    }

    preload(){
        const fonts = new WebFontFile(this.load, 'Pixelify Sans')
        this.load.addFile(fonts)
    }

    create(){
        // add and setting the background as a background
        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground)
        
        // setting the game's screen bounds
        this.physics.world.setBounds( -100, 20, gameFullWidth + 200, gameFullHeight - 40 )
        

        // creating the ball (Game_object)
        this.ball = this.add.circle(gameHalfWidth, gameHalfHeight, 10, White, 1)
        
        //adding the ball to be affected by world's physics rules
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1) // -> coefficient of restitution on axio X and Y
        this.ball.body.setCircle(10) // set the body to be a circle instead of a square


        this.ball.body.setCollideWorldBounds(true, 1, 1)
        
        // making paddles
        this.paddleLeft = this.add.rectangle( 35, gameHalfHeight, 20, 150, White, 1)
        this.physics.add.existing(this.paddleLeft, true) // -> static
        
        this.paddleRight = this.add.rectangle(gameFullWidth - 35, gameHalfHeight, 20, 150, White, 1)
        this.physics.add.existing(this.paddleRight, true)
        
        // adding the collision possibility between the paddle and the ball
        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)
        

        // the score interface / the label
        this.leftScoreLabel = this.add.text(gameHalfWidth * 0.75  , gameHalfHeight * 0.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: gameFullWidth * 0.08,
            fontStyle: 'bold',
            color: Green_Score 
        })
        .setOrigin(0.5, 0.5)
        
        this.rightScoreLabel = this.add.text(gameHalfWidth * 1.25, gameHalfHeight * 1.5, '0', {
            fontFamily: '"Pixelify Sans"',
            fontSize: gameFullWidth * 0.08,
            fontStyle: 'bold',
            color: Red_Score
        })
        .setOrigin(0.5, 0.5)
        
        this.cursors = this.input.keyboard.createCursorKeys()
        this.time.delayedCall(1000, () => {
            this.resetBall()
        })
    }

    update(){
        if(this.paused || this.gameState !== GameState.Running)
        {
            return
        }
        this.processPlayerInput()
        this.updateAi()
        this.checkScore()
    }

    processPlayerInput(){
        /**@type {Phaser.Physics.Arcade.Body} */
        const body = this.paddleLeft.body
        
        if (this.cursors.up.isDown)
        {
            this.paddleLeft.y -= 10
            body.updateFromGameObject() // atualiza o corpo do objeto na DOM
        } 
        else if(this.cursors.down.isDown)
        {
            this.paddleLeft.y += 10
            body.updateFromGameObject()
        }
    }

    updateAi() { // AI LOGIC

        // diference beetween the vertical position of the ball and the right paddle
        const diff = this.ball.y - this.paddleRight.y
        
        // the updating will only happen if the difference be more than a range of 5 numbers
        if(Math.abs(diff) < 5){
            return
        }

        // the speed of right paddle AI reaction 
        const aiSpeed = 2.5
        
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

    }

    checkScore(){ // SCORING LOGIC
        let x = this.ball.x
        const leftBound = -30
        const rightBound = gameFullWidth + 30
        
        if(x >= leftBound && x <= rightBound) {
            return
        }

        if(this.ball.x < leftBound)
        {
            this.incrementRightScore()
        }
        else if (this.ball.x > rightBound)
        {
            this.incrementLeftScore()
        }

        const maxScore = 1
        if(this.leftScore >= maxScore)
        {
            //Player won
            console.log("Player won")
            this.gameState = GameState.PlayerWon
        }
        else if(this.rightScore >= maxScore)
        {
            // the AI won
            console.log("AI won")
            this.gameState = GameState.AIWon
        }

        if(this.gameState === GameState.Running)
        {
            this.resetBall()
        }
        else
        {
            this.physics.world.remove(this.ball.body)

            // Show the Game Over/Win screen
            this.scene.start(GameOver, {
                leftScore: this.leftScore,
                rightScore: this.rightScore
            })
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

    resetBall(){ //BALL'S VELOCITY AND RANDOM DIRECTION LOGIC
        const ballVelocity = 400

        // positioning the ball
        this.ball.setPosition(gameHalfWidth, gameHalfHeight)

        // setting a random direction based on an angle
        const angle = Phaser.Math.Between(10, 60 )
        const factor = 90 * Phaser.Math.Between(1, 4)
        const vec =  this.physics.velocityFromAngle(angle + factor, ballVelocity)
        this.ball.body.setVelocity(vec.x, vec.y)
    }
}
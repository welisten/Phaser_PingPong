// Sizes to optimize the canvas screen setup and create a relative size for any other else element

const gameFullWidth  = window.innerWidth - 20 // -> 20 = "padding"
const gameFullHeight = window.innerHeight - 20

const gameHalfWidth  = gameFullWidth / 2
const gameHalfHeight = gameFullHeight / 2

export {
    gameFullWidth,
    gameFullHeight,
    gameHalfWidth,
    gameHalfHeight
}
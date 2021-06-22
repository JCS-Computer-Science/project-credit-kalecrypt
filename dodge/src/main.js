import Phaser from './lib/phaser.js'

import Game from './scenes/game.js'

import gameover from './scenes/gameover.js'
//physics and scene mangement 
export default new Phaser.Game({
     type: Phaser.AUTO,
     width: 640,
    height: 640,
    scene: [Game, gameover],
    physics: {
         default: 'arcade',
         arcade: {
     gravity: {
         y: 200
         },
         debug: false
         }
        }
        
})

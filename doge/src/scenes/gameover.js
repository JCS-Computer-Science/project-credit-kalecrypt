import Phaser from '../lib/phaser.js'

//the game over screen and reset button 

export default class GameOver extends Phaser.Scene
 {
 constructor()
 {
 super('game-over')
 }
preload(){
    this.load.image('background', 'assets/download.jpg')
}
create()
 {this.add.image(0,300, 'background')
    const width = this.scale.width
     const height = this.scale.height
    
     this.add.text(width * 0.5, height * 0.5, 'Game Over', {
     fontSize: 48
     })
     .setOrigin(0.5)

     this.input.keyboard.once('keydown_SPACE', () => {
         this.scene.start('game')

         
         })
        
        

 }

 }

 

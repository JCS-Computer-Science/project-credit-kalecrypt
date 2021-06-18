import Phaser from '../lib/phaser.js'



 export default class Game extends Phaser.Scene
 {
    //varables for using this. with
     /** @type {Phaser.Physics.Arcade.Sprite} */
player
     /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
cursors
/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
bads
/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
badsnumber
/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
time
/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
speed


 constructor()
 
{
super('game')
 }
 init()
 {
//reseting varables
 this.time = 0
 this.speed = 0
 this.badsnumber = 0
 }


 preload()
 {
   //visual and audio
   // note the sound loops and is distorted that was intetional i find it fun
    this.cursors = this.input.keyboard.createCursorKeys()
    this.load.image('background', 'assets/bg.png')
    this.load.image('ground', 'assets/ground.png')
    this.load.image('spaceman','assets/lookhitbox.png')
    this.load.image('bad','assets/character_0005.png')
    this.load.image('turnright','assets/fire to the left.png')
    this.load.image('turnleft','assets/firetotheright.png')
    this.load.audio('moveleft', 'assets/sounds/threeTone1.ogg')
    this.load.audio('moveright', 'assets/sounds/threeTone2.ogg')
    this.load.audio('lose', 'assets/sounds/powerUp3.ogg')
    
 }

 create()
 {
//makes the back ground
this.add.image(500, 320, 'background')
.setScrollFactor(1,0 )
this.add.image(1020, 1125, 'ground')
.setScrollFactor(0, 1)
//makes  obsicals 

this.bads = this.physics.add.staticGroup()
 for (let i = 0; i < 5; ++i)
 {
 const x = Phaser.Math.Between(0 , 500)
 const y = 150 * i

 
 /** @type {Phaser.Physics.Arcade.Sprite} */
 const bad = this.bads.create(x, y, 'bad')
 bad.scale = 2

 /** @type {Phaser.Physics.Arcade.StaticBody} */
 const body = bad.body
 body.updateFromGameObject()
 }


//adds colition
 this.physics.add.collider(this.bads, this.player)


 this.player = this.physics.add.sprite(100, 320, 'spaceman')
.setScale(3) //gives phisics and sets the scale

//camara/pov
this.cameras.main.startFollow(this.player)
this.cameras.main.setDeadzone(this.scale.width * 1.5)
//lose condition
this.physics.add.overlap(
         this.player,
         this.bads,
         this.lose, 
         undefined,
        this)
 }

 update(){
    // score and dificulty system
this.time++
this.speed = (this.time/-15)-50
this.badsnumber++
console.log(this.time)
//his is score^^

//console.log(this.badsnumber)
//dificulty increase
if (this.badsnumber >= 1000) {
   this.badsnumber = this.badsnumber-1000
   const x = Phaser.Math.Between(-100 , 500)
 const y = 150 * Math.random();
 //console.log(this.badsnumber)
 
 /** @type {Phaser.Physics.Arcade.Sprite} */
 const bad = this.bads.create(x, y, 'bad')
 bad.scale = 2

 /** @type {Phaser.Physics.Arcade.StaticBody} */
 const body = bad.body
 body.updateFromGameObject()
 
  
}


 if (true)
 {
    //up movement
    this.player.setVelocityY(this.speed)
 }
 //controlls
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-150)
        this.player.setTexture('turnleft')
        this.sound.play('moveleft')
    }else if(this.cursors.right.isDown){
      this.player.setVelocityX(+150)
      this.player.setTexture('turnright')
      this.sound.play('moveright')
     }else{
        this.player.setVelocityX(+0)
        this.player.setTexture('spaceman')
     }
//screen warp
     this.horizontalWrap(this.player)
// recreates enemeys after thay fall of the map
     this.bads.children.iterate(child => {
         /** @type {Phaser.Physics.Arcade.Sprite} */
         const bad = child
        
         const scrollY = this.cameras.main.scrollY
         if (bad.y >= scrollY + 700)
        {
         bad.y = scrollY - Phaser.Math.Between(50, 100)
         bad.body.updateFromGameObject()
         }
         })
        
}

 /**
 * @param {Phaser.GameObjects.Sprite} sprite
 */
 horizontalWrap(sprite)
 {
 const halfWidth = sprite.displayWidth * 0.5
 const gameWidth = this.scale.width
 if (sprite.x < -halfWidth)
 {
 sprite.x = gameWidth + halfWidth
 }
 else if (sprite.x > gameWidth + halfWidth)
 {
 sprite.x = -halfWidth
 }

  }
//gameover function
lose(player,bads){
   this.sound.play('lose')
    this.scene.start('game-over') 
    
}
 }
    
 

 

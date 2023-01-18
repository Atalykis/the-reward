import type { AudioMixer } from "./audio"
import { Character } from "./character"
import type { Graphics } from "./graphics"
import { PlateInteractions } from "./interaction"
import type { Physics, Position } from "./physics"



export class Run {
  private plateInteraction: PlateInteractions 
  private interval: NodeJS.Timer | undefined
  private movementIntervals: Map<string, NodeJS.Timer> = new Map()
  private movementInterval: NodeJS.Timer | undefined
  private character: Character = new Character()
  constructor(private graphics: Graphics, private physics: Physics, private audioMixer: AudioMixer){
    this.physics.setCharacter(this.character)
    this.plateInteraction = new PlateInteractions(this.graphics, this.physics, this.character)
  }

  startRun(){
    this.graphics.renderRestaurant()
    this.audioMixer.manageTablesSounds()
    this.audioMixer.playAmbiance()
    if(!this.interval) this.interval = setInterval(() => this.loop(), 60000)
  }

  loop(){
    this.graphics.renderRestaurant()
    for(const interval of this.movementIntervals.values()){
      clearInterval(interval)
    }
    this.plateInteraction.reset()
    this.physics.resetCharacterPosition()
  }

  clearLoop(){
    clearInterval(this.interval)
  }

  moveCharacterLeft(){
    if(this.movementIntervals.get("left")) return
    this.movementIntervals.set("left", setInterval(() => this.moveLeft(), 16))
    // this.movementInterval = setInterval(() => this.moveLeft(), 16)
    this.graphics.renderMovementAnimation("left")
  }

  moveCharacterRight(){
    if(this.movementIntervals.get("right")) return
    this.movementIntervals.set("right", setInterval(() => this.moveRight(), 16))
    // this.movementInterval = setInterval(() => this.moveRight(), 16)
    this.graphics.renderMovementAnimation("right")
  }

  moveCharacterUp(){
    if(this.movementIntervals.get("up")) return
    this.movementIntervals.set("up", setInterval(() => this.moveUp(), 16))
    // this.movementInterval = setInterval(() => this.moveUp(), 16)
    this.graphics.renderMovementAnimation("up")
  }

  moveCharacterDown(){
    if(this.movementIntervals.get("down")) return
    this.movementIntervals.set("down", setInterval(() => this.moveDown(), 16))
    // this.movementInterval = setInterval(() => this.moveDown(), 16)
    this.graphics.renderMovementAnimation("down")
  }

  moveLeft(){
    this.physics.moveLeft()
    this.audioMixer.manageTablesSounds()
  }

  moveRight(){
    this.physics.moveRight()
    this.audioMixer.manageTablesSounds()
  }

  moveUp(){
    this.physics.moveUp()
    this.audioMixer.manageTablesSounds()
  }

  moveDown(){
    this.physics.moveDown()
    this.audioMixer.manageTablesSounds()
  }

  playPlateInteraction(){
    this.plateInteraction.play()
  }

  stopCharacterMovement(direction: string){
    const interval = this.movementIntervals.get(direction)
    clearInterval(interval)
    this.movementIntervals.delete(direction)
    this.graphics.stopAnimation(direction)
  }

  // stopCharacterMovement(){
  //   clearInterval(this.movementInterval)
  //   this.graphics.stopAnimation()
  // }
}

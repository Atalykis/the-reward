import type { AudioMixer } from "./audio"
import { Character } from "./character"
import type { Graphics } from "./graphics"
import { PlateInteractions } from "./interaction"
import type { Physics, Position } from "./physics"



export class Run {
  private plateInteraction: PlateInteractions 
  private interval: NodeJS.Timer | undefined
  private movementIntervals: Map<string, NodeJS.Timer> = new Map()
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
    this.physics.resetCharacterPosition()
  }

  clearLoop(){
    clearInterval(this.interval)
  }

  moveCharacterLeft(){
    if(this.movementIntervals.get("Left")) return
    this.movementIntervals.set("Left", setInterval(() => this.moveLeft(), 16))
  }

  moveCharacterRight(){
    if(this.movementIntervals.get("Right")) return
    this.movementIntervals.set("Right", setInterval(() => this.moveRight(), 16))
  }

  moveCharacterUp(){
    if(this.movementIntervals.get("Up")) return
    this.movementIntervals.set("Up", setInterval(() => this.moveUp(), 16))
  }

  moveCharacterDown(){
    if(this.movementIntervals.get("Down")) return
    this.movementIntervals.set("Down", setInterval(() => this.moveDown(), 16))
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
  }
}

import { Character } from "./character"
import type { Graphics } from "./graphics"
import type { Physics } from "./physics"

export class Run {
  private interval: NodeJS.Timer | undefined
  private movementIntervals: Map<string, NodeJS.Timer> = new Map()
  private character: Character = new Character()
  constructor(private graphics: Graphics, private physics: Physics){
    this.physics.setCharacter(this.character)
  }

  startRun(){
    this.graphics.renderRestaurant()
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
    this.movementIntervals.set("Left", setInterval(() => this.physics.moveLeft(), 16))
  }

  moveCharacterRight(){
    if(this.movementIntervals.get("Right")) return
    this.movementIntervals.set("Right", setInterval(() => this.physics.moveRight(), 16))
  }

  moveCharacterUp(){
    if(this.movementIntervals.get("Up")) return
    this.movementIntervals.set("Up", setInterval(() => this.physics.moveUp(), 16))
  }

  moveCharacterDown(){
    if(this.movementIntervals.get("Down")) return
    this.movementIntervals.set("Down", setInterval(() => this.physics.moveDown(), 16))
  }

  stopCharacterMovement(direction: string){
    const interval = this.movementIntervals.get(direction)
    clearInterval(interval)
    this.movementIntervals.delete(direction)
  }
}

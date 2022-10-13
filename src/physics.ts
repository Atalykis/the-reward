import type { Character } from "./character"
import { Physical, Plants, Tables } from "./physical"

export interface Position {
  x: number,
  y: number
}

export interface Size {
  width: number,
  height: number
}

export class Physics{
  private readonly stageSize: Size = {
    width: 1200,
    height: 868
  }
  private tables = Tables
  private plants = Plants
  private physicals: Physical[] = [...this.tables, ...this.plants] 
  public character: Character | undefined
  constructor(){}

  getDistancesXY(pos1: Position, pos2: Position){
    return {distanceX: Math.abs(pos1.x - pos2.x), distanceY : Math.abs(pos1.y - pos2.y)}
  }

  getDistance(pos1: Position, pos2: Position){
    const { distanceX, distanceY } = this.getDistancesXY(pos1, pos2)
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
  }

  characterDistanceWithTables(){
    if(!this.character) return []
    const associatedDistances = []
    for(const table of this.tables){
      const distance = this.getDistance(this.character.getCenter(), table.getCenter())
      associatedDistances.push({ table: table.name, distance: distance})
    }
    return associatedDistances
  }

  canMove(to: Position){
    if(!this.character) return
    const nextCenter = { x: to.x + this.character.size.width/2 , y: to.y + this.character.size.height/2}
    for(const object of this.physicals){
      const objectCenter = object.getCenter()
      const { distanceX, distanceY } = this.getDistancesXY(nextCenter, objectCenter)
      if(distanceX < ((object.size.width + this.character.size.width)/2) && distanceY < ((object.size.height + this.character.size.height)/2)) return false
    }
    return true
  }

  moveRight(){
    if(!this.character) return
    const next = {x: this.character.position.x + this.character.speed, y: this.character.position.y}
    if(next.x + this.character.size.width > this.stageSize.width) return
    if(!this.canMove(next)) return
    this.character.move(next)
  }

  moveLeft(){
    if(!this.character) return
    const next = {x: this.character.position.x - this.character.speed, y: this.character.position.y}
    if(next.x < 0) return
    if(!this.canMove(next)) return
    this.character.move(next)
  }

  moveDown(){
    if(!this.character) return
    const next = {x: this.character.position.x, y: this.character.position.y + this.character.speed}
    if(next.y + this.character.size.height > this.stageSize.height) return
    if(!this.canMove(next)) return
    this.character.move(next)
  }

  moveUp(){
    if(!this.character) return
    const next = {x: this.character.position.x , y: this.character.position.y - this.character.speed}
    if(next.y < 80) return
    if(!this.canMove(next)) return
    this.character.move(next)
  }

  resetCharacterPosition(){
    if(!this.character) return
    this.character.resetPosition()
  }

  setCharacter(character: Character){
    this.character = character
  }
  
}

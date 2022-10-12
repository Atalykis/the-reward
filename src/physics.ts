import type { Character, Position, Size } from "./character"

const table1 = {
  position: {
    x: 240, y: 370
  },
  size: {
    width: 250,
    height: 130
  }
}

const table2 = {
  position: {
    x: 860, y: 370
  },
  size: {
    width: 250,
    height: 130
  }
}

const table3 = {
  position: {
    x: 132, y: 630
  },
  size: {
    width: 250,
    height: 130
  }
}

const table4 = {
  position: {
    x: 785, y: 640
  },
  size: {
    width: 250,
    height: 130
  }
}

interface Table {
  size: Size,
  position: Position
}

export class Physics{
  private readonly stageSize: Size = {
    width: 1200,
    height: 868
  }

  private tables: Table[] = [table1, table2, table3, table4]
  public character: Character | undefined
  constructor(){}

  canMove(to: Position){
    if(!this.character) return
    const characterCenter = { x: to.x + this.character.size.width/2 , y: to.y + this.character.size.height/2}
    for(const table of this.tables){
      const tableCenter = {x: table.position.x + table.size.width/2, y: table.position.y + table.size.height/2}
      if(Math.abs(characterCenter.x - tableCenter.x) < ((table.size.width + this.character.size.width)/2) && Math.abs(characterCenter.y - tableCenter.y) < ((table.size.height + this.character.size.height)/2)) return false
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

import type { Position, Size } from "./physics"

export class Character {
  public position: Position = {
    x: 726,
    y: 82
  }
  public size: Size = {
    width: 45,
    height: 60
  }
  public speed: number = 3

  public holding: boolean = false

  constructor(){}

  move(to: Position){
    this.position = to
  }

  getCenter() : Position{
    return {x : this.position.x + this.size.width/2, y: this.position.y + this.size.height/2}
  }

  resetPosition(){
    this.position = {
      x: 726,
      y: 82
    }
  }

  reverseHolding(){
    this.holding = !this.holding
  }
}
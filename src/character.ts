export interface Position {
  x: number,
  y: number
}

export interface Size {
  width: number,
  height: number
}

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

  constructor(){}

  move(to: Position){
    this.position = to
  }

  resetPosition(){
    this.position = {
      x: 726,
      y: 82
    }
  }
}
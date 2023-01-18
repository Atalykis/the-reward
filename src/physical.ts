import type { Position, Size } from "./physics"

export interface Physical {
  size: Size
  position: Position
  getCenter() : Position
}

export class Plant implements Physical {
  constructor(public position: Position, public size: Size){}

  getCenter() : Position{
    return {x : this.position.x + this.size.width/2, y: this.position.y + this.size.height/2}
  }
}

export class Table implements Physical {
  constructor(public position: Position, public size: Size, public name: string){}

  getCenter() : Position{
    return {x : this.position.x + this.size.width/2, y: this.position.y + this.size.height/2}
  }
}

export class Plate implements Physical {
  public image = new Image(92,74)
  constructor(public position: Position, public size: Size, public destination: Position, src: string){
    this.image.src = src
  }

  getCenter() : Position{
    return {x : this.position.x + this.size.width/2, y: this.position.y + this.size.height/2}
  }
}

const table1 = new Table({ x: 350, y: 450 }, { width: 380, height: 30 }, "table1")

const table2 = new Table({ x: 1350, y: 450 }, { width: 380, height: 30 }, "table2")

const table3 = new Table({ x: 160, y: 800 }, { width: 400, height: 10 }, "table3")

const table4 = new Table({ x: 1220, y: 820 }, { width: 400, height: 10 }, "table4")

const bar = new Table({ x: 150, y: 100 }, { width: 600, height: 40 }, "bar")

const plant1 = new Plant({ x: 0, y: 1000 }, { width: 20, height: 60 })

const plant2 = new Plant({ x: 1820, y: 10 }, { width: 50, height: 10 })

const plant3 = new Plant({ x: 1820, y: 1000 }, { width: 50, height: 60 })

const plant4 = new Plant({ x: 0, y: 30 }, { width: 30, height: 20 })

const plate1 = new Plate({ x: 1150, y: 40 }, { width: 92, height: 74 }, { x: 0, y: 0 }, "plate.png")

const plate2 = new Plate({ x: 1150, y: 40 }, { width: 92, height: 74 }, {x: 500, y: 440}, 'lasagnas.png')

const plate3 = new Plate({ x: 1150, y: 40 }, { width: 92, height: 74 }, {x: 1500, y: 440}, 'lasagnas.png')

export const Plants = [plant1, plant2, plant3, plant4]

export const Tables = [table1, table2, table3, table4, bar]

export const Plates = [plate1, plate2, plate3] 

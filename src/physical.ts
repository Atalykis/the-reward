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

const table1 = new Table({ x: 240, y: 370 }, { width: 250, height: 90 }, "table1")

const table2 = new Table({ x: 860, y: 370 }, { width: 250, height: 90 }, "table2")

const table3 = new Table({ x: 132, y: 630 }, { width: 250, height: 90 }, "table3")

const table4 = new Table({ x: 785, y: 640 }, { width: 250, height: 90 }, "table4")

const bar = new Table({ x: 110, y: 110 }, { width: 400, height: 95 }, "bar")

const plant1 = new Plant({ x: 0, y: 745 }, { width: 50, height: 123 })

const plant2 = new Plant({ x: 1150, y: 30 }, { width: 50, height: 80 })

const plant3 = new Plant({ x: 1150, y: 745 }, { width: 50, height: 123 })

const plant4 = new Plant({ x: 0, y: 30 }, { width: 50, height: 100 })

export const Plants = [plant1, plant2, plant3, plant4]

export const Tables = [table1, table2, table3, table4, bar]
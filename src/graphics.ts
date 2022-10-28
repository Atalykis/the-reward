import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import type { Layer } from "konva/lib/Layer"
import type { Image as KonvaImage } from 'konva/lib/shapes/Image'
import type { Physics, Position } from "./physics";
import { Plates } from "./physical";

const startPng = new Image(225,75)
startPng.src = "start.png"

const restaurantPng = new Image(1200,868)
restaurantPng.src = "restaurant.png"

const tablesPng = new Image(1200,868)
tablesPng.src = "tables.png"

const characterPng = new Image(45,60)
characterPng.src = "sus.png"

const leftPlantPng = new Image(50, 120)
leftPlantPng.src = "leftPlant.png"

const rightPlantPng = new Image(50, 120)
rightPlantPng.src = "rightPlant.png"

const platePng = new Image(40, 17)
platePng.src = "plate.png"

export class Graphics {

  private stage : Stage = new Konva.Stage({
    container: "konva",
    width: 1200,
    height:868
  })

  private layer: Layer = new Konva.Layer()

  private restaurant: KonvaImage = new Konva.Image({
    x:0,
    y:0,
    image: restaurantPng,
    widht: 1200,
    height: 868
  })

  private tables: KonvaImage = new Konva.Image({
    x:0,
    y:0,
    image: tablesPng,
    widht: 1200,
    height: 868
  })

  public start: KonvaImage = new Konva.Image({
    x:488,
    y:363,
    image: startPng,
    widht: 225,
    height: 75
  })

  private character: KonvaImage = new Konva.Image({
    x:726,
    y:82,
    image: characterPng,
    widht: 45,
    height: 60
  })

  private leftPlant: KonvaImage = new Konva.Image({
    x:0,
    y:745,
    image: leftPlantPng,
    widht: 50,
    height: 120
  })

  private rightPlant: KonvaImage = new Konva.Image({
    x:1150,
    y:745,
    image: rightPlantPng,
    widht: 50,
    height: 120
  })

  private plates: KonvaImage[] = []

  private interval: NodeJS.Timer | undefined

  constructor(private physics: Physics){
    this.setPlates()
  }

  setPlates(){
    for(const plate of Plates){
      const konvaImage = new Konva.Image({
        x:plate.position.x,
        y:plate.position.y,
        image: plate.image,
        widht: plate.size.width,
        height: plate.size.height
      })
      this.plates.push(konvaImage)
    }
  }

  renderMainMenu(){
    this.clear()
    this.layer.add(this.start)
    this.layer.draw()
  }

  renderRestaurant(){
    this.clear()
    this.layer.add(this.restaurant)
    this.layer.add(this.plates[0])
    this.layer.add(this.character)
    this.layer.add(this.tables)
    this.layer.add(this.leftPlant)
    this.layer.add(this.rightPlant)
    this.renderCharacterMovement()
    this.layer.draw()
  }

  renderCharacterMovement(){
    this.interval = setInterval(() => this.moveCharacter(), 16)
  }

  moveCharacter(){
    if(!this.physics.character) return
    this.character.setAttrs(this.physics.character.position)
  }

  renderPlate(index: number){
    console.log(index)
    this.layer.add(this.plates[index])
  }

  hidePlate(index: number){
    this.plates[index].hide()

  }

  showPlateOnTable(index: number, table: Position){
    this.plates[index].setAttrs(table)
    this.plates[index].setZIndex(5)
    this.plates[index].show()
  }

  clear(){
    this.layer.removeChildren()
    this.stage.destroyChildren()
    clearInterval(this.interval)
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }
}
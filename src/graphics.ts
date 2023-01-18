import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import type { Layer } from "konva/lib/Layer"
import type { Image as KonvaImage } from 'konva/lib/shapes/Image'
import type { Physics, Position } from "./physics";
import { Plates } from "./physical";
import type { Group } from "konva/lib/Group";

const startPng = new Image(225,75)
startPng.src = "start.png"

const restaurantPng = new Image(1920,1080)
restaurantPng.src = "restaurant.png"

const tablesPng = new Image(1920,1080)
tablesPng.src = "tables.png"

const characterPng = new Image(200,220)
characterPng.src = "/waiter/stopped/front.png"

const leftPlantPng = new Image(85, 166)
leftPlantPng.src = "leftPlant.png"

const rightPlantPng = new Image(85, 166)
rightPlantPng.src = "rightPlant.png"

const platePng = new Image(138, 112)
platePng.src = "plate.png"

export class MovementAnimation {
  // private interval : NodeJS.Timer | undefined
  private movementAnimationIntervals: Map<string, NodeJS.Timer> = new Map()
  private previousFrame : string = "2"
  private currentFrame : string = "0"
  constructor(private character: HTMLImageElement){}

  play(to: string, holding: boolean){
    this.nextFrame(to, holding)
    this.movementAnimationIntervals.set(to, setInterval(() => this.nextFrame(to, holding), 200))
  }

  nextFrame(to: string, holding: boolean){
    let frameType: string
    if(holding){
      frameType = "moving-plate"
    } else {
      frameType = "moving"
    }
    if(this.currentFrame === "0"){
      if(this.previousFrame === "1"){
        this.previousFrame = "0"
        this.currentFrame = "2"
        this.character.src = `/waiter/${frameType}/${to}/2.png`
        return
      } 
      if(this.previousFrame === "2"){
        this.previousFrame = "0"
        this.currentFrame = "1"
        this.character.src = `/waiter/${frameType}/${to}/1.png`
        return
      }
    }
    if(this.currentFrame === "2"){
      this.previousFrame = "2"
      this.currentFrame = "0"
      this.character.src = `/waiter/${frameType}/${to}/0.png`
      return
    }
    if(this.currentFrame === "1"){
      this.previousFrame = "1"
      this.currentFrame = "0"
      this.character.src = `/waiter/${frameType}/${to}/0.png`
      return
    }
  }

  stop(direction: string){
    const interval = this.movementAnimationIntervals.get(direction)
    clearInterval(interval)
    this.movementAnimationIntervals.delete(direction)
  }
}

export class Graphics {

  private stage : Stage = new Konva.Stage({
    container: "konva",
    width: 1920,
    height:1080
  })

  private layer: Layer = new Konva.Layer()

  private furnitures: Group = new Konva.Group()

  private restaurant: KonvaImage = new Konva.Image({
    x:0,
    y:0,
    image: restaurantPng,
    widht: 1920,
    height: 1080
  })

  private tables: KonvaImage = new Konva.Image({
    x:0,
    y:0,
    image: tablesPng,
    widht: 1920,
    height: 1080
  })

  public start: KonvaImage = new Konva.Image({
    x:488,
    y:363,
    image: startPng,
    widht: 225,
    height: 75
  })

  private character: KonvaImage = new Konva.Image({
    x:1170,
    y:50,
    image: characterPng,
    widht: 200,
    height: 220
  })

  private leftPlant: KonvaImage = new Konva.Image({
    x:0,
    y:915,
    image: leftPlantPng,
    widht: 85,
    height: 166
  })

  private rightPlant: KonvaImage = new Konva.Image({
    x:1835,
    y:920,
    image: rightPlantPng,
    widht: 85,
    height: 166
  })

  private plates: KonvaImage[] = []

  private interval: NodeJS.Timer | undefined

  private movementAnimation = new MovementAnimation(characterPng)

  constructor(private physics: Physics){}

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
      console.log(konvaImage)
    }
  }

  setFurnitures(){
    this.furnitures.add(this.tables)
    this.furnitures.add(this.leftPlant)
    this.furnitures.add(this.rightPlant)
  }

  renderMainMenu(){
    this.clear()
    this.layer.add(this.start)
    this.layer.draw()
  }

  renderRestaurant(){
    this.clear()
    this.setPlates()
    this.layer.add(this.restaurant)
    this.layer.add(this.plates[1])
    this.layer.add(this.character)
    this.setFurnitures()
    this.layer.add(this.furnitures)
    this.renderCharacterMovement()
    this.layer.draw()
  }

  renderCharacterMovement(){
    this.interval = setInterval(() => this.moveCharacter(), 16)
  }
  
  renderMovementAnimation(to: string){
    this.movementAnimation.play(to, this.physics.character!.holding)
  }

  stopAnimation(direction: string){
    this.movementAnimation.stop(direction)
  }

  moveCharacter(){
    if(!this.physics.character) return
    this.autoSetCharacterIndex()
    this.character.setAttrs(this.physics.character.position)
  }

  autoSetCharacterIndex(){
    if(!this.physics.character) return
    const characterBelowTable = ((this.physics.character.position.y < 530 && this.physics.character.position.y > 300) || (this.physics.character.position.y < 1000 && this.physics.character.position.y > 670) && (this.physics.character.position.x > 60 && this.physics.character.position.x < 1650))
    if(characterBelowTable){
      this.character.setZIndex(3)
    } else {
      this.character.setZIndex(2)
    }
  }

  renderPlate(index: number){
    this.layer.add(this.plates[index])
    this.plates[index].setZIndex(1)
  }

  hidePlate(index: number){
    this.plates[index].hide()
  }

  showPlateOnTable(index: number, table: Position){
    this.plates[index].setAttrs(table)
    this.plates[index].setZIndex(3 + index)
    this.plates[index].show()
  }

  clear(){
    this.layer.removeChildren()
    this.stage.destroyChildren()
    this.plates = []
    clearInterval(this.interval)
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }
}
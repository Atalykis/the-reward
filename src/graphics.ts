import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import type { Layer } from "konva/lib/Layer"
import type { Image as KonvaImage } from 'konva/lib/shapes/Image'
import type { Physics } from "./physics";

const startPng = new Image(225,75)
startPng.src = "start.png"

const restaurantPng = new Image(1200,800)
restaurantPng.src = "restaurant.png"

const characterPng = new Image(45,60)
characterPng.src = "sus.png"

export class Graphics {

  private stage : Stage = new Konva.Stage({
    container: "konva",
    width: 1200,
    height:868
  })

  private layer: Layer = new Konva.Layer()

  private restaurant: KonvaImage =  new Konva.Image({
    x:0,
    y:0,
    image: restaurantPng,
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

  private characterImg: KonvaImage = new Konva.Image({
    x:726,
    y:82,
    image: characterPng,
    widht: 45,
    height: 60
  })

  private interval: NodeJS.Timer | undefined

  constructor(private physics: Physics){}

  renderMainMenu(){
    this.clear()
    this.layer.add(this.start)
    this.layer.draw()
  }

  renderRestaurant(){
    this.clear()
    this.layer.add(this.restaurant)
    this.layer.add(this.characterImg)
    this.renderCharacterMovement()
    this.layer.draw()
  }

  renderCharacterMovement(){
    this.interval = setInterval(() => this.moveCharacter(), 16)
  }

  moveCharacter(){
    if(!this.physics.character) return
    this.characterImg.setAttrs(this.physics.character.position)
  }

  clear(){
    this.layer.removeChildren()
    this.stage.destroyChildren()
    clearInterval(this.interval)
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }
}
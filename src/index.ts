// import { Audio } from './audio'
import { MenuEvents, RunEvents } from './event'
import { Graphics } from './graphics'
import { MainMenu } from './main-menu'
import { Physics } from './physics'
import { Run } from './run'

export class Game {

  private mainMenu: MainMenu
  public run: Run

  private menuEvents: MenuEvents
  private runEvents: RunEvents

  constructor(public graphics: Graphics, private physics: Physics){
    this.mainMenu = new MainMenu(graphics)
    this.run = new Run(this.graphics, this.physics)
    this.menuEvents = new MenuEvents(this.graphics, this.switchMode.bind(this))
    this.runEvents = new RunEvents(this.run)
    this.switchMode("Menu")
  }

  menuMode(){
    this.mainMenu.render()
    this.menuEvents.mount()
  }

  runMode(){
    this.menuEvents.unmount()
    this.run.startRun()
    this.runEvents.mount()
  }

  switchMode(mode: string){
    switch(mode){
      case "Menu": this.menuMode(); break;
      case "Run":  this.runMode(); break;
    }
  }
}

const physics = new Physics()
const graphics = new Graphics(physics)
const game = new Game(graphics, physics) 
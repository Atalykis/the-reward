import type { Graphics } from "./graphics"
import type { Run } from "./run"

export class RunEvents {
  private lastKeyDown : string = ""
  constructor(private run: Run){}

  mountKeyboard(){
    window.addEventListener("keydown",this.arrowDownEvent)
    window.addEventListener("keyup", this.arrowUpEvent)
  }
  
  mountGamepad(){
    window.addEventListener("gamepadconnected", this.gamepadEvents)
  }

  gamepadEvents = () => {
    setInterval(() => this.checkAxes(), 16)
  }

  checkAxes(){
    const gamepad = navigator.getGamepads()[0]
    if(!gamepad) return
    const axes : number[] = [gamepad.axes[6], gamepad.axes[7]]
    switch(axes[0]){
      case 0 : 
        this.run.stopCharacterMovement("Left")
        this.run.stopCharacterMovement("Right")
        break;
      case -1: this.run.moveCharacterLeft(); break;
      case 1: this.run.moveCharacterRight(); break;
    }
    switch(axes[1]){
      case 0 : 
        this.run.stopCharacterMovement("Up")
        this.run.stopCharacterMovement("Down")
        break;
      case -1: this.run.moveCharacterUp(); break;
      case 1: this.run.moveCharacterDown(); break;
    }
  }

  arrowDownEvent = (event: KeyboardEvent) => {
    event.preventDefault()
    if(this.lastKeyDown === event.key) return
    switch (event.key){
      case "ArrowRight": this.run.moveCharacterRight(); break;
      case "ArrowLeft": this.run.moveCharacterLeft(); break;
      case "ArrowUp": this.run.moveCharacterUp(); break;
      case "ArrowDown": this.run.moveCharacterDown(); break;
    }
    this.lastKeyDown = event.key
  }

  arrowUpEvent = (event: KeyboardEvent) => {
    event.preventDefault()
    switch (event.key){
      case "ArrowRight": this.run.stopCharacterMovement("Right"); break;
      case "ArrowLeft": this.run.stopCharacterMovement("Left"); break;
      case "ArrowUp": this.run.stopCharacterMovement("Up"); break;
      case "ArrowDown": this.run.stopCharacterMovement("Down"); break;
    }
    this.lastKeyDown = ""
  }

  unmount(){
    window.removeEventListener("keydown",this.arrowDownEvent)
    window.removeEventListener("keyup", this.arrowUpEvent)
  }
}

export class MenuEvents {
  constructor(private graphics: Graphics, private onClick: (mode: string) => void){}

  mount() {
    this.graphics.start.addEventListener("click", this.onClickEvent)
  }

  onClickEvent = (e: Event) => {
    e.preventDefault()
    this.onClick("Run")
  }

  unmount(){
    this.graphics.start.removeEventListener('click')
  }
}
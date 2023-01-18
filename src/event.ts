import type { Graphics } from "./graphics"
import type { Run } from "./run"

export class RunEvents {
  private lastKeyDown : string = ""
  private previousInput: number[] = []
  constructor(private run: Run){}

  mountKeyboard(){
    window.addEventListener("keydown",this.keyDownEvent)
    window.addEventListener("keyup", this.keyUpEvent)
  }
  
  mountGamepad(){
    window.addEventListener("gamepadconnected", this.gamepadEvents)
  }

  gamepadEvents = () => {
    setInterval(() => this.checkAxes(), 16)
  }

  checkAxes() {
    const gamepad = navigator.getGamepads()[1]
    if(!gamepad) return
    const axes : number[] = [gamepad.axes[0], gamepad.axes[1]]
    console.log(axes, this.previousInput)
    if(axes === this.previousInput) return
    switch(axes[0]){
      case 0 : 
        this.run.stopCharacterMovement("right")
        this.run.stopCharacterMovement("left")
        break;
      case -1: this.run.moveCharacterLeft(); break;
      case 1: this.run.moveCharacterRight(); break;
    }
    switch(axes[1]){
      case 0 : 
        this.run.stopCharacterMovement("up")
        this.run.stopCharacterMovement("down")
        break;
      case -1: this.run.moveCharacterUp(); break;
      case 1: this.run.moveCharacterDown(); break;
    }
    this.previousInput = axes
  }

  keyDownEvent = (event: KeyboardEvent) => {
    event.preventDefault()
    if(this.lastKeyDown === event.key) return
    if(this.lastKeyDown !== "") return
    switch (event.key){
      case "ArrowRight": this.run.moveCharacterRight(); break;
      case "ArrowLeft": this.run.moveCharacterLeft(); break;
      case "ArrowUp": this.run.moveCharacterUp(); break;
      case "ArrowDown": this.run.moveCharacterDown(); break;
    }
    this.lastKeyDown = event.key
  }

  keyUpEvent = (event: KeyboardEvent) => {
    event.preventDefault()
    switch (event.key){
      case "ArrowRight": this.run.stopCharacterMovement("right"); break;
      case "ArrowLeft": this.run.stopCharacterMovement("left "); break;
      case "ArrowUp": this.run.stopCharacterMovement("up"); break;
      case "ArrowDown": this.run.stopCharacterMovement("down"); break;
      case " ": this.run.playPlateInteraction(); break;
    }
    this.lastKeyDown = ""
  }

  unmount(){
    window.removeEventListener("keydown",this.keyDownEvent)
    window.removeEventListener("keyup", this.keyUpEvent)
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
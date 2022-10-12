import type { Graphics } from "./graphics";

export class MainMenu {

  constructor(private graphics: Graphics){}

  render(){
    this.graphics.renderMainMenu()
  }
}
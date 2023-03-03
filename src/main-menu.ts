import type { Graphics } from './graphics/graphics';

export class MainMenu {
  constructor(private graphics: Graphics) {}

  render() {
    this.graphics.renderMainMenu();
  }
}

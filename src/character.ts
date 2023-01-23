import type { Position, Size } from './physics';

export class Character {
  public position: Position = {
    x: 1170,
    y: 50,
  };
  public size: Size = {
    width: 100,
    height: 200,
  };
  public speed: number = 3;

  public holding: boolean = false;

  constructor() {}

  move(to: Position) {
    this.position = to;
  }

  getCenter(): Position {
    return {
      x: this.position.x + this.size.width,
      y: this.position.y + this.size.height / 2,
    };
  }

  resetPosition() {
    this.position = {
      x: 1170,
      y: 50,
    };
  }

  reverseHolding() {
    this.holding = !this.holding;
  }
}

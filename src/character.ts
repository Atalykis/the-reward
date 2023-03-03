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
  public speed: number = 0;

  public baseSpeed: number = 6;

  public angle: number = 0;

  public holding: boolean = false;

  constructor() {}

  move() {
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y -= Math.sin(this.angle) * this.speed;
  }

  turn(angle: number, intensity: number) {
    if (intensity > 0) {
      this.angle = angle;
    }
    this.speed = this.baseSpeed * intensity;
  }

  getCenter(): Position {
    return {
      x: this.position.x + this.size.width,
      y: this.position.y + this.size.height / 2,
    };
  }

  getNextPosition(): Position {
    return {
      x: this.position.x + Math.cos(this.angle) * this.speed,
      y: this.position.y - Math.sin(this.angle) * this.speed,
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

import type { Position, Size } from '../physics';

export type Holding = false | HeldObject;

export type HeldObject = 'plate' | 'glass';

export class Character {
  public position: Position = {
    x: 1000,
    y: 500,
  };
  public size: Size = {
    width: 100,
    height: 200,
  };
  public speed: number = 0;

  public baseSpeed: number = 8;

  public angle: number = 0;

  public holding: Holding = false;

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
      x: 925,
      y: 540,
    };
  }

  hold(object: HeldObject) {
    this.holding = object;
  }

  emptyHand() {
    this.holding = false;
  }
}

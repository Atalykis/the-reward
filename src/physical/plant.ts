import type { Position, Size } from '../physics';
import type { Physical } from './physical';

export class Plant implements Physical {
  constructor(public position: Position, public size: Size) {}

  getCenter(): Position {
    return {
      x: this.position.x + this.size.width / 2,
      y: this.position.y + this.size.height / 2,
    };
  }
}

const plant1 = new Plant({ x: 0, y: 1000 }, { width: 20, height: 60 });

const plant2 = new Plant({ x: 1820, y: 10 }, { width: 50, height: 10 });

const plant3 = new Plant({ x: 1820, y: 1000 }, { width: 50, height: 60 });

const plant4 = new Plant({ x: 0, y: 30 }, { width: 30, height: 20 });

export const Plants = [plant1, plant2, plant3, plant4];

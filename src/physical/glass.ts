import { Position, Size } from '../physics';
import { Physical } from './physical';

export class Glass implements Physical {
  public image = new Image(23, 38);
  constructor(
    public position: Position,
    public size: Size,
    public destination: Position,
    src: string,
  ) {
    this.image.src = src;
  }

  getCenter(): Position {
    return {
      x: this.position.x + this.size.width / 2,
      y: this.position.y + this.size.height / 2,
    };
  }
}

const glass1 = new Glass(
  { x: 497, y: 180 },
  { width: 23, height: 38 },
  { x: 560, y: 505 },
  '/assets/glasses/glass.png',
);

const glass2 = new Glass(
  { x: 497, y: 180 },
  { width: 23, height: 38 },
  { x: 595, y: 505 },
  '/assets/glasses/glass.png',
);

export const Glasses = [glass1, glass2];

import type { Position, Size } from '../physics';
import type { Physical } from './physical';

export class Plate implements Physical {
  public image = new Image(92, 74);
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

export class PlateBuilder {
  private position: Position = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };
  private destination: Position = { x: 0, y: 0 };
  private src: string = '';

  constructor() {}

  deliverTo(destination: Position) {
    this.destination = destination;
    return this;
  }

  at(position: Position) {
    this.position = position;
    return this;
  }

  sized(size: Size) {
    this.size = size;
    return this;
  }

  withSrc(src: string) {
    this.src = src;
    return this;
  }

  build() {
    return new Plate(this.position, this.size, this.destination, this.src);
  }
}

const plate1 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 0, y: 0 },
  '/assets/plates/plate.png',
);

const plate2 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 500, y: 500 },
  '/assets/plates/lasagnas.png',
);

const plate3 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 590, y: 500 },
  '/assets/plates/lasagnas.png',
);

const plate4 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 1375, y: 790 },
  '/assets/plates/lasagnas.png',
);

const plate5 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 1465, y: 790 },
  '/assets/plates/lasagnas.png',
);

const plate6 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 1465, y: 850 },
  '/assets/plates/lasagnas.png',
);

const plate7 = new Plate(
  { x: 1150, y: 40 },
  { width: 92, height: 74 },
  { x: 1375, y: 850 },
  '/assets/plates/lasagnas.png',
);
export const Plates = [plate1, plate2, plate3, plate4, plate5, plate6, plate7];

import type { Position, Size } from '../physics';
import type { Physical } from './physical';

export class Plate implements Physical {
  public image = new Image(60, 54);
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

const plate0 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 0, y: 0 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .build();

const plate1 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 430, y: 785 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .build();

const plate2 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 330, y: 785 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .build();

const plate3 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 330, y: 850 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .build();

const plate4 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 430, y: 850 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .build();

export const Plates = [plate0, plate1, plate2, plate3, plate4];

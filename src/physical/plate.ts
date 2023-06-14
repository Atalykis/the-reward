import type { Position, Size } from '../physics';
import type { Physical } from './physical';

export class Plate implements Physical {
  public image = new Image(60, 54);
  constructor(
    public position: Position,
    public size: Size,
    public destination: Position,
    public dish: string,
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

  showDish(): void {
    this.image.src = `/assets/plates/${this.dish}.png`;
  }
}

export class PlateBuilder {
  private position: Position = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };
  private destination: Position = { x: 0, y: 0 };

  private dish: string = '';
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

  filledWith(dish: string) {
    this.dish = dish;
    return this;
  }

  build() {
    return new Plate(
      this.position,
      this.size,
      this.destination,
      this.dish,
      this.src,
    );
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
  .deliverTo({ x: 430, y: 800 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .filledWith('omelette')
  .build();

const plate2 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 330, y: 800 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .filledWith('bouchee')
  .build();

const plate3 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 330, y: 850 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .filledWith('poisson')
  .build();

const plate4 = new PlateBuilder()
  .at({ x: 1165, y: 40 })
  .deliverTo({ x: 430, y: 850 })
  .sized({ width: 60, height: 54 })
  .withSrc('/assets/plates/plate.png')
  .filledWith('poulet')
  .build();

export const Plates = [plate0, plate1, plate2, plate3, plate4];

import type { Position, Size } from '../physics';
import type { Physical } from './physical';

export class Table implements Physical {
  constructor(
    public position: Position,
    public size: Size,
    public name: string,
  ) {}

  getCenter(): Position {
    return {
      x: this.position.x + this.size.width / 2,
      y: this.position.y + this.size.height / 2,
    };
  }
}

export class TableBuilder {
  private position: Position = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };
  private name: string = '';

  constructor() {}

  named(name: string) {
    this.name = name;
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

  build() {
    return new Table(this.position, this.size, this.name);
  }
}

const table1 = new TableBuilder()
  .named('table1')
  .at({ x: 350, y: 450 })
  .sized({ width: 380, height: 30 })
  .build();

const table2 = new TableBuilder()
  .named('table2')
  .at({ x: 1350, y: 450 })
  .sized({ width: 380, height: 30 })
  .build();

const table3 = new TableBuilder()
  .named('table3')
  .at({ x: 160, y: 800 })
  .sized({ width: 400, height: 30 })
  .build();

const table4 = new TableBuilder()
  .named('table4')
  .at({ x: 1220, y: 820 })
  .sized({ width: 400, height: 10 })
  .build();

const bar = new TableBuilder()
  .named('bar')
  .at({ x: 150, y: 100 })
  .sized({ width: 600, height: 40 })
  .build();

export const Tables = [table1, table2, table3, table4, bar];

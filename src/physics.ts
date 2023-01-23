import type { Character } from './character';
import { Physical, Plants, Tables } from './physical';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export class Physics {
  private readonly stageSize: Size = {
    width: 1920,
    height: 1080,
  };
  private tables = Tables;
  private plants = Plants;
  private physicals: Physical[] = [...this.tables, ...this.plants];
  public character: Character | undefined;
  constructor() {}

  getDistancesXY(pos1: Position, pos2: Position) {
    return { distanceX: pos1.x - pos2.x, distanceY: pos1.y - pos2.y };
  }

  getDistance(pos1: Position, pos2: Position) {
    const { distanceX, distanceY } = this.getDistancesXY(pos1, pos2);
    return Math.sqrt(
      Math.pow(Math.abs(distanceX), 2) + Math.pow(Math.abs(distanceY), 2),
    );
  }

  getMinimalDistance(physical: Physical, character: Character) {
    const distY = physical.size.height / 2 + character.size.height / 2;
    const distX = physical.size.width / 2 + character.size.width / 2;
    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  }

  characterDistanceWithTables() {
    if (!this.character) return [];
    const associatedDistances = [];
    for (const table of this.tables) {
      const distance = this.getDistance(
        this.character.getCenter(),
        table.getCenter(),
      );
      const minimalDistance = this.getMinimalDistance(table, this.character);
      associatedDistances.push({
        table: table.name,
        distance: distance,
        minimalDistance: minimalDistance,
      });
    }
    return associatedDistances;
  }

  characterIsCloseOfTheBar() {
    const bar = this.tables.find((table) => table.name === 'bar');
    if (!bar) return;
    if (!this.character) return;
    const distance = this.getDistance(
      this.character.getCenter(),
      bar.getCenter(),
    );
    if (distance < 240) {
      return true;
    } else {
      return false;
    }
  }

  canMove(to: Position) {
    if (!this.character) return;
    const nextCenter = {
      x: to.x + this.character.size.width / 2,
      y: to.y + this.character.size.height / 2,
    };
    for (const object of this.physicals) {
      const objectCenter = object.getCenter();
      const { distanceX, distanceY } = this.getDistancesXY(
        nextCenter,
        objectCenter,
      );
      if (
        Math.abs(distanceX) <
          (object.size.width + this.character.size.width) / 2 &&
        Math.abs(distanceY) <
          (object.size.height + this.character.size.height) / 3
      )
        return false;
    }
    return true;
  }

  moveRight() {
    if (!this.character) return;
    const next = {
      x: this.character.position.x + this.character.speed,
      y: this.character.position.y,
    };
    if (next.x + this.character.size.width + 50 > this.stageSize.width) return;
    if (!this.canMove(next)) return;
    this.character.move(next);
  }

  moveLeft() {
    if (!this.character) return;
    const next = {
      x: this.character.position.x - this.character.speed,
      y: this.character.position.y,
    };
    if (next.x < -50) return;
    if (!this.canMove(next)) return;
    this.character.move(next);
  }

  moveDown() {
    if (!this.character) return;
    const next = {
      x: this.character.position.x,
      y: this.character.position.y + this.character.speed,
    };
    if (next.y + this.character.size.height > this.stageSize.height) return;
    if (!this.canMove(next)) return;
    this.character.move(next);
  }

  moveUp() {
    if (!this.character) return;
    const next = {
      x: this.character.position.x,
      y: this.character.position.y - this.character.speed,
    };
    if (next.y < -10) return;
    if (!this.canMove(next)) return;
    this.character.move(next);
  }

  resetCharacterPosition() {
    if (!this.character) return;
    this.character.resetPosition();
    this.character.holding = false;
  }

  setCharacter(character: Character) {
    this.character = character;
  }
}

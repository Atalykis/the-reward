import type { Character } from './character';
import type { Movement } from './inputs-provider';
import type { Physical } from './physical/physical';
import { Plants } from './physical/plant';
import { Tables } from './physical/table';

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
    const isCharacterInsideOfStage =
      to.x < this.stageSize.width - this.character.size.width &&
      to.x > 0 &&
      to.y < this.stageSize.height - this.character.size.height &&
      to.y > 0;

    if (!isCharacterInsideOfStage) return false;

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

  tick(movement: Movement) {
    if (!this.character) return;
    this.character.turn(movement.angle, movement.intensity);
    const next = this.character.getNextPosition();
    if (this.canMove(next)) this.character.move();
  }

  resetCharacterPosition() {
    if (!this.character) return;
    this.character.resetPosition();
    this.character.holding = false;
  }

  setCharacter(character: Character) {
    this.character = character;
  }

  isCharacterAboveTopTables() {
    if (!this.character) return false;
    if (this.character.position.y < 288) return true;
    return false;
  }

  isCharacterBellowBottomTables() {
    if (!this.character) return false;
    if (this.character.position.y > 790) return true;
    return false;
  }

  isCharacterOnBrokenPlate() {
    const distance = this.getDistance(this.character!.position, {
      x: 1400,
      y: 700,
    });

    if (distance > 130 && distance < 200) return true;
    return false;
  }
}

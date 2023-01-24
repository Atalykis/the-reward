import type { Character } from './character';
import type { Graphics } from './graphics';
import { Plate, Plates } from './physical';
import type { Physics } from './physics';

export class PlateInteractions {
  private plates: Plate[] = Plates;
  private serving: number = 1;
  constructor(
    private graphics: Graphics,
    private physics: Physics,
    private character: Character,
  ) {}

  play(): void {
    if (this.character.holding) {
      this.servePlate(this.serving);
    } else {
      this.holdPlate(this.serving);
    }
  }

  holdPlate(index: number) {
    if (!this.plates[index]) return;
    const { distanceX, distanceY } = this.physics.getDistancesXY(
      this.character.getCenter(),
      this.plates[index].getCenter(),
    );
    if (distanceX > 30 || distanceX < -30) return;
    if (distanceY > 35) return;
    this.graphics.hidePlate(index);
    this.character.reverseHolding();
  }

  servePlate(index: number) {
    if (!this.plates[index]) return;
    const { distanceX, distanceY } = this.physics.getDistancesXY(
      this.character.getCenter(),
      this.plates[index].destination,
    );
    if (distanceX > 100 || distanceX < 0) return;
    if (distanceY < -100 || distanceY > 50) return;

    this.graphics.showPlateOnTable(index, this.plates[index].destination);
    this.character.reverseHolding();
    this.newPlate();
  }

  newPlate() {
    this.serving += 1;
    if (this.serving >= this.plates.length) {
      this.graphics.renderPlate(0);
      return;
    }
    this.graphics.renderPlate(this.serving);
  }

  reset() {
    this.serving = 1;
  }
}

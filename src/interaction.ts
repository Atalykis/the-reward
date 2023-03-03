import type { Character } from './character';
import type { Graphics } from './graphics/graphics';
import { Plate, Plates } from './physical/plate';
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

export class CleaningInteraction {
  private interactable: boolean = false;
  private timeout: NodeJS.Timeout | undefined;
  constructor(
    private graphics: Graphics,
    private physics: Physics,
    private character: Character,
  ) {}

  brokenPlateAppearance() {
    this.graphics.renderBrokenPlate();
    this.interactable = true;
  }

  brokenPlateCleaned() {
    this.graphics.hideBrokenPlate();
    this.interactable = false;
  }

  play() {
    if (this.character.holding) return;
    if (!this.interactable) return;
    if (this.physics.isCharacterOnBrokenPlate()) {
      this.graphics.renderCleaningAnimation();
      if (!this.timeout) {
        this.timeout = setTimeout(() => this.brokenPlateCleaned(), 5000);
      }
    }
  }

  cancel() {
    this.graphics.stopCleaningAnimation();
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}

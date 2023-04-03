import { Physics } from '../physics';
import { Character } from '../physical/character';
import { Graphics } from '../graphics/graphics';
import { Glass, Glasses } from '../physical/glass';

export class GlassInteractions {
  private glasses: Glass[] = Glasses;
  private serving: number = 0;

  public served = 0;
  constructor(
    private graphics: Graphics,
    private physics: Physics,
    private character: Character,
  ) {}

  play(): void {
    if (this.character.holding) {
      this.serveGlass(this.serving);
    } else {
      this.holdGlass(this.serving);
    }
  }

  holdGlass(index: number) {
    if (!this.glasses[index]) return;
    const { distanceX, distanceY } = this.physics.getDistancesXY(
      this.character.getCenter(),
      this.glasses[index].getCenter(),
    );
    if (distanceX > 30 || distanceX < -30) return;
    if (distanceY > 35) return;
    this.graphics.hideGlass(index);
    this.character.reverseHolding();
  }

  serveGlass(index: number) {
    if (!this.glasses[index]) return;
    const { distanceX, distanceY } = this.physics.getDistancesXY(
      this.character.getCenter(),
      this.glasses[index].destination,
    );
    if (distanceX > 100 || distanceX < 0) return;
    if (distanceY < -100 || distanceY > 60) return;

    this.graphics.showGlassOnTable(index, this.glasses[index].destination);
    this.served++;
    this.character.reverseHolding();
    this.newGlass();
  }

  newGlass() {
    this.serving += 1;
    if (this.serving >= this.glasses.length) {
      return;
    }
    this.graphics.renderGlass(this.serving);
  }

  reset() {
    this.serving = 0;
    this.served = 0;
  }
}

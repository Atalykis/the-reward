import { Character } from '../physical/character';
import { Graphics } from '../graphics/graphics';
import { Physics } from '../physics';

export class CleaningInteraction {
  private interactable: number = 0;
  private timeout: NodeJS.Timeout | undefined;

  public cleaned = 0;
  constructor(
    private graphics: Graphics,
    private physics: Physics,
    private character: Character,
  ) {}

  brokenPlateAppearance() {
    this.graphics.renderBrokenPlate();
    this.interactable++;
  }

  brokenGlassAppearance() {
    this.graphics.renderBrokenGlass();
    this.interactable++;
  }

  brokenPlateCleaned() {
    this.graphics.hideBrokenPlate();
    this.cleaned++;
    this.interactable--;
  }

  brokenGlassCleaned() {
    this.graphics.hideBrokenGlass();
    this.cleaned++;
    this.interactable--;
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
    if (this.physics.isCharacterOnBrokenGlass()) {
      this.graphics.renderCleaningAnimation();
      if (!this.timeout) {
        this.timeout = setTimeout(() => this.brokenGlassCleaned(), 5000);
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

  reset() {
    this.cleaned = 0;
    this.interactable = 0;
  }
}

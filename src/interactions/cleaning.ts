import { Character } from '../physical/character';
import { Graphics } from '../graphics/graphics';
import { Physics } from '../physics';

export class CleaningInteraction {
  private interactable: boolean = false;
  private timeout: NodeJS.Timeout | undefined;

  public cleaned = false;
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
    this.cleaned = true;
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

  reset() {
    this.cleaned = false;
  }
}

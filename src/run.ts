import { AudioMixer } from './audio/audio-mixer';
import { Character } from './character';
import type { GamepadAnalogicInputs } from './inputs-provider';
import type { Graphics } from './graphics/graphics';
import { CleaningInteraction, PlateInteractions } from './interaction';
import type { Physics } from './physics';

export class Run {
  private plateInteraction: PlateInteractions;
  private cleaningInteraction: CleaningInteraction;
  private interval: NodeJS.Timer | undefined;
  private character: Character = new Character();
  private audioMixer: AudioMixer;
  constructor(private graphics: Graphics, private physics: Physics) {
    this.audioMixer = new AudioMixer(this.physics);
    this.physics.setCharacter(this.character);
    this.plateInteraction = new PlateInteractions(
      this.graphics,
      this.physics,
      this.character,
    );
    this.cleaningInteraction = new CleaningInteraction(
      this.graphics,
      this.physics,
      this.character,
    );
  }

  startRun() {
    if (!this.interval) this.interval = setInterval(() => this.loop(), 75000);
    this.loop();
  }

  loop() {
    this.audioMixer = new AudioMixer(this.physics);
    this.graphics.renderRestaurant();
    this.plateInteraction.reset();
    this.physics.resetCharacterPosition();
    setTimeout(() => this.initAudio(), 3000);
    setTimeout(() => this.cleaningInteraction.brokenPlateAppearance(), 6000);
    setTimeout(() => this.gameOver(), 63000);
  }

  gameOver() {
    this.audioMixer.stopAllAmbiant();
    this.graphics.renderGameOver();
    this.audioMixer.playGameOverSound('high');
  }

  initAudio() {
    this.audioMixer.manageTablesSounds();
    this.audioMixer.playAmbiance();
  }

  clearLoop() {
    clearInterval(this.interval);
  }

  tick(inputs: GamepadAnalogicInputs) {
    this.physics.tick(inputs.movement);
    if (inputs.action.triggered) {
      this.playInteractions();
    } else {
      this.cancelCleaningInteraction();
    }
    if (inputs.movement.intensity > 0) {
      this.cancelCleaningInteraction();
      const direction = this.translateAngleToDirection(inputs.movement.angle);
      this.graphics.renderMovementAnimation(direction);
    } else {
      this.graphics.stopMovementAnimation();
    }
    this.audioMixer.manageTablesSounds();
    this.audioMixer.manageBossSentence();
  }

  translateAngleToDirection(angle: number) {
    let direction = '';
    switch (angle) {
      case 0:
        direction = 'right';
        break;
      case Math.PI / 4:
        direction = 'right';
        break;
      case Math.PI / 2:
        direction = 'up';
        break;
      case (3 * Math.PI) / 4:
        direction = 'left';
        break;
      case Math.PI:
        direction = 'left';
        break;
      case (5 * Math.PI) / 4:
        direction = 'left';
        break;
      case (3 * Math.PI) / 2:
        direction = 'down';
        break;
      case (7 * Math.PI) / 4:
        direction = 'right';
        break;
    }
    return direction;
  }
  playInteractions() {
    this.plateInteraction.play();
    this.cleaningInteraction.play();
  }

  cancelCleaningInteraction() {
    this.cleaningInteraction.cancel();
  }
}

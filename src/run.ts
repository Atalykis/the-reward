import { AudioMixer } from './audio/audio-mixer';
import { Character } from './physical/character';
import type { GamepadAnalogicInputs } from './inputs-provider';
import type { Graphics } from './graphics/graphics';
import { CleaningInteraction } from './interactions/cleaning';
import { PlateInteractions } from './interactions/plate-serving';
import type { Physics } from './physics';
import { GlassInteractions } from './interactions/glass-serving';

interface PlayerObjective {
  plateServed: number;

  glassServed: number;
  dirtCleaned: number;
}
export class Run {
  private plateInteraction: PlateInteractions;
  private cleaningInteraction: CleaningInteraction;

  private glassInteraction: GlassInteractions;
  private interval: NodeJS.Timer | undefined;
  private character: Character = new Character();

  private playerObjective: PlayerObjective = {
    plateServed: 0,
    glassServed: 0,
    dirtCleaned: 0,
  };
  private audioMixer: AudioMixer;
  constructor(private graphics: Graphics, private physics: Physics) {
    this.audioMixer = new AudioMixer(this.physics);
    this.physics.setCharacter(this.character);
    this.plateInteraction = new PlateInteractions(
      this.graphics,
      this.physics,
      this.character,
    );
    this.glassInteraction = new GlassInteractions(
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
    this.glassInteraction.reset();
    this.cleaningInteraction.reset();
    this.physics.resetCharacterPosition();
    this.playerObjective = {
      plateServed: 0,
      glassServed: 0,
      dirtCleaned: 0,
    };
    this.displayObjective();
    setTimeout(() => this.initAudio(), 2000);
    setTimeout(() => {
      this.cleaningInteraction.brokenPlateAppearance();
      this.audioMixer.playEffect('plate-break');
    }, 15000);
    setTimeout(() => {
      this.cleaningInteraction.brokenGlassAppearance();
      this.audioMixer.playEffect('glass-break');
    }, 45000);
    setTimeout(() => this.gameOver(), 63000);
  }

  gameOver() {
    this.audioMixer.stopAllAmbiant();
    this.graphics.renderGameOver();
    const totalObjectiveDone =
      this.playerObjective.dirtCleaned +
      this.playerObjective.plateServed +
      this.playerObjective.glassServed;
    if (totalObjectiveDone < 3) {
      this.audioMixer.playGameOverSound('high');
      return;
    }
    if (totalObjectiveDone < 5) {
      this.audioMixer.playGameOverSound('medium');
      return;
    }
    this.audioMixer.playGameOverSound('low');
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
    this.playerObjective.plateServed = this.plateInteraction.served;
    this.playerObjective.dirtCleaned = this.cleaningInteraction.cleaned;
    this.playerObjective.glassServed = this.glassInteraction.served;
    this.displayObjective();
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

  displayObjective() {
    const platesServed = document.getElementById('plates');
    const glassesServed = document.getElementById('glasses');
    const plateCleaned = document.getElementById('broken');
    if (platesServed) {
      platesServed.innerHTML = `${this.playerObjective.plateServed}`;
    }
    if (glassesServed) {
      glassesServed.innerHTML = `${this.playerObjective.glassServed}`;
    }
    if (plateCleaned) {
      plateCleaned.innerHTML = `${this.playerObjective.dirtCleaned}`;
    }
  }

  playInteractions() {
    this.plateInteraction.play();
    this.cleaningInteraction.play();
    this.glassInteraction.play();
  }

  cancelCleaningInteraction() {
    this.cleaningInteraction.cancel();
  }
}

import { AudioMixer } from './audio';
import { Character } from './character';
import type { Graphics } from './graphics';
import { CleaningInteraction, PlateInteractions } from './interaction';
import type { Physics, Position } from './physics';

export class Run {
  private plateInteraction: PlateInteractions;
  private cleaningInteraction: CleaningInteraction;
  private interval: NodeJS.Timer | undefined;
  private movementIntervals: Map<string, NodeJS.Timer> = new Map();
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
    this.stopAllCharacterMovement();
    this.plateInteraction.reset();
    this.physics.resetCharacterPosition();
    setTimeout(() => this.initAudio(), 3000);
    setTimeout(() => this.cleaningInteraction.brokenPlateAppearance(), 6000);
    setTimeout(() => this.gameOver(), 65000);
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

  moveCharacterLeft() {
    if (this.movementIntervals.get('left')) return;
    this.movementIntervals.set(
      'left',
      setInterval(() => this.moveLeft(), 32),
    );
    this.graphics.renderMovementAnimation('left');
  }

  moveCharacterRight() {
    if (this.movementIntervals.get('right')) return;
    this.movementIntervals.set(
      'right',
      setInterval(() => this.moveRight(), 32),
    );
    this.graphics.renderMovementAnimation('right');
  }

  moveCharacterUp() {
    if (this.movementIntervals.get('up')) return;
    this.movementIntervals.set(
      'up',
      setInterval(() => this.moveUp(), 32),
    );
    this.graphics.renderMovementAnimation('up');
  }

  moveCharacterDown() {
    if (this.movementIntervals.get('down')) return;
    this.movementIntervals.set(
      'down',
      setInterval(() => this.moveDown(), 32),
    );
    this.graphics.renderMovementAnimation('down');
  }

  moveLeft() {
    this.physics.moveLeft();
    this.audioMixer.manageTablesSounds();
    this.audioMixer.manageBossSentence();
  }

  moveRight() {
    this.physics.moveRight();
    this.audioMixer.manageBossSentence();
    this.audioMixer.manageTablesSounds();
  }

  moveUp() {
    this.physics.moveUp();
    this.audioMixer.manageBossSentence();
    this.audioMixer.manageTablesSounds();
  }

  moveDown() {
    this.physics.moveDown();
    this.audioMixer.manageBossSentence();
    this.audioMixer.manageTablesSounds();
  }

  playInteractions() {
    this.plateInteraction.play();
    this.cleaningInteraction.play();
  }

  cancelCleaningInteraction() {
    this.cleaningInteraction.cancel();
  }

  stopCharacterMovement(direction: string) {
    const interval = this.movementIntervals.get(direction);
    clearInterval(interval);
    this.movementIntervals.delete(direction);
    this.graphics.stopAnimation(direction);
  }

  stopAllCharacterMovement() {
    for (const interval of this.movementIntervals.values()) {
      clearInterval(interval);
    }
  }
}

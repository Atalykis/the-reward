import { Holding } from '../../physical/character';

export class MovementAnimation {
  private movementAnimationIntervals: Map<string, NodeJS.Timer> = new Map();
  private previousFrame: string = '2';
  private currentFrame: string = '0';
  private lastDirection: string = '';
  constructor(private character: HTMLImageElement) {}

  play(to: string, holding: Holding) {
    const interval = this.movementAnimationIntervals.get(to);
    if (interval && this.lastDirection === to) return;
    clearInterval(this.movementAnimationIntervals.get(this.lastDirection));
    this.lastDirection = to;
    this.nextFrame(to, holding);
    this.movementAnimationIntervals.set(
      to,
      setInterval(() => this.nextFrame(to, holding), 200),
    );
  }

  nextFrame(to: string, holding: Holding) {
    let frameType: string;
    if (holding) {
      frameType = `moving-${holding}`;
    } else {
      frameType = 'moving';
    }
    if (this.currentFrame === '0') {
      if (this.previousFrame === '1') {
        this.previousFrame = '0';
        this.currentFrame = '2';
        this.character.src = `/assets/waiter/${frameType}/${to}/2.png`;
        return;
      }
      if (this.previousFrame === '2') {
        this.previousFrame = '0';
        this.currentFrame = '1';
        this.character.src = `/assets/waiter/${frameType}/${to}/1.png`;
        return;
      }
    }
    if (this.currentFrame === '2') {
      this.previousFrame = '2';
      this.currentFrame = '0';
      this.character.src = `/assets/waiter/${frameType}/${to}/0.png`;
      return;
    }
    if (this.currentFrame === '1') {
      this.previousFrame = '1';
      this.currentFrame = '0';
      this.character.src = `/assets/waiter/${frameType}/${to}/0.png`;
      return;
    }
  }

  stop(direction: string) {
    const interval = this.movementAnimationIntervals.get(direction);
    clearInterval(interval);
    this.movementAnimationIntervals.delete(direction);
  }

  stopAll() {
    for (const interval of this.movementAnimationIntervals.values()) {
      clearInterval(interval);
    }
    this.movementAnimationIntervals = new Map();
  }
}

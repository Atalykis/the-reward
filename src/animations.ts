export class MovementAnimation {
  // private movementAnimationInterval: NodeJS.Timer | undefined;
  private movementAnimationIntervals: Map<string, NodeJS.Timer> = new Map();
  private previousFrame: string = '2';
  private currentFrame: string = '0';
  private lastDirection: string = '';
  constructor(private character: HTMLImageElement) {}

  play(to: string, holding: boolean) {
    this.nextFrame(to, holding);
    clearInterval(this.movementAnimationIntervals.get(this.lastDirection));
    this.lastDirection = to;
    this.movementAnimationIntervals.set(
      to,
      setInterval(() => this.nextFrame(to, holding), 200),
    );
  }

  nextFrame(to: string, holding: boolean) {
    let frameType: string;
    if (holding) {
      frameType = 'moving-plate';
    } else {
      frameType = 'moving';
    }
    if (this.currentFrame === '0') {
      if (this.previousFrame === '1') {
        this.previousFrame = '0';
        this.currentFrame = '2';
        this.character.src = `/waiter/${frameType}/${to}/2.png`;
        return;
      }
      if (this.previousFrame === '2') {
        this.previousFrame = '0';
        this.currentFrame = '1';
        this.character.src = `/waiter/${frameType}/${to}/1.png`;
        return;
      }
    }
    if (this.currentFrame === '2') {
      this.previousFrame = '2';
      this.currentFrame = '0';
      this.character.src = `/waiter/${frameType}/${to}/0.png`;
      return;
    }
    if (this.currentFrame === '1') {
      this.previousFrame = '1';
      this.currentFrame = '0';
      this.character.src = `/waiter/${frameType}/${to}/0.png`;
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
  }

  // stop() {
  //   clearInterval(this.movementAnimationInterval);
  // }
}

export class BasicAnimation {
  private animationInterval: NodeJS.Timer | undefined;
  private currentFrame: string = '0';

  constructor(
    private folder: string,
    private png: HTMLImageElement,
    private period: number,
  ) {}

  nextFrame() {
    if (this.currentFrame === '0') {
      this.currentFrame = '1';
      this.png.src = this.folder + '1.png';
    } else {
      this.currentFrame = '0';
      this.png.src = this.folder + '0.png';
    }
  }

  play() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => this.nextFrame(), this.period);
  }

  stop() {
    clearInterval(this.animationInterval);
    this.animationInterval = undefined;
  }
}

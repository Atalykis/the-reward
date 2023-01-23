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

  // stop() {
  //   clearInterval(this.movementAnimationInterval);
  // }
}

export class GameOverAnimation {
  private animationInterval: NodeJS.Timer | undefined;
  private currentFrame: string = '0';

  constructor(private gameOver: HTMLImageElement) {}

  nextFrame() {
    if (this.currentFrame === '0') {
      this.currentFrame = '1';
      this.gameOver.src = '/game-over/1.png';
    } else {
      this.currentFrame = '0';
      this.gameOver.src = '/game-over/0.png';
    }
  }

  play() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => this.nextFrame(), 200);
  }

  stop() {
    clearInterval(this.animationInterval);
    this.animationInterval = undefined;
  }
}

export class MainMenuAnimation {
  private animationInterval: NodeJS.Timer | undefined;
  private currentFrame: string = '0';

  constructor(private mainMenu: HTMLImageElement) {}

  nextFrame() {
    if (this.currentFrame === '0') {
      this.currentFrame = '1';
      this.mainMenu.src = '/main-menu/1.png';
    } else {
      this.currentFrame = '0';
      this.mainMenu.src = '/main-menu/0.png';
    }
  }

  play() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => this.nextFrame(), 300);
  }

  stop() {
    clearInterval(this.animationInterval);
    this.animationInterval = undefined;
  }
}

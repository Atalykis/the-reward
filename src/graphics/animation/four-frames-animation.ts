export class FourFramesAnimation {
  private animationInterval: NodeJS.Timer | undefined;
  private currentFrame: number = 0;

  constructor(
    private folder: string,
    private png: HTMLImageElement,
    private period: number,
  ) {}

  nextFrame() {
    this.currentFrame++;
    if (this.currentFrame === 4) {
      this.currentFrame = 0;
    }

    this.png.src = this.folder + this.currentFrame + '.png';
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

export class TwoFramesAnimation {
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

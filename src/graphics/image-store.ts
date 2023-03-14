export class ImageStore {
  private readonly images: Map<string, HTMLImageElement> = new Map();
  constructor() {}

  loadWaiterAsset() {
    const waiterPng = this.images.get('waiter');
    if (!waiterPng) {
      const png = new Image(200, 220);
      png.src = '/waiter/stopped/front.png';
      this.images.set('waiter', png);
      return png;
    }
    return waiterPng;
  }

  loadBackground() {
    const backgroundPng = this.images.get('background');
    if (!backgroundPng) {
      const png = new Image(1920, 1080);
      png.src = '/restaurant/restaurant.png';
      this.images.set('background', png);
      return png;
    }
    return backgroundPng;
  }
}

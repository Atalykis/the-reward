import Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { Layer } from 'konva/lib/Layer';
import type { Image as KonvaImage } from 'konva/lib/shapes/Image';
import type { Physics, Position } from '../physics';
import { BasicAnimation, MovementAnimation } from '../animations';
import { Plates } from '../physical/plate';

const mainMenuPng = new Image(1920, 1080);
mainMenuPng.src = 'main-menu/0.png';

const gameOverPng = new Image(1920, 1080);
gameOverPng.src = 'game-over/0.png';

const restaurantPng = new Image(1920, 1080);
restaurantPng.src = 'restaurant/restaurant.png';

const topTablesPng = new Image(1920, 1080);
topTablesPng.src = 'restaurant/top-tables.png';

const bottomTablesPng = new Image(1920, 1080);
bottomTablesPng.src = 'restaurant/bottom-tables.png';

const characterPng = new Image(200, 220);
characterPng.src = '/waiter/stopped/front.png';

const leftPlantPng = new Image(85, 166);
leftPlantPng.src = 'restaurant/leftPlant.png';

const rightPlantPng = new Image(85, 166);
rightPlantPng.src = 'restaurant/rightPlant.png';

const brokenPlatePng = new Image(126, 107);
brokenPlatePng.src = 'plates/broken-plate.png';

export class Graphics {
  private stage: Stage = new Konva.Stage({
    container: 'konva',
    width: 1920,
    height: 1080,
  });

  private mainMenuLayer: Layer = new Konva.Layer();

  private backgroundLayer: Layer = new Konva.Layer();

  private characterLayer: Layer = new Konva.Layer();

  private topTablesLayer: Layer = new Konva.Layer();

  private bottomTablesLayer: Layer = new Konva.Layer();

  private bottomPlantsLayer: Layer = new Konva.Layer();

  private gameOverLayer: Layer = new Konva.Layer();

  private restaurant: KonvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: restaurantPng,
    widht: 1920,
    height: 1080,
  });

  private topTables: KonvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: topTablesPng,
    widht: 1920,
    height: 1080,
  });

  private bottomTables: KonvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: bottomTablesPng,
    widht: 1920,
    height: 1080,
  });

  public mainMenu: KonvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: mainMenuPng,
    widht: 1920,
    height: 1080,
  });

  public gameOver: KonvaImage = new Konva.Image({
    x: 0,
    y: 0,
    image: gameOverPng,
    width: 1920,
    height: 1080,
  });

  private character: KonvaImage = new Konva.Image({
    x: 1170,
    y: 50,
    image: characterPng,
    widht: 200,
    height: 220,
  });

  private leftPlant: KonvaImage = new Konva.Image({
    x: 0,
    y: 915,
    image: leftPlantPng,
    widht: 85,
    height: 166,
  });

  private rightPlant: KonvaImage = new Konva.Image({
    x: 1835,
    y: 920,
    image: rightPlantPng,
    widht: 85,
    height: 166,
  });

  private brokenPlate: KonvaImage = new Konva.Image({
    x: 1400,
    y: 700,
    image: brokenPlatePng,
    widht: 94,
    height: 80,
  });

  private plates: KonvaImage[] = [];

  private interval: NodeJS.Timer | undefined;

  private movementAnimation = new MovementAnimation(characterPng);

  private gameOverAnimation = new BasicAnimation(
    'game-over/',
    gameOverPng,
    200,
  );

  private mainMenuAnimation = new BasicAnimation(
    'main-menu/',
    mainMenuPng,
    300,
  );

  private cleaningAnimation = new BasicAnimation(
    'waiter/cleaning/',
    characterPng,
    300,
  );

  constructor(private physics: Physics) {}

  setPlates() {
    for (const plate of Plates) {
      const konvaImage = new Konva.Image({
        x: plate.position.x,
        y: plate.position.y,
        image: plate.image,
        widht: plate.size.width,
        height: plate.size.height,
      });
      this.plates.push(konvaImage);
    }
  }

  setTopLayer() {
    this.topTablesLayer.add(this.topTables);
  }

  setBottomTablesLayer() {
    this.bottomTablesLayer.add(this.bottomTables);
  }

  setBottomPlantsLayer() {
    this.bottomPlantsLayer.add(this.leftPlant);
    this.bottomPlantsLayer.add(this.rightPlant);
  }

  setBackgroundLayer() {
    this.backgroundLayer.add(this.restaurant);
    this.backgroundLayer.add(this.plates[1]);
  }

  setCharacterLayer() {
    this.characterLayer.add(this.character);
  }

  setAssetsLayers() {
    this.setPlates();
    this.setBackgroundLayer();
    this.setTopLayer();
    this.setCharacterLayer();
    this.setBottomTablesLayer();
    this.setBottomPlantsLayer();
  }

  renderMainMenu() {
    this.clear();
    this.mainMenuLayer.add(this.mainMenu);
    this.stage.add(this.mainMenuLayer);
    this.mainMenuLayer.draw();
    this.mainMenuAnimation.play();
  }

  renderGameOver() {
    this.clear();
    this.gameOverLayer.add(this.gameOver);
    this.stage.add(this.gameOverLayer);
    this.gameOverLayer.draw();
    this.gameOverAnimation.play();
  }

  renderRestaurant() {
    this.clear();
    this.setAssetsLayers();
    this.renderCharacterMovement();
    this.stage.add(this.backgroundLayer);
    this.stage.add(this.topTablesLayer);
    this.stage.add(this.characterLayer);
    this.stage.add(this.bottomTablesLayer);
    this.stage.add(this.bottomPlantsLayer);
    this.backgroundLayer.draw();
    this.topTablesLayer.draw();
    this.characterLayer.draw();
    this.bottomTablesLayer.draw();
    this.bottomPlantsLayer.draw();
  }

  renderCharacterMovement() {
    this.interval = setInterval(() => this.moveCharacter(), 30);
  }

  renderMovementAnimation(to: string) {
    this.stopCleaningAnimation();
    this.movementAnimation.play(to, this.physics.character!.holding);
  }

  stopMovementAnimation() {
    this.movementAnimation.stopAll();
  }

  moveCharacter() {
    if (!this.physics.character) return;
    this.character.setAttrs(this.physics.character.position);
    this.setIndexes();
  }

  setIndexes() {
    if (this.physics.isCharacterAboveTopTables()) {
      this.characterLayer.setZIndex(1);
      this.topTablesLayer.setZIndex(2);
      this.bottomTablesLayer.setZIndex(3);
    }
    if (this.physics.isCharacterBellowBottomTables()) {
      this.characterLayer.setZIndex(3);
      this.topTablesLayer.setZIndex(1);
      this.bottomTablesLayer.setZIndex(2);
    }
    if (
      !this.physics.isCharacterAboveTopTables() &&
      !this.physics.isCharacterBellowBottomTables()
    ) {
      this.characterLayer.setZIndex(2);
      this.topTablesLayer.setZIndex(1);
      this.bottomTablesLayer.setZIndex(3);
    }
  }

  renderPlate(index: number) {
    this.backgroundLayer.add(this.plates[index]);
    this.plates[index].moveToTop();
  }

  hidePlate(index: number) {
    this.plates[index].remove();
  }

  showPlateOnTable(index: number, table: Position) {
    if (index < 3) {
      this.topTablesLayer.add(this.plates[index]);
    }
    if (index >= 3) {
      this.bottomTablesLayer.add(this.plates[index]);
    }
    this.plates[index].setAttrs(table);
    this.plates[index].show();
  }

  renderBrokenPlate() {
    this.backgroundLayer.add(this.brokenPlate);
  }

  hideBrokenPlate() {
    this.brokenPlate.remove();
  }

  renderCleaningAnimation() {
    this.movementAnimation.stopAll();
    this.cleaningAnimation.play();
  }

  stopCleaningAnimation() {
    this.cleaningAnimation.stop();
  }

  resetLayers() {
    this.backgroundLayer.removeChildren();
    this.characterLayer.removeChildren();
    this.topTablesLayer.removeChildren();
    this.bottomTablesLayer.removeChildren();
    this.bottomPlantsLayer.removeChildren();
    this.gameOverLayer.removeChildren();
    this.mainMenuLayer.removeChildren();
  }

  clear() {
    this.resetLayers();
    this.stopCleaningAnimation();
    this.stage.removeChildren();
    this.plates = [];
    clearInterval(this.interval);
  }
}

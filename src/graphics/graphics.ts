import Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { Layer } from 'konva/lib/Layer';
import type { Image as KonvaImage } from 'konva/lib/shapes/Image';
import type { Physics, Position } from '../physics';
import { BasicAnimation, MovementAnimation } from './animations';
import { Plates } from '../physical/plate';

const mainMenuPng = new Image(1920, 1080);
mainMenuPng.src = '/assets/main-menu/0.png';

const gameOverPng = new Image(1920, 1080);
gameOverPng.src = '/assets/game-over/0.png';

const restaurantPng = new Image(1920, 1080);
restaurantPng.src = '/assets/restaurant/restaurant.png';

const characterPng = new Image(200, 220);
characterPng.src = '/assets/waiter/stopped/front.png';

const leftPlantPng = new Image(85, 166);
leftPlantPng.src = '/assets/restaurant/leftPlant.png';

const rightPlantPng = new Image(85, 166);
rightPlantPng.src = '/assets/restaurant/rightPlant.png';

const brokenPlatePng = new Image(126, 107);
brokenPlatePng.src = '/assets/plates/broken-plate.png';

const table1Png = new Image(473, 243);
table1Png.src = '/assets/restaurant/table1/0.png';

const table2Png = new Image(474, 296);
table2Png.src = '/assets/restaurant/table2/0.png';

const table3Png = new Image(474, 291);
table3Png.src = '/assets/restaurant/table3/0.png';

const table4Png = new Image(474, 297);
table4Png.src = '/assets/restaurant/table4/0.png';

const barPng = new Image(644, 161);
barPng.src = '/assets/restaurant/bar/bar.png';

const bartenderPng = new Image(67, 171);
bartenderPng.src = '/assets/restaurant/bar/0.png';

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

  private table1: KonvaImage = new Konva.Image({
    x: 350,
    y: 390,
    image: table1Png,
    widht: 473,
    height: 243,
  });

  private table2: KonvaImage = new Konva.Image({
    x: 1350,
    y: 340,
    image: table2Png,
    widht: 474,
    height: 296,
  });

  private table3: KonvaImage = new Konva.Image({
    x: 175,
    y: 700,
    image: table3Png,
    widht: 474,
    height: 291,
  });

  private table4: KonvaImage = new Konva.Image({
    x: 1230,
    y: 700,
    image: table4Png,
    widht: 474,
    height: 297,
  });

  private bar: KonvaImage = new Konva.Image({
    x: 185,
    y: 110,
    image: barPng,
    widht: 644,
    height: 161,
  });

  private bartender: KonvaImage = new Konva.Image({
    x: 473,
    y: 70,
    image: bartenderPng,
    widht: 67,
    height: 171,
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
    '/assets/game-over/',
    gameOverPng,
    200,
  );

  private mainMenuAnimation = new BasicAnimation(
    '/assets/main-menu/',
    mainMenuPng,
    300,
  );

  private cleaningAnimation = new BasicAnimation(
    '/assets/waiter/cleaning/',
    characterPng,
    300,
  );

  private table1Animation = new BasicAnimation(
    '/assets/restaurant/table1/',
    table1Png,
    500,
  );

  private table2Animation = new BasicAnimation(
    '/assets/restaurant/table2/',
    table2Png,
    500,
  );

  private table3Animation = new BasicAnimation(
    '/assets/restaurant/table3/',
    table3Png,
    500,
  );

  private table4Animation = new BasicAnimation(
    '/assets/restaurant/table4/',
    table4Png,
    500,
  );

  private bartenderAnimation = new BasicAnimation(
    '/assets/restaurant/bar/',
    bartenderPng,
    500,
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
    this.topTablesLayer.add(this.table1);
    this.topTablesLayer.add(this.table2);
  }

  setBottomTablesLayer() {
    this.bottomTablesLayer.add(this.table3);
    this.bottomTablesLayer.add(this.table4);
  }

  setBottomPlantsLayer() {
    this.bottomPlantsLayer.add(this.leftPlant);
    this.bottomPlantsLayer.add(this.rightPlant);
  }

  setBackgroundLayer() {
    this.backgroundLayer.add(this.restaurant);
    this.backgroundLayer.add(this.bartender);
    this.backgroundLayer.add(this.bar);
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
    this.table1Animation.play();
    this.table2Animation.play();
    this.table3Animation.play();
    this.table4Animation.play();
    this.bartenderAnimation.play();
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
    this.bottomTablesLayer.add(this.plates[index]);
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

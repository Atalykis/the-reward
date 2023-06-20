import { InputsProvider, KeyboardInputsProvider } from './inputs-provider';
import { Graphics } from './graphics/graphics';
import { MainMenu } from './main-menu';
import { Physics } from './physics';
import { Run } from './run';

export type Context = 'Menu' | 'Run';

export class Game {
  private mainMenu: MainMenu;
  public run: Run;
  // private inputsProvider: InputsProvider = new InputsProvider();
  private inputsProvider: KeyboardInputsProvider = new KeyboardInputsProvider();
  private context: Context = 'Menu';
  constructor(public graphics: Graphics, private physics: Physics) {
    this.mainMenu = new MainMenu(graphics);
    this.run = new Run(this.graphics, this.physics);
    this.switchMode('Menu');
    this.inputsProvider.mount();
    setInterval(() => this.tick(), 31);
  }

  menuMode() {
    this.mainMenu.render();
  }

  runMode() {
    this.run.startRun();
  }

  tick() {
    const inputs = this.inputsProvider.getInputs();
    if (this.context === 'Menu') {
      if (inputs.action.triggered) {
        this.switchMode('Run');
        this.context = 'Run';
      }
    }
    if (this.context === 'Run') {
      this.run.tick(inputs);
    }
  }

  switchMode(mode: string) {
    switch (mode) {
      case 'Menu':
        this.menuMode();
        break;
      case 'Run':
        this.runMode();
        break;
    }
  }
}

const physics = new Physics();
const graphics = new Graphics(physics);
const game = new Game(graphics, physics);

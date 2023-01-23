import type { Graphics } from './graphics';
import type { Run } from './run';

interface GamepadInputs {
  movement: Movement;
  action: Action;
}

export class RunEvents {
  private gamepadInputs: GamepadInputs = {
    movement: { x: 0, y: 0 },
    action: { triggered: false },
  };
  private lastKeyDown: string = '';
  constructor(private run: Run) {}

  mountGamepad() {
    window.addEventListener('gamepadconnected', this.gamepadEvents);
  }

  gamepadEvents = () => {
    setInterval(() => this.checkGamepad(), 16);
  };

  checkGamepad() {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;
    const axes: number[] = [gamepad.axes[0], gamepad.axes[1]];
    const button = gamepad.buttons[0];
    this.gamepadInputs.movement.x = axes[0];
    this.gamepadInputs.movement.y = axes[1];
    this.gamepadInputs.action.triggered = button.pressed;
    this.playInputs(this.gamepadInputs);
  }

  playInputs(inputs: GamepadInputs) {
    if (inputs.action.triggered) {
      this.run.playPlateInteraction();
    }
    if (inputs.movement.x === 0) {
      this.run.stopCharacterMovement('right');
      this.run.stopCharacterMovement('left');
    }
    if (inputs.movement.y === 0) {
      this.run.stopCharacterMovement('up');
      this.run.stopCharacterMovement('down');
    }
    if (inputs.movement.y === 1) {
      this.run.moveCharacterDown();
    }
    if (inputs.movement.y === -1) {
      this.run.moveCharacterUp();
    }
    if (inputs.movement.x === 1) {
      this.run.moveCharacterRight();
    }
    if (inputs.movement.x === -1) {
      this.run.moveCharacterLeft();
    }
  }

  mountKeyboard() {
    window.addEventListener('keydown', this.keyDownEvent);
    window.addEventListener('keyup', this.keyUpEvent);
  }

  keyDownEvent = (event: KeyboardEvent) => {
    event.preventDefault();
    if (this.lastKeyDown === event.key) return;
    if (this.lastKeyDown !== '') return;
    switch (event.key) {
      case 'ArrowRight':
        this.run.moveCharacterRight();
        break;
      case 'ArrowLeft':
        this.run.moveCharacterLeft();
        break;
      case 'ArrowUp':
        this.run.moveCharacterUp();
        break;
      case 'ArrowDown':
        this.run.moveCharacterDown();
        break;
    }
    this.lastKeyDown = event.key;
  };

  keyUpEvent = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowRight':
        this.run.stopCharacterMovement('right');
        break;
      case 'ArrowLeft':
        this.run.stopCharacterMovement('left ');
        break;
      case 'ArrowUp':
        this.run.stopCharacterMovement('up');
        break;
      case 'ArrowDown':
        this.run.stopCharacterMovement('down');
        break;
      case ' ':
        this.run.playPlateInteraction();
        break;
    }
    this.lastKeyDown = '';
  };

  unmount() {
    window.removeEventListener('keydown', this.keyDownEvent);
    window.removeEventListener('keyup', this.keyUpEvent);
  }
}

export class MenuEvents {
  constructor(
    private graphics: Graphics,
    private onClick: (mode: string) => void,
  ) {}

  mount() {
    this.graphics.mainMenu.addEventListener('click', this.onClickEvent);
  }

  onClickEvent = (e: Event) => {
    e.preventDefault();
    this.onClick('Run');
  };

  unmount() {
    this.graphics.mainMenu.removeEventListener('click');
  }
}

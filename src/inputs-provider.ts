export interface Action {
  triggered: boolean;
}

export interface StickState {
  xAxe: number;
  yAxe: number;
}

export interface Movement {
  intensity: number;
  angle: number;
}

export interface GamepadInputs {
  stickState: StickState;
  action: Action;
}

export interface GamepadAnalogicInputs {
  movement: Movement;
  action: Action;
}

export class InputsProvider {
  private gamepadInputs: GamepadInputs = {
    stickState: { xAxe: 0, yAxe: 0 },
    action: { triggered: false },
  };
  constructor() {}

  mountGamepad() {
    window.addEventListener('gamepadconnected', this.gamepadEvents);
  }

  gamepadEvents = () => {
    setInterval(() => this.checkGamepad(), 31);
  };

  checkGamepad() {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;
    const axes: number[] = [gamepad.axes[0], gamepad.axes[1]];
    const button = gamepad.buttons[0];
    this.gamepadInputs.stickState.xAxe = Math.trunc(axes[0]);
    this.gamepadInputs.stickState.yAxe = Math.trunc(axes[1]);
    this.gamepadInputs.action.triggered = button.pressed;
  }

  getAnalogicDirection(): Movement {
    const isPressingLeft = this.gamepadInputs.stickState.xAxe === -1;
    const isPressingRight = this.gamepadInputs.stickState.xAxe === 1;
    const isPressingUp = this.gamepadInputs.stickState.yAxe === -1;
    const isPressingDown = this.gamepadInputs.stickState.yAxe === 1;

    switch (true) {
      case isPressingLeft && isPressingUp:
        return { intensity: 1, angle: (3 * Math.PI) / 4 };
      case isPressingLeft && isPressingDown:
        return { intensity: 1, angle: (5 * Math.PI) / 4 };
      case isPressingRight && isPressingUp:
        return { intensity: 1, angle: Math.PI / 4 };
      case isPressingRight && isPressingDown:
        return { intensity: 1, angle: (7 * Math.PI) / 4 };
      case isPressingDown:
        return { intensity: 1, angle: (3 * Math.PI) / 2 };
      case isPressingUp:
        return { intensity: 1, angle: Math.PI / 2 };
      case isPressingRight:
        return { intensity: 1, angle: 0 };
      case isPressingLeft:
        return { intensity: 1, angle: Math.PI };
      default:
        return { intensity: 0, angle: (3 * Math.PI) / 2 };
    }
  }

  getInputs(): GamepadAnalogicInputs {
    const analogicDirection = this.getAnalogicDirection();
    return { movement: analogicDirection, action: this.gamepadInputs.action };
  }
}

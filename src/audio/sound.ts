import { Position } from '../physics';

export class Sound {
  public position: Position | undefined;
  constructor(private source: AudioBufferSourceNode, private gain: GainNode) {}

  changeGain(to: number) {
    this.gain.gain.value = to;
  }

  play() {
    this.source.loop = false;
    this.source.start();
  }

  stop() {
    this.source.stop();
  }
}

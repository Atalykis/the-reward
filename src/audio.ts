import type { Physics, Position } from './physics';

export class AudioMixer {
  private context: AudioContext = new AudioContext();
  private sounds: Map<string, Sound> = new Map();
  private gameOverSounds: Map<string, Sound> = new Map();
  private bossSounds: Map<string, Sound> = new Map();
  private bossSoundPlaying: boolean = false;
  private currentBossSound: number = 0;
  constructor(private readonly physics: Physics) {
    this.initSounds();
    this.initGameOverSounds();
    this.initBossSounds();
  }

  async createSoundFromSrc(
    src: string,
    name: string,
    container: Map<string, Sound>,
  ) {
    const source = this.context.createBufferSource();
    const gain = this.context.createGain();

    source.buffer = await this.audioBufferFromFile(src);

    source.connect(gain).connect(this.context.destination);

    const sound = new Sound(source, gain);
    container.set(name, sound);
  }

  async audioBufferFromFile(src: string) {
    const file = await fetch(src);
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async initGameOverSounds() {
    this.createSoundFromSrc(
      'sounds/game-over/low.mp3',
      'low',
      this.gameOverSounds,
    );
    this.createSoundFromSrc(
      'sounds/game-over/medium.mp3',
      'medium',
      this.gameOverSounds,
    );
    this.createSoundFromSrc(
      'sounds/game-over/high.mp3',
      'high',
      this.gameOverSounds,
    );
  }

  async initSounds() {
    this.createSoundFromSrc(
      'sounds/tables/4-peoples.mp3',
      'table1',
      this.sounds,
    );
    // this.createSoundFromSrc('piano.mp3', 'table2', this.sounds);
    this.createSoundFromSrc(
      'sounds/tables/2-peoples.mp3',
      'table3',
      this.sounds,
    );
    // this.createSoundFromSrc('batterie.mp3', 'table4', this.sounds);
    this.createSoundFromSrc('bar.mp3', 'bar', this.sounds);
  }

  async initBossSounds() {
    this.createSoundFromSrc('sounds/boss/1.mp3', '1', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/2.mp3', '2', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/3.mp3', '3', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/4.mp3', '4', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/5.mp3', '5', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/6.mp3', '6', this.bossSounds);
    this.createSoundFromSrc('sounds/boss/7.mp3', '6', this.bossSounds);
  }

  playGameOverSound(level: string) {
    const sound = this.gameOverSounds.get(level);
    if (!sound) return;
    sound.play();
  }

  playOneBossSound(name: string) {
    const sound = this.bossSounds.get(name);
    if (!sound) return;
    sound.changeGain(0.5);
    sound.play();
    this.bossSoundPlaying = true;
  }

  playAmbiance() {
    for (const sound of this.sounds.values()) {
      sound.play();
    }
  }

  stopAllAmbiant() {
    for (const sound of this.sounds.values()) {
      sound.stop();
    }
  }

  manageTablesSounds() {
    for (const associatedDistance of this.physics.characterDistanceWithTables()) {
      const sound = this.sounds.get(associatedDistance.table);
      if (!sound) continue;
      const distance = associatedDistance.distance;
      if (distance < associatedDistance.minimalDistance) {
        sound?.changeGain(0.25);
        continue;
      }
      if (distance > 600) {
        sound?.changeGain(0);
        continue;
      } else {
        const gain = 0.25 - (distance - 80) / 570 / 4;
        sound?.changeGain(gain);
      }
    }
  }

  manageBossSentence() {
    if (this.bossSoundPlaying) return;
    if (!this.physics.characterIsCloseOfTheBar()) return;
    this.currentBossSound++;
    this.playOneBossSound(`${this.currentBossSound}`);
    setTimeout(() => (this.bossSoundPlaying = false), 9000);
  }
}

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

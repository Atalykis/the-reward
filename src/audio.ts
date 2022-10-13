import type { Physics, Position } from "./physics"

export class AudioMixer {
  private context: AudioContext = new AudioContext()
  private sounds: Map<string, Sound> = new Map() 
  constructor(private readonly physics: Physics){
    this.initSounds()
  }

  async createSoundFromSrc(src: string, name: string){
    const source = this.context.createBufferSource()
    const gain = this.context.createGain()

    source.buffer = await this.audioBufferFromFile(src)

    source.connect(gain).connect(this.context.destination)

    const sound = new Sound(source, gain)
    this.sounds.set(name, sound)
  }

  async audioBufferFromFile(src: string){
    const file = await fetch(src)
    const arrayBuffer = await file.arrayBuffer()
    const audioBuffer = await this.context.decodeAudioData(arrayBuffer)
    return audioBuffer
  }

  async initSounds(){
    this.createSoundFromSrc("discussion.mp3", "table1")
    this.createSoundFromSrc("piano.mp3", "table2")
    this.createSoundFromSrc("guitar.mp3", "table3")
    this.createSoundFromSrc("batterie.mp3", "table4")
    this.createSoundFromSrc("bar.mp3", "bar")
    this.createSoundFromSrc("chattering.mp3", "ambiant")
  }

  playAmbiance(){
    for(const sound of this.sounds.values()){
      sound.play()
    }
    this.lowerAmbiant(0.1)
  }

  lowerAmbiant(to: number){
    this.sounds.get("ambiant")?.changeGain(to)
  }

  manageTablesSounds(){
    for(const associatedDistance of this.physics.characterDistanceWithTables()){
      const sound = this.sounds.get(associatedDistance.table)
      const distance = associatedDistance.distance
      if(distance < 80){
        sound?.changeGain(0.25);
        continue 
      } 
      if(distance > 300) {
        sound?.changeGain(0)
        continue
      }
      else {
        const gain = 0.25 - ((distance - 80) / 270)/4
        sound?.changeGain(gain)
      }
    }
  }
}

export class Sound {
  public position: Position | undefined
  constructor(private source: AudioBufferSourceNode, private gain: GainNode){}

  changeGain(to: number){
    this.gain.gain.value = to
  }

  play(){
    this.source.loop = true
    this.source.start()
  }

  stop(){
    this.source.stop()
  }
}
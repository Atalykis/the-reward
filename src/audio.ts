export class AudioMixer {
  private context: AudioContext = new AudioContext()
  private sounds: Map<string, Sound> = new Map() 
  constructor(){}

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
}

export class Sound {
  constructor(private source: AudioBufferSourceNode, private gain: GainNode){}

  // lowerGain(to: number)
}
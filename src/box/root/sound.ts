import { RootBox } from "./rootBox";
import sound from 'pixi-sound'
import { Loader } from "pixi.js";

export class SoundManager {

  private _bgmVolume: number = 20
  private _seVolume: number = 20
  private _bgm!: sound.Sound

  public playBgm(key: string, loop: boolean = true) {
    const bgm = Loader.shared.resources[key]
    if (bgm.sound instanceof sound.Sound) {
      if (this._bgm) this._bgm.destroy()
      this._bgm = bgm.sound
      this._bgm.volume = this._bgmVolume / 500
      this._bgm.loop = loop
      this._bgm.play()
    }
  }

  public playSe(key: string) {
    const se = Loader.shared.resources[key]
    if (se.sound instanceof sound.Sound) {
      se.sound.play({
        loop: false,
        volume: this._seVolume / 500
      })
    }
  }

  public pause() {
    this._bgm.pause()
  }

  public resume() {
    this._bgm.resume()
  }

  public get bgmVolume(): number {
    return this._bgmVolume
  }

  public set bgmVolume(value: number) {
    this._bgmVolume = Math.max(0, Math.min(value, 100))
  }

  public get seVolume(): number {
    return this._seVolume
  }

  public set seVolume(value: number) {
    this._seVolume = Math.max(0, Math.min(value, 100))
  }
  
  public static get instance(): SoundManager {
    return RootBox.instance.logic.sound
  }
}
import { Logic } from "../../abstract/logic";
import { SoundManager } from "./sound";

export class RootLogic extends Logic {

  public readonly sound: SoundManager

  constructor() {
    super()

    this.sound = new SoundManager()
  }
}
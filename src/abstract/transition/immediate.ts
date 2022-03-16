import { Container } from "pixi.js";
import { Transition } from "./transition";

export class Immediate extends Transition {

  public begin(): Promise<void> {
    return new Promise(resolve => {
      resolve()
    })
  }
}
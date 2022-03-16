import { Transition } from "./transition";
import { Container, Graphics } from "pixi.js";
import { calcProgress } from "../../types/easing";

export class Fade extends Transition {

  protected overlay: Graphics = new Graphics()
  protected now: number = 0

  constructor(
    protected view: Container,
    protected startAlpha: number,
    protected endAlpha: number,
    protected frame: number
  ) {

    super()
    this.overlay.beginFill(0).drawRect(0, 0, 800, 600).endFill()
    this.overlay.alpha = this.startAlpha
    this.overlay.interactive = true
  }

  public onUpdate(delta: number) {
    if (this.now === this.frame) {
      this.overlay.destroy()
      this.onTransited()
    } else {
      this.now++
      this.updateProgress()
    }
  }

  protected updateProgress() {
    this.overlay.alpha = calcProgress(x => x, this.startAlpha, this.endAlpha, this.now / this.frame)
  }

  public begin(): Promise<void> {
    this.view.addChild(this.overlay)
    return super.begin()
  }
}
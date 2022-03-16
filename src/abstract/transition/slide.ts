import { Container, Graphics, Point } from "pixi.js";
import { calcProgress, easeInOutCubic } from "../../types/easing";
import { Fade } from "./fade";
import { Transition } from "./transition";

export class Slide extends Fade {

  constructor(
    view: Container,
    private child: Container,
    private startX: number,
    private startY: number,
    private endX: number,
    private endY: number,
    startAlpha: number,
    endAlpha: number,
    frame: number
  ) {
    super(view, startAlpha, endAlpha, frame)
  }

  protected updateProgress() {
    this.child.x = calcProgress(easeInOutCubic, this.startX, this.endX, this.now / this.frame)
    this.child.y = calcProgress(easeInOutCubic, this.startY, this.endY, this.now / this.frame)
    super.updateProgress()
  }

  public begin(): Promise<void> {
    this.child.position = new Point(this.startX, this.startY)
    this.view.addChildAt(this.overlay, 0)
    return new Promise(resolve => {
      this.onTransited = resolve
    })
  }
}
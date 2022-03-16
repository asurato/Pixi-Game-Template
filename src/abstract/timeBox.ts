import { Container } from "pixi.js";
import { Box } from "./box";
import { Logic } from "./logic";

export abstract class TimeBox<V extends Container = Container, L extends Logic = Logic> extends Box<V, L> {

  private isPausing: boolean = false
  private interval: number = 1
  private now: number = 0

  public pause() {
    this.isPausing = true
  }

  public restart() {
    this.isPausing = false
  }

  public update(delta: number) {
    if (!this.isPausing) {
      this.now += delta
      while (this.interval <= this.now) {
        this.now %= this.interval
        super.update(delta)
      }
    }
  }

  public setFPS(fps: number) {
    this.interval = 60 / fps
  }

  public getFPS() {
    return 60 / this.interval
  }
}
import { Updatable } from "./updatable"

export abstract class Logic implements Updatable {

  public onUpdate(delta: number) { }

  public onAwake() { }

  public onStart() { }

  public onQuit() { }

  public onDestroyed() { }
}
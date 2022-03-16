import { Updatable } from "../updatable";

export abstract class Transition implements Updatable {

  protected onTransited: () => void = () => { }

  public begin(): Promise<void> {
    return new Promise(resolve => {
      this.onTransited = resolve
    })
  }

  public onUpdate(delta: number): void { }
}